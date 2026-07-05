/* eslint-disable no-console */
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "./../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting database seed...");

  // 1. Clean up existing data to avoid unique constraint errors during re-seeding
  await prisma.portfolio.deleteMany();
  await prisma.solution.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.revision.deleteMany();
  await prisma.legalPage.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.navigationItem.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Admin User
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "mzeeshankhan0988@gmail.com",
      passwordHash: "$2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW", // default password123
      role: "admin",
    },
  });
  console.log("Admin user created");

  // 3. Create 6 Premium Solutions
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
    await prisma.solution.create({ data: sol });
  }
  console.log("6 Solutions seeded successfully.");

  // 4. Create 3 Premium Testimonials
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "CTO",
      company: "Apex Ledger",
      content:
        "Zebotix completely transformed our backend infrastructure. Our page loading speeds dropped by 60% and we successfully scaled to 5x traffic without a single hiccup.",
      rating: 5,
      isFeatured: true,
      isPublished: true,
      order: 1,
    },
    {
      name: "Marcus Vance",
      role: "Founder",
      company: "ShiftFlow AI",
      content:
        "The team is exceptionally technical. They built a custom AI pipeline that saves our operations team over 30 hours of manual work every single week.",
      rating: 5,
      isFeatured: true,
      isPublished: true,
      order: 2,
    },
    {
      name: "Elena Rostova",
      role: "Head of Digital",
      company: "Moderna Brand Group",
      content:
        "Their zero-compromise approach to type-safe code and modern design systems has elevated our digital platform to a premium, international level.",
      rating: 5,
      isFeatured: true,
      isPublished: true,
      order: 3,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log("3 Testimonials seeded successfully.");

  // 5. Create 3 Blog Posts
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
    await prisma.blogPost.create({ data: blog });
  }
  console.log("3 Blog posts seeded successfully.");

  // 6. Create 4 Legal Pages
  const legalPages = [
    {
      title: "Privacy Policy",
      slug: "privacy",
      content:
        "<h2>Privacy Policy</h2><p>This is the privacy policy for Zebotix. We are committed to protecting your personal data and privacy.</p>",
      isPublished: true,
    },
    {
      title: "Terms & Conditions",
      slug: "terms",
      content:
        "<h2>Terms & Conditions</h2><p>These are the terms and conditions for using Zebotix services. By using our website, you accept these terms in full.</p>",
      isPublished: true,
    },
    {
      title: "Cookie Policy",
      slug: "cookies",
      content:
        "<h2>Cookie Policy</h2><p>This policy details how Zebotix uses cookies to enhance user experience and analyze traffic.</p>",
      isPublished: true,
    },
    {
      title: "GDPR Compliance Statement",
      slug: "gdpr",
      content:
        "<h2>GDPR Compliance Statement</h2><p>We are fully compliant with GDPR regulations. You retain full ownership, access, and deletion rights over your data.</p>",
      isPublished: true,
    },
  ];

  for (const page of legalPages) {
    await prisma.legalPage.create({ data: page });
  }
  console.log("4 Legal pages seeded successfully.");

  // 7. Create 5 Global/Solution FAQs
  const faqs = [
    {
      question: "How does Zebotix approach custom software development?",
      answer:
        "We engineer systems from the ground up to avoid typical layout builder bloat. Every project is planned, structured in a type-safe format, and optimized for performance using modern technologies like Next.js and serverless architectures.",
      category: "general",
      order: 1,
      isPublished: true,
    },
    {
      question: "What is your typical project timeline?",
      answer:
        "A standard enterprise-grade project takes between 6 to 12 weeks. We split progress into bi-weekly sprints, meaning you see working updates constantly throughout the implementation cycle.",
      category: "general",
      order: 2,
      isPublished: true,
    },
    {
      question: "Do you offer post-launch support and maintenance?",
      answer:
        "Yes, we provide ongoing maintenance, scaling support, security patches, and direct developer communication channels to keep your system performing at its peak.",
      category: "general",
      order: 3,
      isPublished: true,
    },
    {
      question: "Can you integrate AI capabilities into our existing systems?",
      answer:
        "Absolutely. We specialize in retrofitting legacy backends with semantic vector search, custom LLM integration, and automated pipeline scripts.",
      category: "general",
      order: 4,
      isPublished: true,
    },
    {
      question: "How do you ensure data security and compliance?",
      answer:
        "We enforce strict encryption at rest and in transit, implement role-based access control, follow GDPR privacy-by-design standards, and run continuous dependency audits.",
      category: "general",
      order: 5,
      isPublished: true,
    },
  ];

  for (const f of faqs) {
    await prisma.fAQ.create({ data: f });
  }
  console.log("5 FAQs seeded successfully.");

  // 8. Site Settings
  await prisma.siteSetting.create({
    data: {
      key: "brand_colors",
      group: "theme",
      value: { primary: "#1d4ed8", background: "#09090b", text: "#ffffff" },
    },
  });
  console.log("Site settings created.");

  console.log("Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
