import { z, type ZodSchema } from "zod";

import { globalRateLimiter, authRateLimiter } from "./rateLimit";
import { getSession } from "../auth/session";
import { getActionMetadata } from "../server/utils";

export type ActionSecurityOptions<T> = {
  requireAuth?: boolean;
  rateLimit?: "global" | "auth" | "upload" | "none";
  schema?: ZodSchema<T>;
  requireAdmin?: boolean;
};

export type ActionResponse<TData = unknown> = {
  success: boolean;
  message?: string;
  errors?: unknown;
  data?: TData;
};

/**
 * Validates a server action payload against security policies (Rate Limiting, Auth, RBAC, Zod Validation).
 * Returns { success: true, validatedData } if successful.
 * Returns { success: false, response } with the error response object if it fails.
 */
export async function checkActionSecurity<T>(
  data: unknown,
  options: ActionSecurityOptions<T>
): Promise<{ success: true; validatedData?: T } | { success: false; response: ActionResponse }> {
  try {
    const { ip } = await getActionMetadata();

    // 1. Rate Limiting
    if (options.rateLimit && options.rateLimit !== "none") {
      try {
        if (options.rateLimit === "auth") {
          await authRateLimiter.consume(ip);
        } else if (options.rateLimit === "global") {
          await globalRateLimiter.consume(ip);
        }
      } catch {
        return { success: false, response: { success: false, message: "Too many requests" } };
      }
    }

    // 2. Authentication & RBAC
    if (options.requireAuth || options.requireAdmin) {
      const session = await getSession();
      if (!session) {
        return { success: false, response: { success: false, message: "Unauthorized" } };
      }

      if (options.requireAdmin && session.role !== "admin") {
        return { success: false, response: { success: false, message: "Forbidden" } };
      }
    }

    // 3. Input Validation (Zod)
    let validatedData: T | undefined;
    if (options.schema) {
      const parseResult = options.schema.safeParse(data);
      if (!parseResult.success) {
        return {
          success: false,
          response: {
            success: false,
            message: "Validation failed",
            errors: z.flattenError(parseResult.error).fieldErrors,
          },
        };
      }
      validatedData = parseResult.data;
    }

    return { success: true, validatedData };
  } catch (error) {
    console.error("Action Security Check Error:", error);
    return { success: false, response: { success: false, message: "Internal server error" } };
  }
}
