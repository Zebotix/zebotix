import { tool } from "ai";
import { z } from "zod";

import { fetchLatestTechNews } from "../news-fetcher";

export const searchTechNewsTool = tool({
  description:
    "Searches for the latest technology news headlines and articles to use as a basis for blog posts.",
  inputSchema: z.object({
    topic: z.string().optional().describe("Optional specific tech topic to filter news by"),
  }),
  execute: async ({ topic }) => {
    try {
      const news = await fetchLatestTechNews();
      // Simple filtering if topic is provided
      if (topic) {
        const lowerTopic = topic.toLowerCase();
        const filtered = news.filter(
          (n) =>
            n.title.toLowerCase().includes(lowerTopic) ||
            n.description.toLowerCase().includes(lowerTopic)
        );
        return filtered.length > 0 ? filtered.slice(0, 5) : news.slice(0, 5);
      }
      return news.slice(0, 5);
    } catch (error) {
      console.error("searchTechNewsTool error:", error);
      return [];
    }
  },
});
