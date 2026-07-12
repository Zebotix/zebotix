"use server";

import { generateAndPublishBlog } from "@/lib/ai/blog-generator";
import { createPost } from "@/lib/blog";
import prisma from "@/lib/db/prisma";
import { secureRandom } from "@/lib/utils";
export async function getBlogsAction(onlyFeatured = false) {
  try {
    const blogs = await prisma.blogPost.findMany({
      where: {
        isPublished: true,
        ...(onlyFeatured ? { isFeatured: true } : {}),
      },
      orderBy: { publishedAt: "desc" },
    });
    return { success: true, data: blogs };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { success: false, error: "Failed to fetch blogs", data: [] };
  }
}

export async function getBlogBySlugAction(slug: string) {
  try {
    const blog = await prisma.blogPost.findUnique({
      where: { slug },
    });
    if (!blog) {
      return { success: false, error: "Blog not found" };
    }
    return { success: true, data: blog };
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    return { success: false, error: "Failed to fetch blog details" };
  }
}

export async function generateAutoBlogAction() {
  try {
    const blogData = await generateAndPublishBlog();
    const uniqueSlug = `${blogData.slug}-${Math.floor(secureRandom() * 1000)}`;
    const newPost = await createPost({
      title: blogData.title,
      slug: uniqueSlug,
      content: blogData.content,
      excerpt: blogData.excerpt,
      category: blogData.category,
      tags: blogData.tags,
      image: blogData.image,
      author: blogData.author,
      isPublished: blogData.isPublished,
      publishedAt: blogData.publishedAt,
    });
    return { success: true, data: newPost };
  } catch (error) {
    console.error("Error generating auto blog:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
