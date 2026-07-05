/* eslint-disable no-console */

import { type PrismaClient } from "../../src/generated/prisma/client";

export async function seedSolutions(prisma: PrismaClient) {
  console.log("Seeding Solutions...");
  const solutions = [
    {
      title: "Custom Software Engineering",
      slug: "custom-software-engineering",
      tagline: "Tailored full-stack platforms designed for performance and scale.",
      description:
        "<p>We design and engineer bespoke software platforms. From type-safe Next.js systems to highly optimized Node.js backends, we build digital infrastructure that scales seamlessly with your business growth without generic template compromises.</p>",
      benefits: [
        { title: "Type-Safe Architecture", desc: "Solid types for bulletproof deployments." },
        { title: "Peak Speed & SEO", desc: "Optimized Core Web Vitals out-of-the-box." },
        { title: "Uncompromising Quality", desc: "Strict coding standards and clean designs." },
      ],
      isPublished: true,
      order: 1,
    },
    {
      title: "AI-Driven Automation",
      slug: "ai-driven-automation",
      tagline: "Streamline workflows and operations with custom AI pipelines.",
      description:
        "<p>Integrate cutting-edge AI technologies directly into your business processes. We design custom NLP models, semantic vector searches, automated data extraction engines, and agent workflows that drastically cut down manual efforts.</p>",
      benefits: [
        { title: "Workflow Efficiencies", desc: "Reduce repetitive tasks by up to 85%." },
        { title: "Advanced Semantic RAG", desc: "Supercharge internal data discovery." },
        { title: "Continuous Optimizations", desc: "AI systems that learn and adapt over time." },
      ],
      isPublished: true,
      order: 2,
    },
    {
      title: "High-Performance E-Commerce",
      slug: "high-performance-ecommerce",
      tagline: "Ultra-fast headless shopping experiences that maximize conversions.",
      description:
        "<p>Next-generation headless commerce solutions. We construct ultra-responsive checkouts, lightning-fast inventory synchronization pipelines, and custom dashboards using modern cart architectures that load instantly.</p>",
      benefits: [
        { title: "Sub-Second Load Times", desc: "Zero-latency page transitions." },
        { title: "Seamless Checkout Funnels", desc: "Engineered to minimize drop-off rates." },
        { title: "Robust Integrations", desc: "Sync effortlessly with ERPs, CRMs, and APIs." },
      ],
      isPublished: true,
      order: 3,
    },
    {
      title: "Intelligent Workflows & API Integrations",
      slug: "intelligent-workflows-api",
      tagline: "Unify isolated software into unified automated networks.",
      description:
        "<p>We design bulletproof API middleware integrations. Say goodbye to manual data entries: our systems bridge databases, third-party services, and legacy platforms with absolute data integrity and logging.</p>",
      benefits: [
        { title: "Real-Time Syncing", desc: "Zero-latency synchronization." },
        { title: "Advanced Log Visibility", desc: "Monitor all system transfers cleanly." },
        { title: "Error Auto-Recovery", desc: "Self-healing pipeline routines." },
      ],
      isPublished: true,
      order: 4,
    },
    {
      title: "Cloud Infrastructure & DevOps",
      slug: "cloud-infrastructure-devops",
      tagline: "Secure, reliable, and automated infrastructure deployments.",
      description:
        "<p>Modern cloud architecture management. We provision production-ready, auto-scaling environments using Terraform on AWS or GCP, implementing robust CI/CD pipelines and logging setups.</p>",
      benefits: [
        { title: "Auto-Scaling Architectures", desc: "Handles unexpected traffic surges cleanly." },
        { title: "Production GitOps", desc: "Deploy with complete version security." },
        { title: "24/7 Reliability", desc: "Continuous uptime monitoring and health checks." },
      ],
      isPublished: true,
      order: 5,
    },
    {
      title: "Database Architecture & Design",
      slug: "database-architecture-design",
      tagline: "Highly optimized database schemas for maximum throughput.",
      description:
        "<p>We design custom database systems and write clean schemas. From high-performance PostgreSQL queries to distributed caching strategies using Redis, we ensure your data layer is secure, clean, and fast.</p>",
      benefits: [
        { title: "Optimized Query Indexes", desc: "Get database responses in milliseconds." },
        { title: "Clean Data Normalization", desc: "Maintain data integrity universally." },
        { title: "Replication & Backups", desc: "Auto-backups and zero-data-loss setups." },
      ],
      isPublished: true,
      order: 6,
    },
  ];

  for (const sol of solutions) {
    const exists = await prisma.solution.findUnique({ where: { slug: sol.slug } });
    if (!exists) {
      await prisma.solution.create({ data: sol });
    }
  }
  console.log("Solutions seeded successfully.");
}
