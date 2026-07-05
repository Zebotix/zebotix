/* eslint-disable no-console */
import { type PrismaClient } from "../../src/generated/prisma/client";

export async function seedPortfolios(prisma: PrismaClient) {
  console.log("Seeding Portfolios...");
  const portfolios = [
    {
      title: "Fintech Dashboard Redesign",
      slug: "fintech-dashboard-redesign",
      client: "Apex Finance",
      industry: "Financial Services",
      problem:
        "The client was struggling with a slow, bloated AngularJS dashboard that took over 10 seconds to load financial data.",
      solution:
        "We migrated the entire application to a modern Next.js architecture, utilizing server-side rendering for initial loads and optimistic UI updates for interactions.",
      results: {
        improvement:
          "Load times dropped to under 1 second. User engagement increased dramatically.",
      },
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma"],
      gallery: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000"],
      isPublished: true,
    },
    {
      title: "AI-Powered Customer Support Agent",
      slug: "ai-customer-support-agent",
      client: "Global Retail Inc.",
      industry: "E-Commerce",
      problem:
        "The client's support team was overwhelmed with repetitive queries regarding order status and return policies.",
      solution:
        "We engineered a secure RAG pipeline that connected OpenAI's models directly to their internal inventory and policy databases.",
      results: {
        improvement: "Support ticket resolution times dropped from 24 hours to 2 minutes.",
      },
      techStack: ["Python", "FastAPI", "OpenAI", "Pinecone", "LangChain"],
      gallery: ["https://images.unsplash.com/photo-1531297172867-11d78204b6b6?q=80&w=1000"],
      isPublished: true,
    },
  ];

  for (const port of portfolios) {
    const exists = await prisma.portfolio.findUnique({ where: { slug: port.slug } });
    if (!exists) {
      await prisma.portfolio.create({ data: port });
    }
  }
  console.log("Portfolios seeded successfully.");
}
