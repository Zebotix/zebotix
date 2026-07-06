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

export async function getPaginatedTestimonialsAction(page: number = 1, limit: number = 10) {
  try {
    const skip = (page - 1) * limit;
    
    const [testimonials, totalCount] = await Promise.all([
      prisma.testimonial.findMany({
        where: { isPublished: true },
        orderBy: { order: 'asc' },
        skip,
        take: limit,
      }),
      prisma.testimonial.count({
        where: { isPublished: true },
      })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return { 
      success: true, 
      data: testimonials,
      meta: {
        totalCount,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      }
    };
  } catch (error) {
    console.error('Error fetching paginated testimonials:', error);
    return { 
      success: false, 
      error: 'Failed to fetch testimonials', 
      data: [],
      meta: {
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false,
      }
    };
  }
}
