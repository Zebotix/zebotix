import { tool } from "ai";
import { z } from "zod";

export const imageSearchTool = tool({
  description: "Searches for real images from open sources.",
  inputSchema: z.object({ query: z.string() }),
  execute: async ({ query }) => {
    return { query, message: "Stub: Image Search Tool executed" };
  },
});
