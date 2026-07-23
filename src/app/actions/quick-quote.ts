"use server";

import { flattenError } from "zod";

import prisma from "@/lib/db/prisma";
import { quickQuoteSchema, type QuickQuoteInput } from "@/lib/validations";

export async function submitQuickQuoteAction(data: QuickQuoteInput) {
  try {
    const validated = quickQuoteSchema.safeParse(data);
    if (!validated.success) {
      return {
        success: false,
        error: "Validation failed",
        errors: flattenError(validated.error).fieldErrors,
      };
    }

    const quote = await prisma.quickQuote.create({
      data: {
        country: validated.data.country,
        city: validated.data.city,
        preferredContact: validated.data.preferredContact,
        projectType: validated.data.projectType,
        businessType: validated.data.businessType,
        companySize: validated.data.companySize,
        designStyle: validated.data.designStyle,
        platforms: validated.data.platforms,
        features: validated.data.features,
        aiFeatures: validated.data.aiFeatures,
        integrations: validated.data.integrations,
        budget: validated.data.budget,
        timeline: validated.data.timeline,
        referenceUrls: validated.data.referenceUrls,
        attachments: validated.data.attachments,
        details: validated.data.details,
        additionalNotes: validated.data.additionalNotes,
        name: validated.data.name,
        email: validated.data.email,
        phone: validated.data.phone,
        company: validated.data.company,
        estimatedCostPkr: validated.data.estimatedCostPkr,
        estimatedCostUsd: validated.data.estimatedCostUsd,
        status: "new",
      },
    });

    return { success: true, data: quote };
  } catch (error) {
    console.error("Error submitting quick quote:", error);
    return { success: false, error: "Failed to submit quick quote" };
  }
}
