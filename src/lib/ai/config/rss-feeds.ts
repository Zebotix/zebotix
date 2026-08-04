export interface RssFeed {
  name: string;
  url: string;
}

export const DEFAULT_RSS_FEEDS: RssFeed[] = [
  { name: "Google AI Blog", url: "https://blog.google/technology/ai/rss/" },
  { name: "OpenAI Blog", url: "https://openai.com/blog/rss/" },
  { name: "Anthropic News", url: "https://www.anthropic.com/rss.xml" },
  { name: "Microsoft AI", url: "https://blogs.microsoft.com/ai/feed/" },
  { name: "GitHub Blog", url: "https://github.blog/feed/" },
  { name: "Vercel Blog", url: "https://vercel.com/atom" },
  { name: "Cloudflare Blog", url: "https://blog.cloudflare.com/rss/" },
  { name: "AWS News", url: "https://aws.amazon.com/blogs/aws/feed/" },
  { name: "Chromium Blog", url: "https://blog.chromium.org/feeds/posts/default?alt=rss" }
];
