'use server';

import prisma from '@/lib/db/prisma';

export async function getFaqsAction(category?: string, page?: string) {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: {
        isPublished: true,
        ...(category ? { category } : {}),
        ...(page ? { page } : {}),
      },
      orderBy: { order: 'asc' },
    });
    return { success: true, data: faqs };
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return { success: false, error: 'Failed to fetch FAQs', data: [] };
  }
}
