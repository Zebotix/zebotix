/* eslint-disable no-console */

import { type PrismaClient } from "../../src/generated/prisma/client";

export async function seedCMS(prisma: PrismaClient) {
  console.log("Seeding CMS (Legal Pages, FAQs, Site Settings)...");

  // Legal Pages
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
    const exists = await prisma.legalPage.findUnique({ where: { slug: page.slug } });
    if (!exists) {
      await prisma.legalPage.create({ data: page });
    }
  }

  // FAQs
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
    const exists = await prisma.fAQ.findFirst({ where: { question: f.question } });
    if (!exists) {
      await prisma.fAQ.create({ data: f });
    }
  }

  // Site Settings
  const settingExists = await prisma.siteSetting.findUnique({ where: { key: "brand_colors" } });
  if (!settingExists) {
    await prisma.siteSetting.create({
      data: {
        key: "brand_colors",
        group: "theme",
        value: { primary: "#1d4ed8", background: "#09090b", text: "#ffffff" },
      },
    });
  }

  // Navigation Links
  const headerLinks = [
    { label: "Home", href: "/", order: 1, location: "header" },
    { label: "About", href: "/about", order: 2, location: "header" },
    { label: "Solutions", href: "/solutions", order: 3, location: "header" },
    { label: "Blogs", href: "/blog", order: 4, location: "header" },
    { label: "Portfolio", href: "/work", order: 5, location: "header" },
    { label: "Testimonials", href: "/testimonials", order: 6, location: "header" },
    { label: "Contact", href: "/contact", order: 7, location: "header" },
    { label: "Quick Quote", href: "/quick-quote", order: 8, location: "header" },
  ];

  for (const link of headerLinks) {
    const exists = await prisma.navigationItem.findFirst({ where: { label: link.label, location: "header" } });
    if (!exists) {
      await prisma.navigationItem.create({ data: link });
    }
  }

  const footerLinks = [
    { label: "Cookie Policy", href: "/cookie-policy", order: 1, location: "footer" },
    { label: "GDPR", href: "/gdpr", order: 2, location: "footer" },
    { label: "Privacy Policy", href: "/privacy", order: 3, location: "footer" },
    { label: "Terms and Conditions", href: "/terms", order: 4, location: "footer" },
  ];

  for (const link of footerLinks) {
    const exists = await prisma.navigationItem.findFirst({ where: { label: link.label, location: "footer" } });
    if (!exists) {
      await prisma.navigationItem.create({ data: link });
    }
  }

  // Manifest Config
  const manifestExists = await prisma.siteSetting.findUnique({ where: { key: "manifest_config" } });
  if (!manifestExists) {
    await prisma.siteSetting.create({
      data: {
        key: "manifest_config",
        group: "general",
        value: {
          name: "Zebotix Software Engineering",
          shortName: "Zebotix",
          description: "Empowering innovation with scalable software architecture, AI automation, and bespoke cloud infrastructure.",
          backgroundColor: "#09090b",
          themeColor: "#1d4ed8"
        },
      },
    });
  }

  console.log("CMS seeded successfully.");
}
