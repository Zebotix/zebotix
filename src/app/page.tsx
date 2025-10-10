'use client';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import PricingSection from '@/components/PricingSection';
import PortfolioSection from '@/components/PortfolioSection';
import FaqSection from '@/components/FaqSection';
import CtaSection from '@/components/CtaSection';
import ProductsCarouselSection from '@/components/ProductsCarousel';
import CreateVisit from '@/hooks/createVisit';
export default function Home() {
  return (
    <>
      <section>
        <HeroSection />
        <FeaturesSection />
        <ProductsCarouselSection />
        <PortfolioSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </section>
      <CreateVisit />
    </>
  );
}
