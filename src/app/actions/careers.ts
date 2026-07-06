"use server";

import { z } from "zod";

import prisma from "@/lib/db/prisma";

export async function getActiveJobPostingsAction() {
  try {
    const jobs = await prisma.jobPosting.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: jobs };
  } catch (error) {
    console.error("Error fetching job postings:", error);
    return { success: false, error: "Failed to fetch job postings" };
  }
}

export async function getJobPostingBySlugAction(slug: string) {
  try {
    const job = await prisma.jobPosting.findUnique({
      where: { slug, isActive: true },
    });
    if (!job) {
      return { success: false, error: "Job not found" };
    }
    return { success: true, data: job };
  } catch (error) {
    console.error(`Error fetching job posting ${slug}:`, error);
    return { success: false, error: "Failed to fetch job posting" };
  }
}

const submitApplicationSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().optional(),
  resumeUrl: z.url("Must be a valid URL for your resume").or(z.literal("")).optional(),
  portfolioUrl: z.url("Must be a valid URL").or(z.literal("")).optional(),
  coverLetter: z.string().optional(),
});

export type SubmitApplicationData = z.infer<typeof submitApplicationSchema>;

export async function submitJobApplicationAction(data: SubmitApplicationData) {
  try {
    const validatedData = submitApplicationSchema.parse(data);

    // Check if the job exists and is active
    const job = await prisma.jobPosting.findUnique({
      where: { id: validatedData.jobId },
    });

    if (!job?.isActive) {
      return { success: false, error: "This job is no longer active or does not exist." };
    }

    const application = await prisma.jobApplication.create({
      data: {
        jobId: validatedData.jobId,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone || null,
        resumeUrl: validatedData.resumeUrl || null,
        portfolioUrl: validatedData.portfolioUrl || null,
        coverLetter: validatedData.coverLetter || null,
        status: "new",
      },
    });

    return { success: true, data: application };
  } catch (error) {
    console.error("Error submitting job application:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return {
      success: false,
      error: "An unexpected error occurred while submitting your application.",
    };
  }
}
