import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.email("Invalid email address"),
  phone: z.string().max(20).optional().nullable(),
  company: z.string().max(100).optional().nullable(),
  message: z.string().min(1, "Message is required").max(5000),
  subject: z.string().max(200).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const quickQuoteSchema = z.object({
  country: z.string().min(1, "Country is required"),
  city: z.string().optional(),
  preferredContact: z.string().optional(),
  projectType: z.string().min(1, "Project type is required"),
  businessType: z.string().min(1, "Business industry is required"),
  companySize: z.string().optional(),
  projectGoals: z.string().optional(),
  designStyle: z.array(z.string()).default([]),
  platforms: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  wantsAI: z.string().optional(),
  aiFeatures: z.array(z.string()).default([]),
  integrations: z.array(z.string()).default([]),
  budget: z.string().min(1, "Budget expectation is required"),
  timeline: z.string().min(1, "Timeline is required"),
  referenceUrls: z.array(z.string()).default([]),
  attachments: z.array(z.string()).default([]),
  details: z.string().optional(),
  additionalNotes: z.string().optional(),
  name: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  engagementModel: z.string().optional(),
  estimatedCostPkr: z.number().optional().nullable(),
  estimatedCostUsd: z.number().optional().nullable(),
});

export type QuickQuoteInput = z.infer<typeof quickQuoteSchema>;
