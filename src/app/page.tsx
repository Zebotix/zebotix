import { Suspense } from 'react';
import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import PricingSection from '@/components/PricingSection';
import PortfolioSection from '@/components/PortfolioSection';
import FaqSection from '@/components/FaqSection';
import CtaSection from '@/components/CtaSection';
import ProductsCarouselSection from '@/components/ProductsCarousel';
import { Skeleton } from '@/components/ui/Skeleton';
import { COMPANY_NAME, SHORT_DESC, SITE_URL } from '@/lib/constants';
import { getSanitizedSchema, generateLocalBusinessSchema } from '@/lib/schemas';

// Enable instant navigation for this page
export const unstable_instant = { prefetch: 'static' };

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
    type: 'website',
    url: SITE_URL,
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${SITE_URL}/Zebotix.png`,
        width: 1200,
        height: 630,
        alt: `${COMPANY_NAME} — software and AI solutions`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${COMPANY_NAME} — Empowering innovation with software & AI`,
    description: SHORT_DESC,
    images: [`${SITE_URL}/Zebotix.png`],
  },
};

function LoadingFallback() {
  return <Skeleton className='w-full h-96' />;
}

export default function Home() {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <main id='main-content'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: getSanitizedSchema(localBusinessSchema),
        }}
      />
      <Suspense fallback={<LoadingFallback />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <FeaturesSection />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <ProductsCarouselSection />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <PortfolioSection />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <PricingSection />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <FaqSection />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <CtaSection />
      </Suspense>
    </main>
  );
}
