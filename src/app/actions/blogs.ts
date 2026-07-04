'use server';

import prisma from '@/lib/db/prisma';

export async function getBlogsAction(onlyFeatured = false) {
  try {
    const blogs = await prisma.blogPost.findMany({
      where: {
        isPublished: true,
        ...(onlyFeatured ? { isFeatured: true } : {}),
      },
      orderBy: { publishedAt: 'desc' },
    });
    return { success: true, data: blogs };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { success: false, error: 'Failed to fetch blogs', data: [] };
  }
}

export async function getBlogBySlugAction(slug: string) {
  try {
    const blog = await prisma.blogPost.findUnique({
      where: { slug },
    });
    if (!blog) {
      return { success: false, error: 'Blog not found' };
    }
    return { success: true, data: blog };
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    return { success: false, error: 'Failed to fetch blog details' };
  }
}
