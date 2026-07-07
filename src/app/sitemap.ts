import { type MetadataRoute } from "next";

import { getBlogsAction } from "@/app/actions/blogs";
import { getActiveJobPostingsAction } from "@/app/actions/careers";
import { getPortfoliosAction } from "@/app/actions/portfolio";
import { getSolutionsAction } from "@/app/actions/solutions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://zebotix.com";

  // Static routes map
  const staticPaths = [
    "/",
    "/about",
    "/solutions",
    "/blog",
    "/work",
    "/testimonials",
    "/contact",
    "/quick-quote",
    "/careers",
    "/careers/jobs",
    "/cookie-policy",
    "/gdpr",
    "/privacy",
    "/terms",
  ];

  const staticRoutes = staticPaths.map((href) => ({
    url: `${baseUrl}${href}`,
    lastModified: new Date(),
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
    images: p.gallery && p.gallery.length > 0 
      ? [p.gallery[0].startsWith("http") ? p.gallery[0].replaceAll("&", "&amp;") : `${baseUrl}${p.gallery[0].replaceAll("&", "&amp;")}`] 
      : [],
  }));

  // Solutions routes
  const { data: solutions } = await getSolutionsAction();
  const solutionRoutes = (solutions || []).map((s) => ({
    url: `${baseUrl}/solutions/${s.industrySlug}/${s.slug}`,
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
    images: b.image 
      ? [b.image.startsWith("http") ? b.image.replaceAll("&", "&amp;") : `${baseUrl}${b.image.replaceAll("&", "&amp;")}`] 
      : [],
  }));

  // Job routes
  const { data: jobs } = await getActiveJobPostingsAction();
  const jobRoutes = (jobs || []).map((j) => ({
    url: `${baseUrl}/careers/jobs/${j.slug}`,
    lastModified: j.updatedAt || j.createdAt || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...portfolioRoutes, ...solutionRoutes, ...blogRoutes, ...jobRoutes];
}
