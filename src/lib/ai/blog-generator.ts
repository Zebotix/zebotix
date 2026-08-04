import "./registry"; // Ensures agents are registered
import { agentRegistry } from "./registry/agent-registry";
export interface GeneratedBlogData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  image: string;
  author: string;
  isPublished: boolean;
  publishedAt: Date | string;
}

// This is a thin wrapper that invokes the new AI Agent Framework.

// It maintains backward compatibility with src/app/actions/blogs.ts.
export async function generateAndPublishBlog(): Promise<GeneratedBlogData> {
  const blogAgent = agentRegistry.get("blog-agent");
  return await blogAgent.execute(undefined) as GeneratedBlogData;
}
