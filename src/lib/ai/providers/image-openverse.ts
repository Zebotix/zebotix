import { type ImageSearchProvider, type ImageSearchResult } from "../types/provider";

interface OpenverseResultItem {
  id: string;
  url: string;
  thumbnail?: string;
  title?: string;
  creator?: string;
  license?: string;
  license_url?: string;
  foreign_landing_url?: string;
}

export class OpenverseImageSearchProvider implements ImageSearchProvider {
  name = "Openverse";

  async search(query: string, limit: number = 3): Promise<ImageSearchResult[]> {
    try {
      const apiUrl = new URL("https://api.openverse.engineering/v1/images/");
      apiUrl.searchParams.append("q", query);
      apiUrl.searchParams.append("page_size", limit.toString());
      apiUrl.searchParams.append("license", "pdm,cc0,by,by-sa"); // Commercial use allowed

      const response = await fetch(apiUrl.toString(), {
        headers: {
          "User-Agent": "ZebotixAI/1.0 (contact@zebotix.com)",
        },
      });

      if (!response.ok) {
        throw new Error(`Openverse API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        return [];
      }

      return data.results.map((item: OpenverseResultItem) => ({
        id: item.id,
        url: item.url, // Original high res
        thumbnailUrl: item.thumbnail,
        title: item.title,
        author: item.creator,
        license: item.license,
        licenseUrl: item.license_url,
        sourceUrl: item.foreign_landing_url,
      }));
    } catch (error) {
      console.error("OpenverseImageSearchProvider error:", error);
      return []; // Fail gracefully
    }
  }
}
