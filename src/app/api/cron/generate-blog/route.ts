import { NextResponse } from "next/server";

import { generateAndPublishBlog } from "@/lib/ai/blog-generator";
import { createPost } from "@/lib/blog";
import { logger } from "@/lib/security/logger";
import { secureRandom } from "@/lib/utils";

export const maxDuration = 60; // Set Vercel function timeout to 60 seconds (useful for AI generation)

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");

    // Ensure the cron is protected by a secret
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    logger.info("Cron Job triggered: Generating new blog post...");

    // Generate blog data and image
    const blogData = await generateAndPublishBlog();

    // Ensure slug uniqueness (simple implementation, ideally we'd check DB)
    const uniqueSlug = `${blogData.slug}-${Math.floor(secureRandom() * 1000)}`;

    // Save to database
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

    logger.info("Successfully generated and published blog:", { postId: newPost.id });

    return NextResponse.json({ success: true, post: { id: newPost.id, title: newPost.title } });
  } catch (error: unknown) {
    logger.error("Error in generate-blog cron job:", { error });

    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
