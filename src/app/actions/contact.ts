"use server";

import nodemailer from "nodemailer";

import { COMPANY_NAME, CONTACT_EMAIL } from "@/lib/constants";
import prisma from "@/lib/db/prisma";
import { checkActionSecurity, type ActionResponse } from "@/lib/security/actionHandler";
import { escapeHtml, getActionMetadata, getTimestamp } from "@/lib/server/utils";
import { contactSchema, type ContactInput } from "@/lib/validations";

export async function submitContactForm(data: unknown): Promise<ActionResponse> {
  const securityCheck = await checkActionSecurity<ContactInput>(data, {
    rateLimit: "global",
    schema: contactSchema,
    requireAuth: false,
  });

  if (!securityCheck.success) {
    return securityCheck.response;
  }

  if (!securityCheck.validatedData) {
    return { success: false, message: "Invalid request data" };
  }

  const {
    name,
    email,
    phone,
    message: messageRaw,
    subject: subjectRaw,
  } = securityCheck.validatedData;
  const { ip, userAgent } = await getActionMetadata();
  const timestamp = getTimestamp();
  const subject = subjectRaw || `New Inquiry from ${name}`;

  try {
    // 1. Save to Database
    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        message: messageRaw,
      },
    });

    // 2. Send Email
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const html = `
      <div style="font-family: sans-serif; color: #111827; padding: 20px; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #2563eb; margin-top: 0;">New Contact Form Submission</h2>
        <div style="margin-bottom: 20px;">
          <p style="margin: 4px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${escapeHtml(email)}</a></p>
          ${phone ? `<p style="margin: 4px 0;"><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
          ${subjectRaw ? `<p style="margin: 4px 0;"><strong>Subject:</strong> ${escapeHtml(subjectRaw)}</p>` : ""}
        </div>
        <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
          <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(messageRaw)}</p>
        </div>
        <footer style="font-size: 11px; color: #9ca3af; border-top: 1px solid #f3f4f6; pt: 15px;">
          <p style="margin: 4px 0;">IP: ${ip} • Sent at: ${timestamp}</p>
          <p style="margin: 4px 0;">${userAgent}</p>
        </footer>
      </div>
    `;

    // Fire and forget email so we don't block the response
    transporter
      .sendMail({
        from: `"${COMPANY_NAME} Website" <${process.env.EMAIL_USER}>`,
        to: CONTACT_EMAIL || process.env.EMAIL_USER,
        replyTo: email,
        subject: `[${COMPANY_NAME} Contact] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${messageRaw}`,
        html,
      })
      .catch((err) => console.error("Email notification failed:", err));

    return { success: true, message: "Message sent successfully" };
  } catch (error) {
    console.error("Contact Form Error:", error);
    return { success: false, message: "Failed to send message. Please try again later." };
  }
}
