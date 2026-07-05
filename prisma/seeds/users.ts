/* eslint-disable no-console */
import { type PrismaClient } from "../../src/generated/prisma/client";

export async function seedUsers(prisma: PrismaClient) {
  // Check if Admin exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "mzeeshankhan0988@gmail.com" },
  });

  if (existingAdmin) {
    return existingAdmin;
  }

  // Create Admin User
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "mzeeshankhan0988@gmail.com",
      passwordHash: "$2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW", // default password123
      role: "admin",
    },
  });
  console.log("Admin user created");
  return admin;
}
