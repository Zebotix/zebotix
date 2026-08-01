import dynamic from "next/dynamic";
import { Suspense } from "react";

import type { Metadata } from "next";

import { getBlogsAction } from "@/app/actions/blogs";
import { getFeaturedPortfoliosAction } from "@/app/actions/portfolio";
import { getSolutionsAction } from "@/app/actions/solutions";
import { getTestimonialsAction } from "@/app/actions/testimonials";
import BlogSection from "@/components/BlogSection";
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";
import PortfolioSection, { type PortfolioItem } from "@/components/PortfolioSection";
import ProductsCarouselSection, { type SolutionItem } from "@/components/ProductsCarousel";
import TestimonialsSection from "@/components/TestimonialsSection";
import { LoadingFallback } from "@/components/ui/FallBackLoading";
import { COMPANY_NAME, SHORT_DESC, SITE_URL } from "@/lib/constants";
import { getSanitizedSchema, generateLocalBusinessSchema } from "@/lib/schemas";

const OurProcess = dynamic(() => import("@/components/OurProcess"));
const CtaSection = dynamic(() => import("@/components/CtaSection"));
const TrustedBy = dynamic(() => import("@/components/TrustedBy"));
// Server Actions

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${COMPANY_NAME} | Custom Software Development & IT Services`,
  description: SHORT_DESC,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${COMPANY_NAME} | Custom Software Development & IT Services`,
    description: SHORT_DESC,
    type: "website",
    url: SITE_URL,
    siteName: COMPANY_NAME,
    images: [
      {
        url: `/Zebotix.png`,
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
    images: [`/Zebotix.png`],
  },
};

async function SolutionsWrapper() {
  const res = await getSolutionsAction();
  const solutions = res.success ? (res.data as unknown as SolutionItem[]) : [];
  return <ProductsCarouselSection solutions={solutions} />;
}

async function PortfoliosWrapper() {
  const res = await getFeaturedPortfoliosAction();
  const portfolios: PortfolioItem[] = res.success
    ? res.data.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        problem: p.problem,
        techStack: p.techStack,
        gallery: p.gallery,
        results: p.results,
      }))
    : [];
  return <PortfolioSection portfolios={portfolios} />;
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
    <main id="main-content" className="relative  bg-zinc-950 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getSanitizedSchema(localBusinessSchema),
        }}
      />

      {/* Sticky Hero Wrapper for Scroll-Over Effect */}
      <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
        <HeroSection primaryCta={{ href: "/quick-quote#estimator", label: "Get a Quick Quote" }} />
      </div>

      {/* Content scrolling over the hero */}
      <div className="relative z-10">
        <TrustedBy />

        <Suspense fallback={<LoadingFallback />}>
          <FeaturesSection />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <SolutionsWrapper />
        </Suspense>

        <OurProcess />

        <Suspense fallback={<LoadingFallback />}>
          <PortfoliosWrapper />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <TestimonialsWrapper />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <BlogsWrapper />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <CtaSection />
        </Suspense>
      </div>
    </main>
  );
}
