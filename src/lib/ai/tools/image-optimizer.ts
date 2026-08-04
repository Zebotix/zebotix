import { tool } from "ai";
import { z } from "zod";

export const imageOptimizerTool = tool({
  description: "Optimizes image resolution and format.",
  inputSchema: z.object({ url: z.string() }),
  execute: async ({ url }) => {
    return { url, message: "Stub: Image Optimizer Tool executed" };
  },
});
