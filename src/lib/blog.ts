import { unstable_cache } from 'next/cache';

import prisma from '@/lib/db/prisma';

/**
 * Fetches all published blog posts.
 * Wrapped in unstable_cache to satisfy Next.js 16 prerendering requirements
 * and provide ISR capabilities.
 */
export const getAllPosts = unstable_cache(
  async () => {
    try {
      return await prisma.blogPost.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: 'desc' },
      });
    } catch (error) {
      console.error('Error fetching all posts:', error);
      return [];
    }
  },
  ['all-posts'],
  { revalidate: 3600, tags: ['posts'] }
);

/**
 * Fetches a single blog post by its slug.
 */
export const getPostBySlug = unstable_cache(
  async (slug: string) => {
    try {
      return await prisma.blogPost.findUnique({
        where: { slug, isPublished: true },
      });
    } catch (error) {
      console.error(`Error fetching post by slug (${slug}):`, error);
      return null;
    }
  },
  ['post-by-slug'],
  { revalidate: 3600 }
);

export async function createPost(data: any) {
  return await prisma.blogPost.create({
    data,
  });
}
