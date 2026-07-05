'use server';

import prisma from '@/lib/db/prisma';

export async function getLegalPageAction(slug: string) {
  try {
    const page = await prisma.legalPage.findUnique({
      where: { slug },
    });
    if (!page) {
      return { success: false, error: 'Page not found' };
    }
    return { success: true, data: page };
  } catch (error) {
    console.error(`Error fetching legal page with slug ${slug}:`, error);
    return { success: false, error: 'Failed to fetch page details' };
  }
}
