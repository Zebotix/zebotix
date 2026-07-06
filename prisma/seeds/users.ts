/* eslint-disable no-console */
import "dotenv/config";
import { hash } from "bcryptjs";

import { type PrismaClient } from "../../src/generated/prisma/client";

export async function seedUsers(prisma: PrismaClient) {
  // Check if Admin exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: process.env.ADMIN_EMAIL },
  });

  if (existingAdmin) {
    return existingAdmin;
  }

  if (!process.env.ADMIN_PASSWORD) {
    return null;
  }

  const passwordHash = await hash(process.env.ADMIN_PASSWORD, 10);

  // Create Admin User
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: process.env.ADMIN_EMAIL ?? "",
      passwordHash,
      role: "admin",
    },
  });
  console.log("Admin user created");
  return admin;
}
