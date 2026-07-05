/* eslint-disable no-console */

import { type PrismaClient } from "../../src/generated/prisma/client";

export async function seedTestimonials(prisma: PrismaClient) {
  console.log("Seeding Testimonials...");
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
    const exists = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (!exists) {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log("Testimonials seeded successfully.");
}
