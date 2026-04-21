import prisma from '@/lib/db/prisma';

export async function getAllPosts() {
  return await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
  });
}

export async function getPostBySlug(slug: string) {
  return await prisma.blogPost.findUnique({
    where: { slug, isPublished: true },
  });
}

export async function createPost(data: any) {
  return await prisma.blogPost.create({
    data,
  });
}
