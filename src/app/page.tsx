'use client';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import PricingSection from '@/components/PricingSection';
import PortfolioSection from '@/components/PortfolioSection';
import FaqSection from '@/components/FaqSection';
import CtaSection from '@/components/CtaSection';
import ProductsCarouselSection from '@/components/ProductsCarousel';
import { useCreateVisit } from '@/hooks/useCreateVisit';

export default function Home() {
  useCreateVisit();

  return (
    <section>
      <HeroSection />
      <FeaturesSection />
      <ProductsCarouselSection />
      <PortfolioSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </section>
  );
}
