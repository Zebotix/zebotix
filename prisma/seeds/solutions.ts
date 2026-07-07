/* eslint-disable no-console */

import { type PrismaClient } from "../../src/generated/prisma/client";

export async function seedSolutions(prisma: PrismaClient) {
  console.log("Seeding Solutions...");
  const solutions = [
    {
      title: "Custom Software Engineering",
      slug: "custom-software-engineering",
      category: "Engineering & Development",
      tagline: "Tailored full-stack platforms designed for performance and scale.",
      description:
        `<p>We design and engineer bespoke software platforms. From type-safe Next.js systems to highly optimized Node.js backends, we build digital infrastructure that scales seamlessly with your business growth without generic template compromises.</p>
        <p>Our engineering process is grounded in Test-Driven Development (TDD) and Domain-Driven Design (DDD), ensuring that every feature we ship is robust, secure, and perfectly aligned with your core business logic.</p>
        <ul>
          <li><strong>Architecture:</strong> Microservices or modular monoliths tailored to your exact needs.</li>
          <li><strong>Performance:</strong> Sub-second load times guaranteed by Edge caching and SSR.</li>
          <li><strong>Security:</strong> Enterprise-grade encryption, OWASP top 10 compliance, and regular penetration testing.</li>
        </ul>`,
      benefits: [
        { title: "Type-Safe Architecture", desc: "Solid types for bulletproof deployments." },
        { title: "Peak Speed & SEO", desc: "Optimized Core Web Vitals out-of-the-box." },
        { title: "Uncompromising Quality", desc: "Strict coding standards and clean designs." },
      ],
      process: [
        { title: "Discovery & Architecture", desc: "We map out your business logic, defining the technology stack and system architecture required for optimal scalability." },
        { title: "Sprint Planning", desc: "Agile methodologies are employed to break down the project into manageable, transparent milestones." },
        { title: "Development & Testing", desc: "Writing clean, test-driven code with rigorous automated QA to eliminate bugs early in the cycle." },
        { title: "Deployment & Scaling", desc: "Smooth rollout using advanced CI/CD pipelines, ensuring zero downtime and instant scalability." }
      ],
      technologies: [
        { name: "Next.js", icon: "nextjs" },
        { name: "React", icon: "react" },
        { name: "Node.js", icon: "node" },
        { name: "TypeScript", icon: "typescript" },
        { name: "PostgreSQL", icon: "database" },
        { name: "Docker", icon: "docker" }
      ],
      icon: "code",
      image: "https://images.unsplash.com/photo-1607799279861-4dddf913eb2d?auto=format&fit=crop&q=80&w=1200",
      faq: [
        { question: "How long does a typical software project take?", answer: "Depending on complexity, an MVP can be ready in 6-8 weeks, while full enterprise platforms may take 4-6 months." },
        { question: "Do you provide post-launch support?", answer: "Yes, we offer ongoing maintenance and SLA-backed support packages to ensure your platform remains secure and up-to-date." },
        { question: "Will I own the source code?", answer: "Absolutely. Upon final payment, full intellectual property and source code rights are transferred to you." }
      ],
      seo: { 
        title: "Custom Software Engineering Services | Zebotix", 
        description: "Bespoke full-stack web and software development services tailored for scale. Next.js and Node.js experts.", 
        keywords: "custom software development, full stack engineering, nextjs development, enterprise software" 
      },
      isPublished: true,
      order: 1,
    },
    {
      title: "AI-Driven Automation",
      slug: "ai-driven-automation",
      category: "AI & Automation",
      tagline: "Streamline workflows and operations with custom AI pipelines.",
      description:
        `<p>Integrate cutting-edge AI technologies directly into your business processes. We design custom NLP models, semantic vector searches, automated data extraction engines, and agent workflows that drastically cut down manual efforts.</p>
        <p>Whether you need an intelligent document parsing system to handle thousands of invoices daily, or a customer-facing conversational agent that resolves tier-1 support tickets automatically, our AI division builds systems that deliver immediate ROI.</p>`,
      benefits: [
        { title: "Workflow Efficiencies", desc: "Reduce repetitive tasks by up to 85%." },
        { title: "Advanced Semantic RAG", desc: "Supercharge internal data discovery." },
        { title: "Continuous Optimizations", desc: "AI systems that learn and adapt over time." },
      ],
      process: [
        { title: "Use Case Identification", desc: "We analyze your operations to pinpoint exactly where AI can deliver the highest ROI and efficiency gains." },
        { title: "Data Preparation", desc: "Cleaning, structuring, and vectorizing your enterprise data to feed highly accurate machine learning models." },
        { title: "Model Engineering", desc: "Fine-tuning LLMs and developing robust Retrieval-Augmented Generation (RAG) pipelines." },
        { title: "Integration & Monitoring", desc: "Deploying AI agents securely into your existing software ecosystem with real-time performance tracking." }
      ],
      technologies: [
        { name: "Python", icon: "python" },
        { name: "LangChain", icon: "cpu" },
        { name: "OpenAI", icon: "bot" },
        { name: "Hugging Face", icon: "smile" },
        { name: "Pinecone", icon: "database" },
        { name: "FastAPI", icon: "server" }
      ],
      icon: "bot",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
      faq: [
        { question: "Can AI integrate with our legacy systems?", answer: "Yes, we build middleware that allows modern AI agents and LLMs to interact safely with legacy databases and APIs." },
        { question: "Is our data safe when using AI?", answer: "We deploy private, isolated AI models and utilize strict data masking to ensure your proprietary information is never leaked or used for public training." },
        { question: "What processes are best suited for AI automation?", answer: "Repetitive data entry, customer support triage, document parsing, and large-scale data analysis yield the highest immediate ROI." }
      ],
      seo: { 
        title: "AI-Driven Automation & LLM Integration | Zebotix", 
        description: "Automate your business workflows with custom AI pipelines, semantic RAG, and intelligent agents.", 
        keywords: "AI automation, custom LLM, semantic search, AI workflows, enterprise AI" 
      },
      isPublished: true,
      order: 2,
    },
    {
      title: "High-Performance E-Commerce",
      slug: "high-performance-ecommerce",
      category: "Engineering & Development",
      tagline: "Ultra-fast headless shopping experiences that maximize conversions.",
      description:
        `<p>Next-generation headless commerce solutions. We construct ultra-responsive checkouts, lightning-fast inventory synchronization pipelines, and custom dashboards using modern cart architectures that load instantly.</p>
        <p>By decoupling the frontend presentation layer from the backend commerce engine (e.g., Shopify Plus, Swell, Medusa), we unlock unprecedented design flexibility and performance. Every millisecond counts in e-commerce, and our systems are engineered to minimize cart abandonment through sheer speed.</p>`,
      benefits: [
        { title: "Sub-Second Load Times", desc: "Zero-latency page transitions." },
        { title: "Seamless Checkout Funnels", desc: "Engineered to minimize drop-off rates." },
        { title: "Robust Integrations", desc: "Sync effortlessly with ERPs, CRMs, and APIs." },
      ],
      process: [
        { title: "Commerce Strategy", desc: "Evaluating your product catalog, target audience, and fulfillment logistics to design a winning strategy." },
        { title: "UI/UX Prototyping", desc: "Crafting frictionless, conversion-optimized shopping experiences tailored to your brand identity." },
        { title: "Headless Integration", desc: "Connecting modern frontends (like Next.js) with powerful backend commerce engines (Shopify, Medusa)." },
        { title: "QA & Go-Live", desc: "Extensive load testing and payment gateway verification before executing a flawless launch." }
      ],
      technologies: [
        { name: "Shopify Plus", icon: "shopping-cart" },
        { name: "Medusa", icon: "server" },
        { name: "Next.js", icon: "nextjs" },
        { name: "Tailwind CSS", icon: "layout" },
        { name: "Stripe", icon: "credit-card" }
      ],
      icon: "shopping-cart",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200",
      faq: [
        { question: "What is headless e-commerce?", answer: "Headless commerce separates the frontend storefront from the backend database, allowing for ultra-fast load times and infinite design flexibility." },
        { question: "Can you migrate my existing Shopify store to headless?", answer: "Yes, we frequently migrate standard Shopify stores to headless architectures using Next.js, retaining all your data while supercharging performance." },
        { question: "How does site speed affect my sales?", answer: "Amazon found that every 100ms of latency costs them 1% in sales. A sub-second load time dramatically reduces bounce rates and boosts conversion." }
      ],
      seo: { 
        title: "Headless E-Commerce Development | Zebotix", 
        description: "Maximize your conversion rates with ultra-fast, headless e-commerce architectures on Shopify Plus and Medusa.", 
        keywords: "headless ecommerce, shopify plus, fast checkout, ecommerce performance" 
      },
      isPublished: true,
      order: 3,
    },
    {
      title: "Intelligent Workflows & API Integrations",
      slug: "intelligent-workflows-api",
      category: "AI & Automation",
      tagline: "Unify isolated software into unified automated networks.",
      description:
        `<p>We design bulletproof API middleware integrations. Say goodbye to manual data entries: our systems bridge databases, third-party services, and legacy platforms with absolute data integrity and logging.</p>
        <p>Utilizing message brokers like RabbitMQ and Kafka, we build resilient, event-driven architectures that guarantee message delivery even during network outages. This ensures your sales data, inventory counts, and customer records are always in perfect sync across all your tools.</p>`,
      benefits: [
        { title: "Real-Time Syncing", desc: "Zero-latency synchronization." },
        { title: "Advanced Log Visibility", desc: "Monitor all system transfers cleanly." },
        { title: "Error Auto-Recovery", desc: "Self-healing pipeline routines." },
      ],
      process: [
        { title: "Systems Audit", desc: "Comprehensive mapping of your existing software stack and identifying workflow bottlenecks." },
        { title: "Data Flow Architecture", desc: "Designing secure, bidirectional data pipelines utilizing event-driven microservices." },
        { title: "Middleware Development", desc: "Building resilient API connectors with strict error handling, retries, and logging." },
        { title: "End-to-End Testing", desc: "Simulating edge cases and high-traffic scenarios to ensure 100% data integrity." }
      ],
      technologies: [
        { name: "Node.js", icon: "node" },
        { name: "Apache Kafka", icon: "activity" },
        { name: "RabbitMQ", icon: "message-circle" },
        { name: "GraphQL", icon: "share-2" },
        { name: "REST APIs", icon: "globe" }
      ],
      icon: "git-merge",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
      faq: [
        { question: "How do you ensure data isn't lost during syncing?", answer: "We use robust message brokers like Kafka and RabbitMQ. If a receiving service goes down, messages are queued and retried automatically once the service is restored." },
        { question: "Can you connect software that doesn't have an API?", answer: "In cases where a modern API isn't available, we can develop custom web scrapers, database direct connections, or RPA (Robotic Process Automation) scripts." },
        { question: "Is the data transfer secure?", answer: "All data in transit is encrypted via TLS 1.3, and we utilize strict IP whitelisting and API gateway authentications." }
      ],
      seo: { 
        title: "API Integrations & Automated Workflows | Zebotix", 
        description: "Connect your isolated software systems with robust API middleware and event-driven architectures.", 
        keywords: "API integration, middleware, system architecture, data syncing, automated workflows" 
      },
      isPublished: true,
      order: 4,
    },
    {
      title: "Cloud Infrastructure & DevOps",
      slug: "cloud-infrastructure-devops",
      category: "Infrastructure & Data",
      tagline: "Secure, reliable, and automated infrastructure deployments.",
      description:
        `<p>Modern cloud architecture management. We provision production-ready, auto-scaling environments using Terraform on AWS or GCP, implementing robust CI/CD pipelines and logging setups.</p>
        <p>Our DevOps engineers implement Infrastructure as Code (IaC) principles to ensure environments are reproducible, secure, and cost-effective. From Kubernetes clusters to serverless edge deployments, we build the foundation that keeps your application online 24/7/365.</p>`,
      benefits: [
        { title: "Auto-Scaling Architectures", desc: "Handles unexpected traffic surges cleanly." },
        { title: "Production GitOps", desc: "Deploy with complete version security." },
        { title: "24/7 Reliability", desc: "Continuous uptime monitoring and health checks." },
      ],
      process: [
        { title: "Infrastructure Audit", desc: "Reviewing your current hosting environment for security vulnerabilities and cost inefficiencies." },
        { title: "Cloud Architecture Design", desc: "Drafting a highly available, fault-tolerant cloud topology utilizing modern IaC practices." },
        { title: "CI/CD Setup", desc: "Automating your build, test, and deployment phases to drastically reduce time-to-market." },
        { title: "Security Hardening", desc: "Implementing strict IAM policies, VPC peering, and continuous compliance monitoring." }
      ],
      technologies: [
        { name: "AWS", icon: "cloud" },
        { name: "Google Cloud", icon: "cloud" },
        { name: "Kubernetes", icon: "box" },
        { name: "Terraform", icon: "code" },
        { name: "GitHub Actions", icon: "git-commit" },
        { name: "Datadog", icon: "activity" }
      ],
      icon: "cloud",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
      faq: [
        { question: "Which cloud providers do you support?", answer: "Our primary expertise is in AWS and Google Cloud Platform (GCP), but we also support Azure and specialized providers like Vercel and Neon." },
        { question: "What is Infrastructure as Code (IaC)?", answer: "IaC means writing code (using Terraform) to define your servers and databases, making your entire infrastructure version-controlled and instantly reproducible." },
        { question: "How do you handle traffic spikes?", answer: "We design auto-scaling Kubernetes or serverless architectures that automatically provision new resources as traffic increases, then scale down to save costs." }
      ],
      seo: { 
        title: "Cloud Infrastructure & DevOps Engineering | Zebotix", 
        description: "Secure, scalable cloud deployments and DevOps automation using AWS, Kubernetes, and Terraform.", 
        keywords: "devops, cloud infrastructure, AWS, terraform, CI/CD, kubernetes" 
      },
      isPublished: true,
      order: 5,
    },
    {
      title: "Database Architecture & Design",
      slug: "database-architecture-design",
      category: "Infrastructure & Data",
      tagline: "Highly optimized database schemas for maximum throughput.",
      description:
        `<p>We design custom database systems and write clean schemas. From high-performance PostgreSQL queries to distributed caching strategies using Redis, we ensure your data layer is secure, clean, and fast.</p>
        <p>We analyze query execution plans, optimize indexes, and implement read-replicas to ensure your database can handle millions of concurrent connections without breaking a sweat.</p>`,
      benefits: [
        { title: "Optimized Query Indexes", desc: "Get database responses in milliseconds." },
        { title: "Clean Data Normalization", desc: "Maintain data integrity universally." },
        { title: "Replication & Backups", desc: "Auto-backups and zero-data-loss setups." },
      ],
      process: [
        { title: "Data Modeling", desc: "Designing normalized, extensible database schemas that perfectly mirror your business domain." },
        { title: "Performance Tuning", desc: "Analyzing query execution plans and implementing strategic indexing for lightning-fast reads." },
        { title: "Migration Strategy", desc: "Safely transitioning legacy data to new architectures with zero downtime or data loss." },
        { title: "Caching & Replication", desc: "Implementing Redis caching layers and read-replicas to handle enterprise-scale traffic." }
      ],
      technologies: [
        { name: "PostgreSQL", icon: "database" },
        { name: "MongoDB", icon: "database" },
        { name: "Redis", icon: "zap" },
        { name: "Prisma ORM", icon: "layers" },
        { name: "Supabase", icon: "cloud" }
      ],
      icon: "database",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
      faq: [
        { question: "When should I use NoSQL vs SQL?", answer: "We recommend SQL (like PostgreSQL) for highly structured, relational data where ACID compliance is critical. NoSQL (like MongoDB) is better for flexible, unstructured document storage." },
        { question: "How do you speed up a slow database?", answer: "We start by analyzing query execution plans, then add strategic indexes, optimize schema normalizations, and introduce Redis caching layers where appropriate." },
        { question: "What is a read-replica?", answer: "It's a synchronized copy of your primary database dedicated solely to answering read queries, which massively reduces the load on your main server." }
      ],
      seo: { 
        title: "Database Architecture & Optimization | Zebotix", 
        description: "High-performance database design, query optimization, and secure scaling for PostgreSQL, Redis, and MongoDB.", 
        keywords: "database architecture, query optimization, PostgreSQL, Redis, database scaling" 
      },
      isPublished: true,
      order: 6,
    },
  ];

  for (const sol of solutions) {
    await prisma.solution.upsert({
      where: { slug: sol.slug },
      update: sol,
      create: sol,
    });
  }
  console.log("Solutions seeded successfully.");
}
