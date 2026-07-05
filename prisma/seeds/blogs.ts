/* eslint-disable no-console */
import { type PrismaClient } from "../../src/generated/prisma/client";

export async function seedBlogs(prisma: PrismaClient) {
  console.log("Seeding Blogs...");
  const blogs = [
    {
      title: "The Future of Web Development with Next.js 16",
      slug: "future-of-web-dev-nextjs-16",
      content:
        "<p>Next.js 16 introduces groundbreaking features for caching, performance optimization, and server component data streaming. In this article, we analyze how these upgrades speed up user load rates...</p>",
      excerpt:
        "Discover how Next.js 16 is revolutionizing the way we build high-performance web applications.",
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
        "<p>Small and large enterprises are adopting AI at an unprecedented rate to streamline workflow overheads and eliminate operational bottlenecks...</p>",
      excerpt:
        "Learn why adopting custom AI automation pipelines is essential to scale modern business workflows.",
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
        "<p>Connecting isolated database stacks and third-party APIs requires rigorous error logging, self-healing queues, and clear data schema validations...</p>",
      excerpt:
        "Discover modern design patterns and practices to keep multi-platform systems synchronized cleanly.",
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
