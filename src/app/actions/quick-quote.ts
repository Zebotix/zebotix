"use server";

import { z } from "zod";

import prisma from "@/lib/db/prisma";

const quickQuoteSchema = z.object({
  projectType: z.string().min(1, "Project type is required"),
  businessType: z.string().min(1, "Business type is required"),
  colorThemes: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  budget: z.string().min(1, "Budget is required"),
  timeline: z.string().min(1, "Timeline is required"),
  details: z.string().optional(),
  referenceUrls: z.array(z.string()).default([]),
  attachments: z.array(z.string()).default([]),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
});

export async function submitQuickQuoteAction(data: {
  projectType: string;
  businessType: string;
  colorThemes: string[];
  features: string[];
  budget: string;
  timeline: string;
  details?: string;
  referenceUrls: string[];
  attachments: string[];
  name: string;
  email: string;
  phone?: string;
  company?: string;
}) {
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
