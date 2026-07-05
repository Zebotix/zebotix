"use server";

import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createSession, deleteSession } from "@/lib/auth/session";
import prisma from "@/lib/db/prisma";
import { logger } from "@/lib/security/logger";

const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export async function loginAction(
  prevState: { errors?: { email?: string[]; password?: string[] }; message?: string } | undefined,
  formData: FormData
) {
  const reqHeaders = await headers();
  // We mock a Request object just to get the IP using our helper
  const ip = reqHeaders.get("x-forwarded-for") || reqHeaders.get("x-real-ip") || "unknown";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validatedFields = loginSchema.safeParse({ email, password });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields.",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user?.isActive) {
      logger.security("Failed login attempt (user not found or inactive)", { email, ip });
      return { message: "Invalid email or password" };
    }

    // Check Account Lockout
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      logger.security("Login attempt on locked account", { userId: user.id, ip });
      return {
        message:
          "Account is temporarily locked due to multiple failed login attempts. Please try again later.",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      const newAttempts = user.failedLoginAttempts + 1;
      let lockedUntil = null;

      if (newAttempts >= MAX_FAILED_ATTEMPTS) {
        lockedUntil = new Date(Date.now() + LOCKOUT_DURATION_MS);
        logger.security("Account locked out", { userId: user.id, ip });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: newAttempts,
          lockedUntil,
        },
      });

      logger.security("Failed login attempt (invalid password)", {
        userId: user.id,
        ip,
        attempts: newAttempts,
      });
      return { message: "Invalid email or password" };
    }

    // Success! Reset attempts
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
        lastLogin: new Date(),
      },
    });

    logger.security("Successful login", { userId: user.id, ip });

    // Create session (this also generates jti and fingerprint)
    await createSession(user.id);
  } catch (error) {
    logger.error("Login unexpected error", { error: (error as Error).message, ip });
    return { message: "An unexpected error occurred" };
  }

  redirect("/admin/secure");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/admin/login");
}
