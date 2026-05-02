import prisma from '@/lib/db/prisma';

export async function getAllPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
    });
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await prisma.blogPost.findUnique({
      where: { slug, isPublished: true },
    });
  } catch {
    return null;
  }
}

export async function createPost(data: any) {
  return await prisma.blogPost.create({
    data,
  });
}
