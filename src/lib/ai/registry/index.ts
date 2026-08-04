import { agentRegistry } from "./agent-registry";
import { runBlogWorkflow } from "../workflows/blog-workflow";

// Self-register the blog agent
agentRegistry.register({
  id: "blog-agent",
  name: "AI Blog Generator Agent",
  description:
    "An agent that researches tech news, writes, and optimizes SEO for a complete blog post.",
  execute: async (topic?: string) => {
    return await runBlogWorkflow(topic);
  },
});
