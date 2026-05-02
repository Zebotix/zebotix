import type { NextConfig } from 'next';

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.module.rules.push({
        test: /(@prisma\/extension-optimize|prisma-instrumentation-5-x|@opentelemetry)/,
        use: 'null-loader',
      });
    }
    return config;
  },
  allowedDevOrigins: ['*.app.github.dev', '*.devtunnels.ms'],
  // Enable Cache Components for instant navigation and performance
  cacheComponents: true,
  experimental: {
    globalNotFound: true,
    // Enable instant navigation validation in development
    instantNavigationDevToolsToggle: true,
  },
  // Provide an explicit (empty) turbopack config to avoid build errors
  // when a custom webpack config is present. See Next.js docs for details.
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Optimize image formats automatically
    formats: ['image/webp', 'image/avif'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    if (!isProduction) return [];
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: 'upgrade-insecure-requests', // Force HTTPS for all content
          },
        ],
      },
    ];
  },
  // Add these for better HTTPS enforcement
  trailingSlash: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
};

export default nextConfig;
