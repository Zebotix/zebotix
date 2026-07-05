"use server";

import { z } from "zod";

import { logger } from "@/lib/security/logger";

const WebVitalSchema = z.object({
  name: z.string(),
  value: z.number(),
  rating: z.string(),
  timestamp: z.string(),
  url: z.string(),
});

export async function logWebVital(data: unknown) {
  try {
    const validatedData = WebVitalSchema.parse(data);

    // Log the web vital metric using our application logger
    logger.info(`Web Vital: ${validatedData.name}`, {
      value: validatedData.value,
      rating: validatedData.rating,
      url: validatedData.url,
      timestamp: validatedData.timestamp,
    });

    return { success: true };
  } catch (error) {
    logger.error("Failed to log web vital", { error: (error as Error).message });
    return { success: false, error: "Invalid data" };
  }
}
