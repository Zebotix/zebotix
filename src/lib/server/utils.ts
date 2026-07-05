import { headers } from "next/headers";

/**
 * Escapes characters for HTML to prevent XSS.
 */
export function escapeHtml(str?: string | null): string {
  if (!str) return "";
  return str
    .replaceAll(/&/g, "&amp;")
    .replaceAll(/</g, "&lt;")
    .replaceAll(/>/g, "&gt;")
    .replaceAll(/"/g, "&quot;")
    .replaceAll(/'/g, "&#39;");
}

/**
 * Formats a timestamp into a readable ISO string with safe escaping.
 */
export function getTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Normalizes headers and extracts IP/User-Agent from a Request object.
 */
export function getRequestMetadata(request: Request) {
  const headers = Object.fromEntries(request.headers.entries());
  const ip = (headers["x-forwarded-for"] || headers["x-real-ip"] || "unknown")
    .toString()
    .split(",")[0]
    .trim();
  const userAgent = headers["user-agent"] || "unknown";
  const referer = headers["referer"] || headers["referrer"] || "direct";

  return { ip, userAgent, referer, headers };
}

/**
 * Extracts metadata (IP, User-Agent, Referer) from the server action context.
 */
export async function getActionMetadata() {
  const reqHeaders = await headers();
  const ip = (reqHeaders.get("x-forwarded-for") || reqHeaders.get("x-real-ip") || "unknown")
    .toString()
    .split(",")[0]
    .trim();
  const userAgent = reqHeaders.get("user-agent") || "unknown";
  const referer = reqHeaders.get("referer") || reqHeaders.get("referrer") || "direct";

  const headersObj = Object.fromEntries(reqHeaders.entries());

  return { ip, userAgent, referer, headers: headersObj };
}
