import { tool } from "ai";
import { z } from "zod";

export const storageTool = tool({
  description: "Uploads files to storage provider (e.g., Cloudinary).",
  inputSchema: z.object({ url: z.string() }),
  execute: async ({ url }) => {
    return { url, message: "Stub: Storage Tool executed" };
  },
});
