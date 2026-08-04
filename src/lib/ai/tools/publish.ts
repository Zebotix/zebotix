import { tool } from "ai";
import { z } from "zod";

export const publishTool = tool({
  description: "Publishes a generated item to the database.",
  inputSchema: z.object({ title: z.string(), content: z.string() }),
  execute: async ({ title }) => {
    return { title, message: "Stub: Publish Tool executed" };
  },
});
