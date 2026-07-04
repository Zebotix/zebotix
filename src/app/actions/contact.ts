"use server";

import prisma from "@/lib/db/prisma";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Name, email, and message are required." };
  }

  try {
    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
      },
    });
    return { success: true };
  } catch (err) {
    console.error("Contact form error:", err);
    return { success: false, error: "Failed to submit the form. Please try again later." };
  }
}
