import { uploadImageFromUrl } from "../cloudinary";
import { logger } from "../security/logger";
import { secureRandom } from "../utils";

/**
 * Generates an image using an array of fallback models and uploads it to Cloudinary.
 * @param prompt The image prompt
 * @returns Cloudinary secure URL for the generated image, or null if all fail.
 */
export async function generateAndUploadImage(prompt: string): Promise<string | null> {
  const openAiKey = process.env.OPENAI_API_KEY;

  // Try 1: OpenAI DALL-E 3 (if key is available)
  if (openAiKey) {
    try {
      logger.info("Attempting to generate image with DALL-E 3...");
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt,
          n: 1,
          size: "1024x1024",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.data?.[0]?.url;
        if (imageUrl) {
          logger.info("DALL-E 3 succeeded, uploading to Cloudinary...");
          return await uploadImageFromUrl(imageUrl, "zebotix_blog");
        }
      } else {
        logger.error("DALL-E 3 failed:", { error: await response.text() });
      }
    } catch (error) {
      logger.error("Error with DALL-E 3:", { error });
    }
  }

  // Try 2: Pollinations AI (Free, no key required)
  try {
    logger.info("Attempting to generate image with Pollinations AI...");
    // Pollinations generates the image synchronously and returns the image binary directly.
    const seed = Math.floor(secureRandom() * 1000000);
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${seed}&width=1024&height=1024&nologo=true`;

    // Upload directly from Pollinations URL to Cloudinary
    logger.info("Pollinations succeeded, uploading to Cloudinary...");
    return await uploadImageFromUrl(pollinationsUrl, "zebotix_blog");
  } catch (error) {
    logger.error("Error with Pollinations AI:", { error });
  }

  logger.error("All image generation models failed.");
  return null;
}
