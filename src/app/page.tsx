'use client';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import PricingSection from '@/components/PricingSection';
import PortfolioSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import CtaSection from '@/components/CtaSection';
import ProductsCarouselSection from '@/components/ProductsCarousel';
export default function Home() {
  return (
    <section>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <ProductsCarouselSection />
      <PortfolioSection />
      <FaqSection />
      <CtaSection />
    </section>
  );
}
