/* eslint-disable no-console */
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "./../src/generated/prisma/client";
import { seedBlogs } from "./seeds/blogs";
import { seedCMS } from "./seeds/cms";
import { seedPortfolios } from "./seeds/portfolios";
import { seedSolutions } from "./seeds/solutions";
import { seedTestimonials } from "./seeds/testimonials";
import { seedUsers } from "./seeds/users";

const connectionString = process.env.DATABASE_URL_PRODUCTION;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting modular database seed...");

  // 1. Seed Users
  await seedUsers(prisma);

  // 2. Seed Solutions
  await seedSolutions(prisma);

  // 3. Seed Portfolios
  await seedPortfolios(prisma);

  // 4. Seed Blogs
  await seedBlogs(prisma);

  // 5. Seed Testimonials
  await seedTestimonials(prisma);

  // 6. Seed CMS (Legal, FAQ, Settings)
  await seedCMS(prisma);

  console.log("Modular database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
