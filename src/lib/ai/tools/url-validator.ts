import { tool } from "ai";
import { z } from "zod";

export const urlValidatorTool = tool({
  description:
    "Validates if a given URL is accessible and returns a 200 OK status. Use this to verify links before including them in blog posts to prevent 404 errors.",
  inputSchema: z.object({
    url: z.url().describe("The URL to validate"),
  }),
  execute: async ({ url }) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return {
        url,
        isValid: response.ok,
        status: response.status,
      };
    } catch (error) {
      return {
        url,
        isValid: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
});
