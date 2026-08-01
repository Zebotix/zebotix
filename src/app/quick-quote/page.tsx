import { type Metadata } from "next";

import ClientExpectations from "./_components/landing/ClientExpectations";
import ComparisonSection from "./_components/landing/ComparisonSection";
import FaqSection from "./_components/landing/FaqSection";
import HeroSection from "./_components/landing/HeroSection";
import IndustriesSection from "./_components/landing/IndustriesSection";
import ProcessTimeline from "./_components/landing/ProcessTimeline";
import SocialProof from "./_components/landing/SocialProof";
import TechnologiesGrid from "./_components/landing/TechnologiesGrid";
import WhyZebotix from "./_components/landing/WhyZebotix";
import QuickQuoteClient from "./_components/QuickQuoteClient";

import { COMPANY_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Project Estimator — ${COMPANY_NAME}`,
  description:
    "Get a quick project estimate from Zebotix. Share your requirements and get a roadmap within 24 hours.",
  alternates: {
    canonical: "/quick-quote",
  },
  openGraph: {
    title: `Project Estimator — ${COMPANY_NAME}`,
    description:
      "Get a quick project estimate from Zebotix. Share your requirements and get a roadmap within 24 hours.",
    url: `${SITE_URL}/quick-quote`,
    type: "website",
    images: [
      {
        url: "/Zebotix.png",
        width: 1200,
        height: 630,
        alt: `${COMPANY_NAME} — Quick Quote`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Project Estimator — ${COMPANY_NAME}`,
    description:
      "Get a quick project estimate from Zebotix. Share your requirements and get a roadmap within 24 hours.",
    images: ["/Zebotix.png"],
  },
};

export default function QuickQuotePage() {
  return (
    <div className="bg-zinc-950 min-h-screen font-sans selection:bg-blue-500/30 selection:text-white">
      <HeroSection />
      <SocialProof />
      <WhyZebotix />
      <ComparisonSection />
      <IndustriesSection />
      <TechnologiesGrid />
      <ProcessTimeline />

      {/* The Interactive Estimator */}
      <section id="estimator" className="scroll-mt-24">
        <QuickQuoteClient />
      </section>

      <ClientExpectations />
      <FaqSection />
    </div>
  );
}
