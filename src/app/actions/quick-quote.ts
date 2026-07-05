"use server";

import { z } from "zod";

import prisma from "@/lib/db/prisma";
import { quickQuoteSchema, type QuickQuoteInput } from "@/lib/validations";




export async function submitQuickQuoteAction(data: QuickQuoteInput) {
  try {
    const validated = quickQuoteSchema.safeParse(data);
    if (!validated.success) {
      return {
        success: false,
        error: "Validation failed",
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const quote = await prisma.quickQuote.create({
      data: {
        ...validated.data,
        status: "new",
      },
    });

    return { success: true, data: quote };
  } catch (error) {
    console.error("Error submitting quick quote:", error);
    return { success: false, error: "Failed to submit quick quote" };
  }
}
