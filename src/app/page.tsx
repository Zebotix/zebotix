import Script from "next/script";
import { Suspense } from "react";

import type { Metadata } from "next";

import { getBlogsAction } from "@/app/actions/blogs";
import { getSolutionsAction } from "@/app/actions/solutions";
import { getTestimonialsAction } from "@/app/actions/testimonials";
import BlogSection from "@/components/BlogSection";
import CtaSection from "@/components/CtaSection";
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";
import OurProcess from "@/components/OurProcess";
import ProductsCarouselSection from "@/components/ProductsCarousel";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrustedBy from "@/components/TrustedBy";
import { COMPANY_NAME, SHORT_DESC, SITE_URL } from "@/lib/constants";
import { getSanitizedSchema, generateLocalBusinessSchema } from "@/lib/schemas";

// Server Actions

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${COMPANY_NAME} — Empowering innovation with software & AI`,
  description: `${SHORT_DESC} Build responsive web apps, AI-driven products, and scalable systems.`,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${COMPANY_NAME} — Empowering innovation with software & AI`,
    description: SHORT_DESC,
    type: "website",
    url: SITE_URL,
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${SITE_URL}/Zebotix.webp`,
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
    images: [`${SITE_URL}/Zebotix.webp`],
  },
};

function LoadingFallback() {
  return <div className="w-full h-96 bg-zinc-900 border border-zinc-800 animate-pulse" />;
}

async function SolutionsWrapper() {
  const res = await getSolutionsAction();
  const solutions = res.success ? res.data : [];
  return <ProductsCarouselSection solutions={solutions} />;
}

async function TestimonialsWrapper() {
  const res = await getTestimonialsAction(true);
  const testimonials = res.success ? res.data : [];
  return <TestimonialsSection testimonials={testimonials} />;
}

async function BlogsWrapper() {
  const res = await getBlogsAction(true);
  const blogs = res.success ? res.data : [];
  return <BlogSection blogs={blogs} />;
}

export default async function Home() {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <main id="main-content">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getSanitizedSchema(localBusinessSchema),
        }}
      />
      <Suspense fallback={<LoadingFallback />}>
        <HeroSection
          primaryCta={{ href: "/quick-quote", label: "Get a Quick Quote" }}
          secondaryCta={{ href: "/contact", label: "Contact Us" }}
        />
      </Suspense>

      <TrustedBy />

      <Suspense fallback={<LoadingFallback />}>
        <FeaturesSection />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <SolutionsWrapper />
      </Suspense>

      <OurProcess />

      <Suspense fallback={<LoadingFallback />}>
        <TestimonialsWrapper />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <BlogsWrapper />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <CtaSection />
      </Suspense>
    </main>
  );
}
