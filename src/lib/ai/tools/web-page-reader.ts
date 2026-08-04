import { tool } from "ai";
import * as cheerio from "cheerio";
import { z } from "zod";

export const webPageReaderTool = tool({
  description:
    "Reads and extracts text content from a web page URL. Use this to gather facts, statistics, or details from specific articles.",
  inputSchema: z.object({
    url: z.url().describe("The URL of the article or web page to read"),
  }),
  execute: async ({ url }) => {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "ZebotixAI/1.0 (contact@zebotix.com)",
        },
      });

      if (!response.ok) {
        return { error: `Failed to fetch page: ${response.status}` };
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      // Remove scripts, styles, nav, footer, etc.
      $("script, style, nav, footer, header, aside, .ad, .advertisement").remove();

      // Extract main text (simplified)
      let text = $("article").text();
      if (!text || text.trim().length < 100) {
        text = $("body").text();
      }

      // Clean up whitespace
      const cleanText = text.replace(/\s+/g, " ").trim();

      // Return first 5000 characters to avoid huge context sizes
      return {
        url,
        content: cleanText.substring(0, 5000) + (cleanText.length > 5000 ? "..." : ""),
      };
    } catch (error) {
      console.error("webPageReaderTool error:", error);
      return { error: "Failed to read web page" };
    }
  },
});
