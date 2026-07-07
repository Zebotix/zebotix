import { Sparkles } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import React from "react";

import { getPortfoliosAction } from "@/app/actions/portfolio";
import { Reveal } from "@/components/animations";
import { WorkListClient } from "@/components/WorkListClient";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Our Work | ${COMPANY_NAME}`,
  description:
    "Explore our portfolio of scalable web applications, e-commerce storefronts, and AI workflows.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: `Our Work | ${COMPANY_NAME}`,
    description:
      "Explore our portfolio of scalable web applications, e-commerce storefronts, and AI workflows.",
    url: `${SITE_URL}/work`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Our Work | ${COMPANY_NAME}`,
    description:
      "Explore our portfolio of scalable web applications, e-commerce storefronts, and AI workflows.",
  },
};

export default async function WorkPage() {
  const res = await getPortfoliosAction();
  const portfolios = res.success ? res.data : [];

  return (
    <main className="bg-zinc-950 text-zinc-300 min-h-screen pt-10 pb-24">
      <div className="section-container">
        <header className="max-w-3xl mb-20">
          <Reveal>
            <span className="text-blue-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4" /> Selected Case Studies
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Selected Work
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-zinc-400">
              A gallery of dynamic platforms, custom CMS portals, and API integrations we have
              designed, architected, and deployed.
            </p>
          </Reveal>
        </header>

        {portfolios.length === 0 ? (
          <Reveal delay={0.3}>
            <div className="text-center py-20 border border-zinc-900 bg-zinc-900/20">
              <h2 className="text-2xl font-bold text-white mb-4">Portfolio Coming Soon</h2>
              <p className="text-zinc-500 mb-8 max-w-md mx-auto">
                We are currently preparing case studies of our latest software launches. Check back
                shortly.
              </p>
              <Link
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 transition-colors inline-block rounded-xl"
              >
                Talk to an Expert
              </Link>
            </div>
          </Reveal>
        ) : (
          <WorkListClient initialWorks={portfolios} />
        )}
      </div>
    </main>
  );
}
