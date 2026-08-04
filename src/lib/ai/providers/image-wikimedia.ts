import { type ImageSearchProvider, type ImageSearchResult } from "../types/provider";

export class WikimediaImageSearchProvider implements ImageSearchProvider {
  name = "Wikimedia Commons";

  async search(query: string, limit: number = 3): Promise<ImageSearchResult[]> {
    try {
      const apiUrl = new URL("https://en.wikipedia.org/w/api.php");
      apiUrl.searchParams.append("action", "query");
      apiUrl.searchParams.append("format", "json");
      apiUrl.searchParams.append("generator", "search");
      apiUrl.searchParams.append("gsrnamespace", "6"); // File namespace
      apiUrl.searchParams.append("gsrsearch", `filetype:bitmap ${query}`);
      apiUrl.searchParams.append("gsrlimit", limit.toString());
      apiUrl.searchParams.append("prop", "imageinfo");
      apiUrl.searchParams.append("iiprop", "url|extmetadata");
      apiUrl.searchParams.append("origin", "*");

      const response = await fetch(apiUrl.toString());

      if (!response.ok) {
        throw new Error(`Wikimedia API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.query?.pages) {
        return [];
      }

      const results: ImageSearchResult[] = [];

      for (const pageId in data.query.pages) {
        const page = data.query.pages[pageId];
        if (page.imageinfo && page.imageinfo.length > 0) {
          const info = page.imageinfo[0];
          const meta = info.extmetadata;

          results.push({
            id: page.pageid?.toString() || page.title,
            url: info.url,
            title: page.title.replace(/^File:/, ""),
            author: meta?.Artist?.value ? this.stripHtml(meta.Artist.value) : undefined,
            license: meta?.LicenseShortName?.value || meta?.License?.value,
            licenseUrl: meta?.LicenseUrl?.value,
            sourceUrl: info.descriptionurl,
          });
        }
      }

      return results;
    } catch (error) {
      console.error("WikimediaImageSearchProvider error:", error);
      return []; // Fail gracefully
    }
  }

  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>?/gm, "");
  }
}
