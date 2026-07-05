/* eslint-disable no-console */
import bcrypt from "bcryptjs";

import prisma from "../src/lib/db/prisma";

async function main() {
  const email = "admin@zebotix.com";
  const password = "password123"; // Very secure for local dev

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("Admin user already exists!");
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  await prisma.user.create({
    data: {
      name: "Zebotix Admin",
      email,
      passwordHash,
      role: "admin",
    },
  });

  console.log("Admin user created successfully.");
  console.log("Email:", email);
  console.log("Password:", password);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
