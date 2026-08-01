import os from "node:os";

import type { NextConfig } from "next";

// Helper to get local network IPv4 addresses for local development testing
const isDev = process.env.NODE_ENV === "development";
// const isPro = process.env.NODE_ENV === "production";
const getLocalIPs = (): string[] => {
  const ips: string[] = [];
  try {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      const ifaceList = interfaces[name];
      if (ifaceList) {
        for (const net of ifaceList) {
          // Only permit IPv4, non-internal addresses
          if (net.family === "IPv4" && !net.internal) {
            ips.push(net.address);
          }
        }
      }
    }
  } catch (error) {
    console.error("Failed to retrieve network interfaces for development origins:", error);
  }
  return ips;
};

const _cloudflareTurnstileOrigin = "https://challenges.cloudflare.com";

// Define origins allowed during local development
const devOrigins = ["localhost"];
if (isDev) {
  const localIPs = getLocalIPs();
  for (const ip of localIPs) {
    devOrigins.push(ip, `${ip}:3000`, `${ip}:3001`);
  }

  // Also support custom origins from env variable if specified
  if (process.env.ALLOWED_DEV_ORIGINS) {
    const customOrigins = process.env?.ALLOWED_DEV_ORIGINS?.split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    devOrigins.push(...customOrigins);
  }
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    // ws
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
    deviceSizes: [640, 650, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons", "framer-motion", "gsap"],
    optimizeCss: true,
  },

  turbopack: {},
  productionBrowserSourceMaps: true,
  allowedDevOrigins: Array.from(new Set(devOrigins)),
  async headers() {
    const headersList = [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          // {
          //   key: "Content-Security-Policy",
          //   // A standard CSP. May need tuning if they use external scripts.
          //   value: [
          //     "default-src 'self'",
          //     process.env.NODE_ENV === "development"
          //       ? `script-src 'self' 'unsafe-eval' 'unsafe-inline' ${cloudflareTurnstileOrigin} https://www.googletagmanager.com https://assets.apollo.io`
          //       : `script-src 'self' 'unsafe-inline' ${cloudflareTurnstileOrigin} https://www.googletagmanager.com https://assets.apollo.io`,
          //     "style-src 'self' 'unsafe-inline'",
          //     "img-src 'self' blob: data: https:",
          //     "font-src 'self' data:",
          //     `frame-src 'self' ${cloudflareTurnstileOrigin}`,
          //     "object-src 'none'",
          //     "base-uri 'self'",
          //     "form-action 'self'",
          //     "frame-ancestors 'none'",
          //     process.env.NODE_ENV === "development"
          //       ? `connect-src 'self' ${cloudflareTurnstileOrigin} ws://127.0.0.1:* ws://localhost:* https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.apollo.io https://aplo-evnt.com https://*.aplo-evnt.com`
          //       : `connect-src 'self' ${cloudflareTurnstileOrigin} https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.apollo.io https://aplo-evnt.com https://*.aplo-evnt.com`,
          //   ].join("; "),
          // },
        ],
      },
    ];

    return headersList;
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.zebotix.com",
          },
          {
            type: "host",
            value: "zebotix.vercel.app",
          },
        ],
        destination: "https://zebotix.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
