/* eslint-disable no-console */
import { type PrismaClient } from "../../src/generated/prisma/client";

export async function seedBlogs(prisma: PrismaClient) {
  console.log("Seeding Blogs...");
  const blogs = [
    {
      title: "The Future of Web Development with Next.js 16",
      slug: "future-of-web-dev-nextjs-16",
      content:
        `<div>
          <h2>Introduction to Next.js 16</h2>
          <p>Next.js 16 introduces groundbreaking features for caching, performance optimization, and server component data streaming. In this comprehensive analysis, we explore how these upgrades fundamentally alter the landscape of modern web development and speed up user load rates significantly.</p>
          <h3>1. Enhanced Server Components</h3>
          <p>With the release of Next.js 16, server components have received a massive overhaul. The new rendering engine allows for partial pre-rendering out of the box, meaning static shells can be served instantaneously from the edge while dynamic content streams in seamlessly without blocking the main thread.</p>
          <h3>2. The New Caching Paradigm</h3>
          <p>Caching has always been a pain point in robust web applications. The new unified caching architecture provides granular control over what gets cached and for how long. It's now easier to revalidate data on-demand using Server Actions, resulting in highly dynamic yet blazingly fast user interfaces.</p>
          <h3>Conclusion</h3>
          <p>Embracing Next.js 16 is no longer an option but a necessity for enterprise-grade applications aiming for the highest performance metrics and the best SEO scores.</p>
        </div>`,
      excerpt:
        "Discover how Next.js 16 is revolutionizing the way we build high-performance web applications with advanced caching and streaming.",
      author: "Zebotix Engineering",
      tags: ["Next.js", "React", "Web Dev"],
      isPublished: true,
      isFeatured: true,
      publishedAt: new Date(),
    },
    {
      title: "Why AI Automation is Essential for Enterprise Scaling",
      slug: "ai-automation-enterprise-2026",
      content:
        `<div>
          <h2>The AI Imperative</h2>
          <p>Small and large enterprises are adopting AI at an unprecedented rate to streamline workflow overheads and eliminate operational bottlenecks. In 2026, relying solely on manual operational workflows is equivalent to falling behind the competition permanently.</p>
          <h3>Semantic Search and RAG</h3>
          <p>Retrieval-Augmented Generation (RAG) is transforming how businesses interact with their proprietary data. By implementing semantic vector searches, employees can query massive knowledge bases and receive accurate, synthesized answers in milliseconds.</p>
          <h3>Automating Repetitive Tasks</h3>
          <p>Customer support, data entry, and basic analytics reporting are being revolutionized by AI agents. These autonomous systems are capable of resolving tier-1 and tier-2 support tickets without human intervention, leading to massive cost savings.</p>
          <h3>The Path Forward</h3>
          <p>Investing in custom AI automation pipelines is no longer science fiction. It is a critical infrastructure requirement for sustainable scale.</p>
        </div>`,
      excerpt:
        "Learn why adopting custom AI automation pipelines is essential to scale modern business workflows efficiently.",
      author: "Zebotix AI Division",
      tags: ["AI", "Automation", "Workflows"],
      isPublished: true,
      isFeatured: true,
      publishedAt: new Date(),
    },
    {
      title: "Building Bulletproof API Integrations: Best Practices",
      slug: "building-bulletproof-api-integrations",
      content:
        `<div>
          <h2>The Challenge of Modern Integrations</h2>
          <p>Connecting isolated database stacks and third-party APIs requires rigorous error logging, self-healing queues, and clear data schema validations. A single point of failure in an integration pipeline can lead to disastrous data corruption.</p>
          <h3>Idempotency is Key</h3>
          <p>When designing APIs, ensuring operations are idempotent is crucial. This means that if a network failure occurs and a client retries a request, the system state remains consistent without duplicating records or triggering unintended side-effects.</p>
          <h3>Implementing Circuit Breakers</h3>
          <p>Relying on external APIs means you are at the mercy of their uptime. Implementing circuit breaker patterns ensures your application degrades gracefully rather than crashing completely when a third-party service goes offline.</p>
          <h3>Conclusion</h3>
          <p>Robust integrations require defensive programming, comprehensive logging, and robust queueing systems like RabbitMQ or BullMQ to ensure absolute data integrity.</p>
        </div>`,
      excerpt:
        "Discover modern design patterns and practices to keep multi-platform systems synchronized cleanly and securely.",
      author: "Zebotix Core Team",
      tags: ["APIs", "Database", "Integrations"],
      isPublished: true,
      isFeatured: true,
      publishedAt: new Date(),
    },
  ];

  for (const blog of blogs) {
    const exists = await prisma.blogPost.findUnique({ where: { slug: blog.slug } });
    if (!exists) {
      await prisma.blogPost.create({ data: blog });
    }
  }
  console.log("Blogs seeded successfully.");
}
