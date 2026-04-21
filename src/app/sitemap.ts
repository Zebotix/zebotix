import { MetadataRoute } from 'next';
import { SITE_URL, NAV_LINKS, PORTFOLIOS, SOLUTIONS } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = NAV_LINKS.filter(l => !l.href.startsWith('#')).map(l => ({
    url: `${SITE_URL}${l.href === '/' ? '' : l.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: l.href === '/' ? 1 : 0.8,
  }));

  const portfolioRoutes = PORTFOLIOS.map(p => ({
    url: `${SITE_URL}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const solutionRoutes = SOLUTIONS.map(s => ({
    url: `${SITE_URL}/solutions/${s.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const staticRoutes = [
    '/privacy',
    '/terms',
    '/cookie-policy',
    '/gdpr',
  ].map(route => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }));

  return [...routes, ...portfolioRoutes, ...solutionRoutes, ...staticRoutes];
}
