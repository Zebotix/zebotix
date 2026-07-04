import { type MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/constants';
import { NAV_LINKS, PORTFOLIOS, SOLUTIONS } from '@/lib/mockData';

export default function sitemap(): MetadataRoute.Sitemap {
  // Main navigation routes
  const routes = NAV_LINKS.filter((l) => !l.href.startsWith('#')).map((l) => ({
    url: `${SITE_URL}${l.href === '/' ? '' : l.href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: l.href === '/' ? 1 : 0.8,
    images: l.href === '/' ? [`${SITE_URL}/Zebotix.webp`] : [],
  }));

  // Portfolio/Work routes with images
  const portfolioRoutes = PORTFOLIOS.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    images: p.image ? [p.image] : [],
  }));

  // Solutions routes
  const solutionRoutes = SOLUTIONS.map((s) => ({
    url: `${SITE_URL}/solutions/${s.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Static legal/policy routes
  const staticRoutes = ['/privacy', '/terms', '/cookie-policy', '/gdpr', '/contact', '/about'].map(
    (route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })
  );

  return [...routes, ...portfolioRoutes, ...solutionRoutes, ...staticRoutes];
}
