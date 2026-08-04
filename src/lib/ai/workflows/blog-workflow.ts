import { z } from "zod";

import { runImagePipeline } from "./image-pipeline";
import { AI_MODELS } from "../config/models";
import { AgentExecutor } from "../core/agent-executor";
import { aiLogger } from "../core/logger";
import { OUTLINE_SYSTEM_PROMPT } from "../prompts/blog/outline";
import { RESEARCH_SYSTEM_PROMPT } from "../prompts/blog/research";
import { SEO_SYSTEM_PROMPT } from "../prompts/blog/seo";
import { WRITER_SYSTEM_PROMPT } from "../prompts/blog/writer";
import { searchTechNewsTool } from "../tools/search-tech-news";
import { webPageReaderTool } from "../tools/web-page-reader";


const SeoSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  tags: z.array(z.string()),
  category: z.string(),
  imagePrompt: z.string()
});

export async function runBlogWorkflow(topic?: string) {
  const workflowId = `workflow_blog_${Date.now()}`;
  const agentId = "blog-agent";
  const startTime = Date.now();

  aiLogger.info("Starting Blog Workflow", { workflowId });

  try {
    // Stage 1: Research
    const researchStr = await AgentExecutor.execute<string>({
      workflowId,
      agentId,
      preferredModel: AI_MODELS.GEMINI_1_5_PRO,
      instructions: RESEARCH_SYSTEM_PROMPT,
      prompt: topic ? `Research topic: ${topic}` : "Research current trending AI topics from news.",
      tools: { searchTechNews: searchTechNewsTool, webPageReader: webPageReaderTool }
    });

    // Stage 2: Outline
    const outlineStr = await AgentExecutor.execute<string>({
      workflowId,
      agentId,
      preferredModel: AI_MODELS.GEMINI_1_5_PRO,
      instructions: OUTLINE_SYSTEM_PROMPT,
      prompt: `Research Data:\n${researchStr}`
    });

    // Stage 3: Content
    const contentStr = await AgentExecutor.execute<string>({
      workflowId,
      agentId,
      preferredModel: AI_MODELS.GEMINI_2_5_PRO,
      instructions: WRITER_SYSTEM_PROMPT,
      prompt: `Write the blog based on this outline:\n${outlineStr}`
    });

    // Stage 4: SEO Metadata
    const seoMetadata = await AgentExecutor.execute<z.infer<typeof SeoSchema>>({
      workflowId,
      agentId,
      preferredModel: AI_MODELS.GEMINI_1_5_PRO,
      instructions: SEO_SYSTEM_PROMPT,
      prompt: `Generate SEO metadata for this blog content:\n${contentStr}`,
      schema: SeoSchema
    });

    // Stage 5: Image Pipeline
    const imageUrl = await runImagePipeline(seoMetadata.imagePrompt, seoMetadata.title);

    const duration = Date.now() - startTime;
    aiLogger.info("Finished Blog Workflow successfully", { workflowId, durationMs: duration });

    return {
      ...seoMetadata,
      content: contentStr,
      image: imageUrl,
      author: "Zebotix Team",
      isPublished: true,
      publishedAt: new Date()
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    aiLogger.error("Blog Workflow failed", { workflowId, error: String(error), durationMs: duration });
    throw error;
  }
}
