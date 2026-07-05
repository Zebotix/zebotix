import { GoogleAnalytics } from "@next/third-parties/google";
import { Outfit } from "next/font/google";
import React, { Suspense } from "react";

import type { Metadata, Viewport } from "next";

import { Layout, GoogleAnalytics as GoogleAnalyticsTracker, WebVitalsReporter } from "@/components";
import { COMPANY_NAME, SITE_URL, SHORT_DESC } from "@/lib/constants";
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  getSanitizedSchema,
} from "@/lib/schemas";
import { cn } from "@/lib/utils";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

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
  metadataBase: new URL("/"),
  title: {
    default: `${COMPANY_NAME} — Empowering innovation with software & AI`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description: `${SHORT_DESC} Build responsive web apps, AI-driven products, and scalable systems with our expert team.`,
  applicationName: COMPANY_NAME,
  keywords: [
    COMPANY_NAME,
    "e-commerce solutions",
    "products showcasing and portfolios",
    "clothes selling websites",
    "business websites",
    "responsive websites",
    "web development services",
    "mobile app development",
    "web apps",
    "web design",
    "web development",
    "web solutions",
    "mobile apps",
    "web development company",
    "software development company",
    "AI solutions",
    "web application development",
    "machine learning services",
    "IT services",
    "custom software",
    "product engineering",
    "full-stack development",
  ],
  authors: [{ name: COMPANY_NAME, url: SITE_URL }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,
  icons: {
    icon: "/Zebotix.webp",
    shortcut: "/Zebotix.webp",
    apple: "/Zebotix.webp",
  },
  manifest: "/favicon/site.webmanifest",
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
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${COMPANY_NAME} — Empowering innovation with software & AI`,
    description: SHORT_DESC,
    url: SITE_URL,
    siteName: COMPANY_NAME,
    type: "website",
    images: [
      {
        url: "/Zebotix.webp",
        width: 1200,
        height: 630,
        alt: `${COMPANY_NAME} — software and AI solutions`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_NAME} — Empowering innovation with software & AI`,
    description: SHORT_DESC,
    images: ["/Zebotix.webp"],
    creator: "@zebotix1499",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = generateOrganizationSchema();
  const websiteJsonLd = generateWebsiteSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: getSanitizedSchema(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: getSanitizedSchema(websiteJsonLd),
          }}
        />
      </head>
      <body
        className={cn(
          outfit.variable,
          "modal-scroll min-h-screen bg-background text-foreground antialiased font-sans"
        )}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-zebotix-blue focus:text-white focus:rounded-md"
        >
          Skip to main content
        </a>
        <Suspense fallback={null}>
          <GoogleAnalyticsTracker />
        </Suspense>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? "G-JD55RSPP55"} />
        <Suspense fallback={null}>
          <WebVitalsReporter />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SmoothScrollProvider>
              <Layout>{children}</Layout>
            </SmoothScrollProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
