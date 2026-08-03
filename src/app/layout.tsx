import { SpeedInsights } from "@vercel/speed-insights/next";
import { Outfit } from "next/font/google";
import React, { Suspense } from "react";

import type { Metadata, Viewport } from "next";

import { getSolutionsAction } from "@/app/actions/solutions";
import { Layout, GoogleAnalytics as GoogleAnalyticsTracker, WebVitalsReporter, StructuredData } from "@/components";
import { COMPANY_NAME, SITE_URL, SHORT_DESC } from "@/lib/constants";
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/lib/schemas";
import { cn } from "@/lib/utils";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0ea5a4",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY_NAME} | Custom Software Development & IT Services`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description: SHORT_DESC,
  applicationName: COMPANY_NAME,
  keywords: [
    "IT Services",
    "Custom Software Development",
    "IT Services Company",
    "Software Development Agency",
    "Web Application Development",
    "Enterprise AI Solutions",
    "IT Consulting",
    "B2B IT Solutions",
    "E-commerce Solutions",
    "Full-Stack Development",
    "React Next.js Development",
    "Machine Learning Integration",
    "Mobile App Development",
    COMPANY_NAME,
  ],
  authors: [{ name: COMPANY_NAME, url: SITE_URL }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,
  icons: {
    icon: "/Zebotix.png",
    shortcut: "/Zebotix.png",
    apple: "/Zebotix.png",
  },
  verification: {
    google: process.env.GOOGLE_CONSOLE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {},
  openGraph: {
    title: `${COMPANY_NAME} | Custom Software Development & IT Services`,
    description: SHORT_DESC,
    url: SITE_URL,
    siteName: COMPANY_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${COMPANY_NAME} — software and AI solutions`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_NAME} | Custom Software Development & IT Services`,
    description: SHORT_DESC,
    images: ["/og-image.png"],
    creator: "@zebotix1499",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = generateOrganizationSchema();
  const websiteJsonLd = generateWebsiteSchema();

  const solutionsRes = await getSolutionsAction();
  const solutions = solutionsRes.success && solutionsRes.data ? solutionsRes.data : [];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData data={organizationJsonLd} />
        <StructuredData data={websiteJsonLd} />
      </head>
      <body
        className={cn(
          outfit.variable,
          "modal-scroll min-h-screen bg-background text-foreground antialiased font-sans"
        )}
      >
        <SpeedInsights />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-zebotix-blue focus:text-white focus:rounded-md"
        >
          Skip to main content
        </a>
        <Suspense fallback={null}>
          <GoogleAnalyticsTracker />
        </Suspense>

        <Suspense fallback={null}>
          <WebVitalsReporter />
          <SmoothScrollProvider />
          <Layout solutions={solutions}>{children}</Layout>
        </Suspense>
      </body>
    </html>
  );
}
