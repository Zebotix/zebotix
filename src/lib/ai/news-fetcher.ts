import * as cheerio from "cheerio";

import { logger } from "../security/logger";
import { secureRandom } from "../utils";

export interface NewsItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

const TECH_FEEDS = [
  // General Tech
  "https://techcrunch.com/feed/",
  "https://www.theverge.com/rss/index.xml",
  "https://feeds.arstechnica.com/arstechnica/index",
  "https://news.ycombinator.com/rss",
  "https://lobste.rs/rss",
  
  // Programming & Web Development
  "https://dev.to/feed",
  "https://css-tricks.com/feed/",
  "https://www.smashingmagazine.com/feed/",
  "https://martinfowler.com/feed.atom",
  "https://www.infoq.com/feed/",
  "https://davidwalsh.name/feed",
  "https://cprss.s3.amazonaws.com/javascriptweekly.com.xml",
  "https://cprss.s3.amazonaws.com/nodeweekly.com.xml",
  "https://changelog.com/master/feed",
  "https://github.blog/feed/",
  "https://www.freecodecamp.org/news/rss/",
  
  // AI & Machine Learning
  "https://machinelearningmastery.com/feed/",
  "https://blog.tensorflow.org/feeds/posts/default?alt=rss",
  "https://venturebeat.com/category/ai/feed/",
  "https://www.zdnet.com/topic/artificial-intelligence/rss.xml",
  "https://www.technologyreview.com/feed/",
  "https://bair.berkeley.edu/blog/feed.xml",
  "https://www.artificialintelligence-news.com/feed/",
  "https://news.mit.edu/rss/topic/artificial-intelligence2",
  "https://www.kdnuggets.com/feed"
];

export async function fetchLatestTechNews(limit: number = 5): Promise<NewsItem[]> {
  const allNews: NewsItem[] = [];

  // Shuffle feeds and pick 3 to fetch in parallel to avoid long response times
  const selectedFeeds = TECH_FEEDS.toSorted(() => 0.5 - secureRandom()).slice(0, 3);

  const fetchPromises = selectedFeeds.map(async (feedUrl) => {
    try {
      // Use AbortController for 5 seconds timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(feedUrl, {
        next: { revalidate: 3600 },
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        logger.error(`Failed to fetch RSS from ${feedUrl}: ${response.statusText}`);
        return [];
      }

      const xmlText = await response.text();
      const $ = cheerio.load(xmlText, { xmlMode: true });
      const items = $("item, entry").slice(0, limit);
      const feedNews: NewsItem[] = [];

      items.each((_, el) => {
        const title = $(el).find("title").first().text();
        const link = $(el).find("link").first().text() || $(el).find("link").attr("href") || "";
        let description =
          $(el).find("description").first().text() ||
          $(el).find("summary").first().text() ||
          $(el).find("content").first().text();

        description = description.replace(/<[^>]*>?/gm, "").trim();

        const pubDate =
          $(el).find("pubDate").first().text() ||
          $(el).find("published").first().text() ||
          $(el).find("updated").first().text();

        if (title && description) {
          feedNews.push({ title, link, description, pubDate });
        }
      });
      return feedNews;
    } catch (error) {
      console.error(`Error processing feed ${feedUrl}:`, error);
      return [];
    }
  });

  const results = await Promise.all(fetchPromises);
  results.forEach(feedResults => allNews.push(...feedResults));

  // Shuffle and pick some to give variety to the AI
  return allNews.toSorted(() => 0.5 - secureRandom()).slice(0, limit * 2);
}
