/* eslint-disable no-console */

import { type PrismaClient } from "../../src/generated/prisma/client";

export async function seedTestimonials(prisma: PrismaClient) {
  console.log("Seeding Testimonials...");
  const testimonials = [
    { name: "Sarah Jenkins", role: "CTO", company: "Apex Ledger", content: "Zebotix completely transformed our backend infrastructure. Our page loading speeds dropped by 60% and we successfully scaled to 5x traffic without a single hiccup.", rating: 5, isFeatured: true, isPublished: true, order: 1 },
    { name: "Marcus Vance", role: "Founder", company: "ShiftFlow AI", content: "The team is exceptionally technical. They built a custom AI pipeline that saves our operations team over 30 hours of manual work every single week.", rating: 5, isFeatured: true, isPublished: true, order: 2 },
    { name: "Elena Rostova", role: "Head of Digital", company: "Moderna Brand Group", content: "Their zero-compromise approach to type-safe code and modern design systems has elevated our digital platform to a premium, international level.", rating: 5, isFeatured: true, isPublished: true, order: 3 },
    { name: "David Chen", role: "Director of Engineering", company: "CloudScale Systems", content: "Working with Zebotix was a breath of fresh air. They don't just write code; they architect scalable solutions that stand the test of time.", rating: 5, isFeatured: false, isPublished: true, order: 4 },
    { name: "Aisha Patel", role: "Product Manager", company: "FinTech Innovators", content: "The level of communication and technical expertise provided was outstanding. They delivered our complex financial dashboard ahead of schedule.", rating: 4, isFeatured: false, isPublished: true, order: 5 },
    { name: "James Wilson", role: "CEO", company: "NextGen Retail", content: "Our e-commerce platform was struggling under load until Zebotix refactored our entire architecture. We've seen a 40% increase in conversions since.", rating: 5, isFeatured: false, isPublished: true, order: 6 },
    { name: "Sophia Martinez", role: "Lead Designer", company: "Creative Studios", content: "As a designer, I'm extremely particular about implementation. Zebotix matched our Figma designs pixel-perfectly while maintaining incredible performance.", rating: 5, isFeatured: true, isPublished: true, order: 7 },
    { name: "Robert Taylor", role: "VP of Operations", company: "LogiTech Solutions", content: "The custom logistics tracking system they built for us has become the backbone of our business. Truly exceptional engineering.", rating: 5, isFeatured: false, isPublished: true, order: 8 },
    { name: "Emma Thompson", role: "Marketing Director", company: "Growth Drivers", content: "The marketing site they developed is lightning fast and highly optimized for SEO. Our organic traffic has doubled in just three months.", rating: 4, isFeatured: false, isPublished: true, order: 9 },
    { name: "Michael Chang", role: "Chief Architect", company: "DataSync", content: "Their knowledge of modern cloud infrastructure and serverless patterns is top-notch. They helped us migrate our legacy monolithic application flawlessly.", rating: 5, isFeatured: false, isPublished: true, order: 10 },
    { name: "Olivia Brown", role: "Startup Founder", company: "EcoApp", content: "Zebotix helped turn our MVP into a robust, enterprise-ready platform. Their guidance on architecture choices was invaluable.", rating: 5, isFeatured: false, isPublished: true, order: 11 },
    { name: "William Davies", role: "IT Director", company: "Global Enterprises", content: "Security was our top concern, and Zebotix implemented a zero-trust architecture that exceeded our rigorous compliance requirements.", rating: 5, isFeatured: false, isPublished: true, order: 12 },
    { name: "Isabella Rossi", role: "Head of Product", company: "HealthTech Innovations", content: "The healthcare application they built for us is secure, intuitive, and highly performant. The team's attention to detail is remarkable.", rating: 5, isFeatured: true, isPublished: true, order: 13 },
    { name: "Thomas Anderson", role: "CTO", company: "CyberDefense Corp", content: "We brought Zebotix in for a critical system rescue. They identified the bottlenecks immediately and rewrote the problematic services with precision.", rating: 5, isFeatured: false, isPublished: true, order: 14 },
    { name: "Sophie Clark", role: "E-commerce Manager", company: "Retail Revolution", content: "The headless commerce solution they implemented gave us the flexibility we needed to expand internationally. Sales are up across the board.", rating: 4, isFeatured: false, isPublished: true, order: 15 },
  ];

  for (const t of testimonials) {
    const exists = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (!exists) {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log("Testimonials seeded successfully.");
}
