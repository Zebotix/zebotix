import { type MetadataRoute } from "next";

import { NAV_LINKS, PORTFOLIOS, SOLUTIONS } from "@/lib/mockData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.zebotix.com";

  // Main navigation routes
  const routes = NAV_LINKS.filter((l) => !l.href.startsWith("#")).map((l) => ({
    url: `${baseUrl}${l.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: l.href === "/" ? 1 : 0.8,
    images: l.href === "/" ? [`${baseUrl}/Zebotix.webp`] : [],
  }));

  // Portfolio/Work routes with images
  const portfolioRoutes = PORTFOLIOS.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: p.image ? [p.image.replace(/&/g, "&amp;")] : [],
  }));

  // Solutions routes
  const solutionRoutes = SOLUTIONS.map((s) => ({
    url: `${baseUrl}/solutions/${s.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Static legal/policy routes
  const staticRoutes = ["/privacy", "/terms", "/cookie-policy", "/gdpr", "/contact", "/about"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })
  );

  return [...routes, ...portfolioRoutes, ...solutionRoutes, ...staticRoutes];
}
