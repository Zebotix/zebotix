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

export type QuickQuoteInput = z.infer<typeof quickQuoteSchema>;
