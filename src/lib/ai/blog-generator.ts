import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { createMistral } from "@ai-sdk/mistral";
import { generateObject, type LanguageModel } from "ai";
import { z } from "zod";

import { generateAndUploadImage } from "./image-generator";
import { fetchLatestTechNews } from "./news-fetcher";
import { logger } from "../security/logger";

import prisma from "@/lib/db/prisma";
import { SEO_SERVICES } from "@/lib/seo-services";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});
const mistral = createMistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

// Model success tracker (in-memory)
interface ModelStats {
  attempts: number;
  successes: number;
}
const modelStats: Record<string, ModelStats> = {};

function getStats(modelId: string) {
  if (!modelStats[modelId]) {
    modelStats[modelId] = { attempts: 0, successes: 0 };
  }
  return modelStats[modelId];
}

function getSuccessRate(modelId: string) {
  const stats = getStats(modelId);
  return stats.attempts === 0 ? 1 : stats.successes / stats.attempts;
}

const blogSchema = z.object({
  title: z.string().describe("A catchy, SEO-friendly title for the blog post."),
  slug: z.string().describe("URL-friendly slug (e.g., 'future-of-ai-2026')."),
  content: z
    .string()
    .describe(
      "Full blog post content in rich HTML format (use <h2>, <p>, <strong>, <ul>, etc.). Make it comprehensive, engaging, and at least 600 words. DO NOT include any <img> tags. DO NOT include the Title, Date, or Author in the content, as these are rendered separately."
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

  logger.info("Fetching dynamic routes...");
  const [solutions, portfolios, blogs] = await Promise.all([
    prisma.solution.findMany({ where: { isPublished: true }, select: { title: true, slug: true } }),
    prisma.portfolio.findMany({
      where: { isPublished: true },
      select: { title: true, slug: true },
    }),
    prisma.blogPost.findMany({ where: { isPublished: true }, select: { title: true, slug: true } }),
  ]);

  const dynamicSolutions = solutions
    .map((s) => `- Solution: ${s.title} (/solutions/${s.slug})`)
    .join("\n          ");
  const dynamicPortfolios = portfolios
    .map((p) => `- Case Study/Work: ${p.title} (/work/${p.slug})`)
    .join("\n          ");
  const dynamicServices = SEO_SERVICES.map(
    (s) => `- Service: ${s.keyword} (/services/${s.slug})`
  ).join("\n          ");
  const dynamicBlogs = blogs
    .map((b) => `- Blog Post: ${b.title} (/blog/${b.slug})`)
    .join("\n          ");

  // Define base models in user's priority order
  type ExtendedModel = LanguageModel & { modelId?: string; provider?: string };
  const baseModels: LanguageModel[] = [
    // Google Gemini Models
    google("gemini-2.5-pro"),
    google("gemini-2.0-flash"),
    google("gemini-2.0-flash-exp"), // Often the free tier for AI Studio
    google("gemini-1.5-pro"),

    // Groq Models (Keeping the latest that might support JSON schema, removed decommissioned ones)
    groq("llama-3.2-3b-preview"),
    groq("llama-3.1-70b-versatile"), // Some versions support structured outputs

    // Mistral Models (Removed invalid ones)
    mistral("open-mistral-nemo"), // This one successfully worked!
    mistral("pixtral-12b-2409"),
    mistral("mistral-large-latest"),
  ];

  // Sort based on success rate (descending), preserving priority if tied
  const fallbackModels = baseModels
    .map((model, index) => ({
      model,
      index,
      rate: getSuccessRate((model as ExtendedModel).modelId || "unknown-model"),
    }))
    .sort((a, b) => {
      if (b.rate === a.rate) {
        return a.index - b.index;
      }
      return b.rate - a.rate;
    })
    .map((x) => x.model);

  let output;
  let success = false;
  let lastError;

  for (const model of fallbackModels) {
    const modelId = (model as ExtendedModel).modelId || "unknown-model";
    const provider = (model as ExtendedModel).provider || "unknown-provider";
    try {
      logger.info(
        `Attempting to generate blog with model: ${provider}:${modelId} (Success Rate: ${(getSuccessRate(modelId) * 100).toFixed(1)}%)`
      );

      const stats = getStats(modelId);
      stats.attempts++;

      const response = await generateObject({
        model,
        schema: blogSchema,
        instructions:
          "You are an expert tech blogger for 'Zebotix'. Your task is to write a highly engaging, informative, and SEO-optimized blog post based on recent tech trends.",
        prompt: `
          ${newsContext}
          
          Available Internal Routes for Links:
          - Home: /
          - About: /about
          - Blog: /blog
          - Contact: /contact
          - Services: /services
          - Solutions: /solutions
          - Work/Portfolio: /work
          - Quick Quote: /quick-quote
          - Careers: /careers
          
          Dynamic Pages (Use these for specific references):
          ${dynamicSolutions}
          ${dynamicPortfolios}
          ${dynamicServices}
          ${dynamicBlogs}
          
          Instructions:
          - Pick ONE of the most interesting news items or a current major trend.
          - Write a comprehensive blog post in rich HTML format.
          - DO NOT include the blog Title, Date, or Author in your HTML output. Only write the main body content.
          - CRITICAL LINKING RULES: The anchor text MUST perfectly match the destination. Do not use generic text like "Zebotix" when linking to a specific solution or service. If you are linking to a specific service or solution, the anchor text MUST be the exact name of that service/solution. If linking to the Home page, you may use "Zebotix" or "Home". Do NOT insert random links over irrelevant text. The text and the link MUST be highly relevant to each other.
          - When adding internal links (e.g., 'Get in Touch', 'Solutions', or linking to a specific case study), ONLY use the exact routes listed above. Do not invent routes like '/contact-us'.
          - DO NOT include any images or <img> tags within the HTML content.
          - Ensure it sounds professional but engaging (author: Zebotix Team).
          - Provide a vivid, detailed image prompt that represents the core concept of the post.
        `,
      });

      output = response.object;
      success = true;
      stats.successes++;
      logger.info(`Successfully generated blog with model: ${provider}:${modelId}`);
      break; // Exit the loop on success
    } catch (e) {
      logger.warn(
        `Failed to generate with model ${provider}:${modelId}. Error: ${e instanceof Error ? e.message : String(e)}`
      );
      lastError = e;
    }
  }

  if (!success || !output) {
    const errorMessage = lastError instanceof Error ? lastError.message : String(lastError);
    throw new Error(`All models failed to generate blog content. Last error: ${errorMessage}`);
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
