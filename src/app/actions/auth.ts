"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createSession, deleteSession } from "@/lib/auth/session";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export async function loginAction(
  prevState: { errors?: { email?: string[]; password?: string[] }; message?: string } | undefined,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validatedFields = loginSchema.safeParse({ email, password });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields.",
    };
  }

  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error("Admin credentials not configured in .env");
      return { message: "Server configuration error" };
    }

    if (email !== adminEmail || password !== adminPassword) {
      return { message: "Invalid email or password" };
    }

    // Create session
    await createSession("admin-user-env");
  } catch (error) {
    console.error("Login error:", error);
    return { message: "An unexpected error occurred" };
  }

  redirect("/admin/secure");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/admin/login");
}
