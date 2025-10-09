import type { NextConfig } from 'next';

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
  experimental: {
    globalNotFound: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
