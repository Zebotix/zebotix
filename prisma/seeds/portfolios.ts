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
      problem: `<p>The client was struggling with a slow, bloated AngularJS dashboard that took over 10 seconds to load financial data. This latency was causing significant operational delays for their internal analysts who needed real-time data to make split-second trading and investment decisions. The legacy architecture was tightly coupled, making it nearly impossible to implement new features or integrate modern charting libraries without risking systemic failures.</p>`,
      solution: `<p>We engineered a complete architectural overhaul, migrating the entire application to a modern Next.js framework. We utilized server-side rendering (SSR) for the initial data loads to ensure immediate visibility, and integrated optimistic UI updates for subsequent user interactions.</p>
        <p>Additionally, we deployed a distributed caching layer using Redis to serve frequently accessed financial reports, bypassing the primary database entirely for read-heavy operations.</p>`,
      results: {
        metrics: [
          { label: "Load Time Reduction", value: "90%" },
          { label: "User Engagement", value: "+45%" },
          { label: "Server Cost Savings", value: "30%" },
        ],
        summary:
          "Load times dropped from 10 seconds to under 1 second. User engagement increased dramatically as analysts could process reports in a fraction of the time.",
      },
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "Redis", "tRPC"],
      gallery: ["/work/work-1.webp", "/work/work-2.webp"],
      seo: {
        title: "Fintech Dashboard Redesign Case Study | Zebotix",
        description:
          "See how we redesigned a fintech dashboard using Next.js and Redis, reducing load times by 90%.",
        keywords: [
          "fintech software development",
          "financial dashboard redesign",
          "nextjs migration case study",
          "redis caching implementation",
          "financial services software",
          "banking software UI UX",
        ],
      },
      isPublished: true,
    },
    {
      title: "AI-Powered Customer Support Agent",
      slug: "ai-customer-support-agent",
      client: "Global Retail Inc.",
      industry: "E-Commerce",
      problem: `<p>The client's support team was overwhelmed with repetitive queries regarding order status, shipping delays, and return policies. Human agents were spending 80% of their time copy-pasting answers from internal knowledge bases, leading to high employee burnout and a staggering 24-hour average response time during peak holiday seasons.</p>`,
      solution: `<p>We designed and deployed a secure Retrieval-Augmented Generation (RAG) pipeline that connected OpenAI's advanced language models directly to the client's internal inventory systems, CRM, and policy databases.</p>
        <p>The AI agent was given read-only access to order tracking endpoints, allowing it to instantly fetch real-time shipping data and synthesize personalized, human-like responses for customers. For complex issues, the system smoothly hands over the conversation to a human agent, along with a summarized context of the user's intent.</p>`,
      results: {
        metrics: [
          { label: "Response Time", value: "< 2 mins" },
          { label: "Ticket Deflection", value: "65%" },
          { label: "CSAT Score", value: "4.8/5" },
        ],
        summary:
          "Support ticket resolution times dropped from 24 hours to 2 minutes, saving the company over $500,000 annually in support costs.",
      },
      techStack: ["Python", "FastAPI", "OpenAI", "Pinecone", "LangChain", "Next.js"],
      gallery: ["/work/work-2.webp"],
      seo: {
        title: "AI Customer Support Agent Case Study | Zebotix",
        description:
          "Case study on building a RAG-based AI customer support agent for a major e-commerce retailer.",
        keywords: [
          "AI customer support agent",
          "RAG pipeline case study",
          "ecommerce AI automation",
          "openai integration",
          "langchain development",
          "custom chatbots",
        ],
      },
      isPublished: true,
    },
  ];

  for (const port of portfolios) {
    await prisma.portfolio.upsert({
      where: { slug: port.slug },
      update: port,
      create: port,
    });
  }
  console.log("Portfolios seeded successfully.");
}
