import crypto from "crypto";

import { cookies, headers } from "next/headers";

import { encrypt, decrypt } from "./session.edge";
import redis from "../db/redis";

const ABSOLUTE_TIMEOUT_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

export async function generateFingerprint() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "unknown";
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
  return crypto.createHash("sha256").update(`${userAgent}-${ip}`).digest("hex");
}

export async function createSession(userId: string) {
  const jti = crypto.randomUUID();
  const fingerprint = await generateFingerprint();
  const expiresAt = new Date(Date.now() + ABSOLUTE_TIMEOUT_MS);
  const lastActiveAt = Date.now();

  const sessionToken = await encrypt({ userId, expiresAt, jti, fingerprint, lastActiveAt });

  const cookieStore = await cookies();

  cookieStore.set("session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  return jti;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (sessionToken) {
    const payload = await decrypt(sessionToken);
    if (payload?.jti) {
      // Revoke in Redis (blacklist)
      await redis.setex(`revoked:${payload.jti}`, Math.floor(ABSOLUTE_TIMEOUT_MS / 1000), "1");
    }
  }

  cookieStore.delete("session");
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) return null;

  const payload = await decrypt(sessionToken);
  if (!payload || !payload.jti) return null;

  // 1. Check if token is revoked in Redis
  try {
    const isRevoked = await redis.get(`revoked:${payload.jti}`);
    if (isRevoked) {
      await deleteSession();
      return null;
    }
  } catch (e) {
    // If Redis fails, fail open or closed depending on risk appetite. Here we fail open to prevent total outage.
    console.error("Redis revocation check failed", e);
  }

  // 2. Check fingerprint
  const currentFingerprint = await generateFingerprint();
  if (payload.fingerprint !== currentFingerprint) {
    await deleteSession();
    return null;
  }

  // 3. Check idle timeout
  const lastActiveAt = payload.lastActiveAt as number;
  if (Date.now() - lastActiveAt > IDLE_TIMEOUT_MS) {
    await deleteSession();
    return null;
  }

  // 4. Rolling Session: Update lastActiveAt if we are past halfway of idle timeout
  if (Date.now() - lastActiveAt > IDLE_TIMEOUT_MS / 2) {
    const newPayload = { ...payload, lastActiveAt: Date.now() };
    const newToken = await encrypt(newPayload);
    cookieStore.set("session", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(payload.expiresAt as string),
      sameSite: "lax",
      path: "/",
    });
  }

  return payload;
}
