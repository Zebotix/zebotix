'use server';

import prisma from '@/lib/db/prisma';

export async function getNavigationLinksAction(location: 'header' | 'footer' = 'header') {
  try {
    const navItems = await prisma.navigationItem.findMany({
      where: {
        isVisible: true,
        location,
        parentId: null, // Get top-level items
      },
      include: {
        children: {
          where: {
            isVisible: true,
          },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });

    return { success: true, data: navItems };
  } catch (error) {
    console.error(`Error fetching ${location} navigation links:`, error);
    return { success: false, error: 'Failed to fetch navigation links', data: [] };
  }
}
