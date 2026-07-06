import { type MetadataRoute } from "next";

import { getBlogsAction } from "@/app/actions/blogs";
import { getNavigationLinksAction } from "@/app/actions/navigation";
import { getPortfoliosAction } from "@/app/actions/portfolio";
import { getSolutionsAction } from "@/app/actions/solutions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.zebotix.com";

  // Main navigation routes
  const { data: headerLinks } = await getNavigationLinksAction("header");
  const { data: footerLinks } = await getNavigationLinksAction("footer");

  const allNavLinks = [...(headerLinks || []), ...(footerLinks || [])];

  // Extract all unique routes from nav links, including children
  const navRoutesSet = new Set<string>();
  allNavLinks.forEach((link) => {
    if (link.href && !link.href.startsWith("#")) navRoutesSet.add(link.href);
    if (link.children) {
      link.children.forEach((child) => {
        if (child.href && !child.href.startsWith("#")) navRoutesSet.add(child.href);
      });
    }
  });

  const routes = Array.from(navRoutesSet).map((href) => ({
    url: `${baseUrl}${href}`,
    lastModified: new Date(), // We keep this for static routes that don't have a DB updated timestamp
    changeFrequency: "weekly" as const,
    priority: href === "/" ? 1 : 0.8,
    images: href === "/" ? [`${baseUrl}/Zebotix.webp`] : [],
  }));

  // Portfolio/Work routes with images
  const { data: portfolios } = await getPortfoliosAction();
  const portfolioRoutes = (portfolios || []).map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: p.updatedAt || p.createdAt || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: p.gallery && p.gallery.length > 0 ? [p.gallery[0].replaceAll(/&/g, "&amp;")] : [],
  }));

  // Solutions routes
  const { data: solutions } = await getSolutionsAction();
  const solutionRoutes = (solutions || []).map((s) => ({
    url: `${baseUrl}/solutions/${s.slug || s.id}`,
    lastModified: s.updatedAt || s.createdAt || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog routes
  const { data: blogs } = await getBlogsAction();
  const blogRoutes = (blogs || []).map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: b.updatedAt || b.publishedAt || b.createdAt || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
    images: b.image ? [b.image.replace(/&/g, "&amp;")] : [],
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

  return [...routes, ...portfolioRoutes, ...solutionRoutes, ...blogRoutes, ...staticRoutes];
}
