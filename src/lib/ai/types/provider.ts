export interface ImageSearchResult {
  id: string;
  url: string; // The high-res URL of the image
  thumbnailUrl?: string;
  title?: string;
  author?: string;
  license?: string;
  licenseUrl?: string;
  sourceUrl?: string;
}

export interface ImageSearchProvider {
  name: string;
  search(query: string, limit?: number): Promise<ImageSearchResult[]>;
}

export interface WebSearchResult {
  title: string;
  url: string;
  snippet?: string;
  publishedDate?: string;
}

export interface WebSearchProvider {
  name: string;
  search(query: string, limit?: number): Promise<WebSearchResult[]>;
}

export interface StorageProvider {
  name: string;
  upload(
    fileBuffer: Buffer,
    filename: string,
    mimeType: string,
    folder?: string
  ): Promise<{
    url: string;
    width?: number;
    height?: number;
    size?: number;
  }>;
}

export interface RSSSearchResult {
  title: string;
  link: string;
  description: string;
  pubDate?: string;
  source?: string;
}

export interface RSSSearchProvider {
  name: string;
  fetchLatest(limit?: number): Promise<RSSSearchResult[]>;
}
