import * as cheerio from "cheerio";

import { DEFAULT_RSS_FEEDS, type RssFeed } from "../config/rss-feeds";
import { aiLogger } from "../core/logger";
import { type RSSSearchProvider, type RSSSearchResult } from "../types/provider";

export class DynamicRSSSearchProvider implements RSSSearchProvider {
  name = "Dynamic RSS Fetcher";
  private feeds: RssFeed[];

  constructor(feeds: RssFeed[] = DEFAULT_RSS_FEEDS) {
    this.feeds = feeds;
  }

  async fetchLatest(limit: number = 10): Promise<RSSSearchResult[]> {
    const results: RSSSearchResult[] = [];

    const feedPromises = this.feeds.map(async (feed) => {
      try {
        const response = await fetch(feed.url, {
          headers: {
            "User-Agent": "ZebotixAI/1.0",
            "Accept": "application/rss+xml, application/xml, text/xml"
          }
        });
        
        if (!response.ok) {
          aiLogger.warn(`Failed to fetch RSS from ${feed.url}: ${response.status}`);
          return [];
        }
        
        const xml = await response.text();
        const $ = cheerio.load(xml, { xmlMode: true });
        
        const items: RSSSearchResult[] = [];
        $("item, entry").each((_, element) => {
          const el = $(element);
          
          const title = el.find("title").first().text();
          let link = el.find("link").first().text();
          if (!link) {
            link = el.find("link").attr("href") || "";
          }
          
          let description = el.find("description, summary, content").first().text();
          const pubDate = el.find("pubDate, updated, published").first().text();
          
          // Basic HTML strip for description
          description = description.replace(/<[^>]*>?/gm, "").trim();
          
          if (title && link) {
             items.push({
               title: title.trim(),
               link: link.trim(),
               description: description.substring(0, 500) + (description.length > 500 ? "..." : ""),
               pubDate: pubDate.trim(),
               source: feed.name
             });
          }
        });
        
        return items.slice(0, limit);
      } catch (error) {
        aiLogger.warn(`Error parsing RSS from ${feed.url}: ${error}`);
        return [];
      }
    });

    const allFeedResults = await Promise.all(feedPromises);
    allFeedResults.forEach(feedItems => {
      results.push(...feedItems);
    });

    // Sort by date descending
    results.sort((a, b) => {
      const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
      const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      // Handle invalid dates (NaN)
      if (isNaN(dateA) && isNaN(dateB)) return 0;
      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;
      return dateB - dateA;
    });

    return results.slice(0, limit);
  }
}
