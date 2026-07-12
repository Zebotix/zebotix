import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
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

  logger.info("Generating blog post content...");

  // Define an array of models, prioritizing free/cheaper models with extensive fallbacks
  const fallbackModels = [
    google("gemini-1.5-flash"), // Google's fast and cost-effective model
    google("gemini-1.5-flash-8b"), // Google's lightweight flash model
    openai("gpt-4o-mini"), // OpenAI's cheap and fast model
    google("gemini-1.5-pro"), // Google's high-performance model
    openai("gpt-4o"), // OpenAI's flagship fast model
    openai("gpt-4-turbo"), // OpenAI's previous turbo model
    openai("gpt-4"), // OpenAI's standard GPT-4
    google("gemini-1.0-pro"), // Google's legacy pro model
    openai("gpt-3.5-turbo"), // OpenAI's legacy fast model
    google("gemini-pro"), // Google's alias for 1.0 pro
  ];

  let output;
  let success = false;
  let lastError;

  for (const model of fallbackModels) {
    try {
      logger.info(`Attempting to generate blog with model: ${model.provider}:${model.modelId}`);

      const response = await generateObject({
        model,
        schema: blogSchema,
        system: "You are an expert tech blogger for 'Zebotix'. Your task is to write a highly engaging, informative, and SEO-optimized blog post based on recent tech trends.",
        prompt: `
          ${newsContext}
          
          Instructions:
          - Pick ONE of the most interesting news items or a current major trend.
          - Write a comprehensive blog post in rich HTML format.
          - Ensure it sounds professional but engaging (author: Zebotix Team).
          - Provide a vivid, detailed image prompt that represents the core concept of the post.
        `,
      });

      output = response.object;
      success = true;
      logger.info(`Successfully generated blog with model: ${model.provider}:${model.modelId}`);
      break; // Exit the loop on success
    } catch (e) {
      logger.warn(
        `Failed to generate with model ${model.provider}:${model.modelId}. Error: ${e instanceof Error ? e.message : String(e)}`
      );
      lastError = e;
    }
  }

  if (!success || !output) {
    const errorMessage = lastError instanceof Error ? lastError.message : String(lastError);
    throw new Error(
      `All models failed to generate blog content. Last error: ${errorMessage}`
    );
  }

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
