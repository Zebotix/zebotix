'use server';

import prisma from '@/lib/db/prisma';

export async function getTestimonialsAction(onlyFeatured = false) {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        isPublished: true,
        ...(onlyFeatured ? { isFeatured: true } : {}),
      },
      orderBy: { order: 'asc' },
    });
    return { success: true, data: testimonials };
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return { success: false, error: 'Failed to fetch testimonials', data: [] };
  }
}
