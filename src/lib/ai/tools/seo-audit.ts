import { tool } from "ai";
import { z } from "zod";

export const seoAuditTool = tool({
  description: "Audits content for SEO issues.",
  inputSchema: z.object({ content: z.string() }),
  execute: async () => {
    return { score: 100, message: "Stub: SEO Audit Tool executed" };
  },
});
