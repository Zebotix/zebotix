import { aiLogger } from "../core/logger";
import { OpenverseImageSearchProvider } from "../providers/image-openverse";
import { WikimediaImageSearchProvider } from "../providers/image-wikimedia";

export async function runImagePipeline(imagePrompt: string, query: string): Promise<string> {
  const correlationId = `image_pipeline_${Date.now()}`;
  aiLogger.info("Starting Image Pipeline", { correlationId, prompt: imagePrompt, query });

  const wikimedia = new WikimediaImageSearchProvider();

  try {
    const searchResults = await wikimedia.search(query, 1);

    if (searchResults.length > 0) {
      const selected = searchResults[0];
      aiLogger.info("Found image in Wikimedia", { correlationId, url: selected.url });
      // Note: In production we would download this and upload it to Cloudinary
      // For this stub, we'll just return the original URL
      return selected.url;
    }
  } catch (error) {
    aiLogger.warn("Wikimedia image search failed, falling back to AI", {
      correlationId,
      error: String(error),
    });
  }

  const openverse = new OpenverseImageSearchProvider();
  try {
    const searchResults = await openverse.search(query, 1);

    if (searchResults.length > 0) {
      const selected = searchResults[0];
      aiLogger.info("Found image in Openverse", { correlationId, url: selected.url });
      return selected.url;
    }
  } catch (error) {
    aiLogger.warn("Openverse image search failed, falling back to AI", {
      correlationId,
      error: String(error),
    });
  }

  // Fallback to AI Image Generation
  aiLogger.info("Generating AI Image", { correlationId, prompt: imagePrompt });
  // Using a stub URL for now
  const fallbackUrl = "https://res.cloudinary.com/demo/image/upload/sample.jpg";

  aiLogger.info("Image Pipeline completed", { correlationId, url: fallbackUrl });
  return fallbackUrl;
}
