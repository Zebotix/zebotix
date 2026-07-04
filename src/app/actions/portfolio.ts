'use server';

import prisma from '@/lib/db/prisma';

export async function getPortfoliosAction() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: portfolios };
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    return { success: false, error: 'Failed to fetch portfolios', data: [] };
  }
}

export async function getFeaturedPortfoliosAction() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      where: { isPublished: true, isFeatured: true },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: portfolios };
  } catch (error) {
    console.error('Error fetching featured portfolios:', error);
    return { success: false, error: 'Failed to fetch featured portfolios', data: [] };
  }
}

export async function getPortfolioBySlugAction(slug: string) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { slug },
      include: { solution_rel: true },
    });
    if (!portfolio) {
      return { success: false, error: 'Portfolio not found' };
    }
    return { success: true, data: portfolio };
  } catch (error) {
    console.error(`Error fetching portfolio with slug ${slug}:`, error);
    return { success: false, error: 'Failed to fetch portfolio details' };
  }
}
