import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { z } from "zod";

import { generateAndUploadImage } from "./image-generator";
import { fetchLatestTechNews } from "./news-fetcher";
import { logger } from "../security/logger";

const blogSchema = z.object({
  title: z.string().describe("A catchy, SEO-friendly title for the blog post."),
  slug: z.string().describe("URL-friendly slug (e.g., 'future-of-ai-2026')."),
  content: z
    .string()
    .describe(
      "Full blog post content in rich HTML format (use <h2>, <p>, <strong>, <ul>, etc.). Make it comprehensive, engaging, and at least 600 words."
    ),
  excerpt: z.string().describe("A short 1-2 sentence summary of the post."),
  category: z
    .string()
    .describe("A suitable category (e.g., 'Artificial Intelligence', 'Robotics', 'Tech Trends')."),
  tags: z.array(z.string()).describe("3 to 5 relevant tags."),
  imagePrompt: z
    .string()
    .describe(
      "A highly detailed prompt for an AI image generator (like Midjourney or DALL-E) to create a featured image for this post. Make it cinematic and visually striking. Do not include text in the image."
    ),
});

export async function generateAndPublishBlog() {
  logger.info("Fetching latest tech news...");
  const newsItems = await fetchLatestTechNews(5);

  const headlines = newsItems.map((n) => "- " + n.title + ": " + n.description).join("\n");
  const newsContext =
    newsItems.length > 0
      ? `Here are some of the latest tech news headlines:\n${headlines}`
      : "Generate a blog post about a cutting-edge topic in Artificial Intelligence, Robotics, or Web Development.";

  logger.info("Generating blog post content with Gemini...");

  const { output } = await generateText({
    model: google("gemini-1.5-pro-latest"),
    output: Output.object({ schema: blogSchema }),
    prompt: `
      You are an expert tech blogger for 'Zebotix'. Your task is to write a highly engaging, informative, and SEO-optimized blog post based on recent tech trends.
      
      ${newsContext}
      
      Instructions:
      - Pick ONE of the most interesting news items or a current major trend.
      - Write a comprehensive blog post in rich HTML format.
      - Ensure it sounds professional but engaging (author: Zebotix Team).
      - Provide a vivid, detailed image prompt that represents the core concept of the post.
    `,
  });

  logger.info("Blog content generated. Generating image...");

  const imageUrl = await generateAndUploadImage(output.imagePrompt);

  return {
    title: output.title,
    slug: output.slug,
    content: output.content,
    excerpt: output.excerpt,
    category: output.category,
    tags: output.tags,
    image: imageUrl,
    author: "Zebotix Team",
    isPublished: true,
    publishedAt: new Date(),
  };
}
