import { ArrowRight, Sparkles } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import React from "react";

import { getSolutionsAction } from "@/app/actions/solutions";
import { Reveal } from "@/components/animations";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Our Solutions | ${COMPANY_NAME}`,
  description:
    "Enterprise-grade digital infrastructure designed to scale your business operations and dominate the market.",
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    title: `Our Solutions | ${COMPANY_NAME}`,
    description:
      "Enterprise-grade digital infrastructure designed to scale your business operations and dominate the market.",
    url: `${SITE_URL}/solutions`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Our Solutions | ${COMPANY_NAME}`,
    description:
      "Enterprise-grade digital infrastructure designed to scale your business operations and dominate the market.",
  },
};

export default async function SolutionsPage() {
  const res = await getSolutionsAction();
  const solutions = res.success ? res.data : [];

  return (
    <main className="bg-zinc-950 text-zinc-300 min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="max-w-3xl mb-20">
          <Reveal>
            <span className="text-blue-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4" /> Scalable Tech Architecture
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Enterprise Solutions
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-zinc-400">
              We engineer custom software, fast e-commerce setups, and smart automation systems
              designed for operational excellence.
            </p>
          </Reveal>
        </header>

        {solutions.length === 0 ? (
          <Reveal delay={0.3}>
            <div className="text-center py-20 border border-zinc-900 bg-zinc-900/20">
              <h2 className="text-2xl font-bold text-white mb-4">Solutions Coming Soon</h2>
              <p className="text-zinc-500 mb-8 max-w-md mx-auto">
                Our technology architects are actively indexing new systems. Check back shortly.
              </p>
              <Link
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 transition-colors inline-block"
              >
                Talk to an Expert
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((sol, index) => {
              const benefits = Array.isArray(sol.benefits)
                ? (sol.benefits as { title: string; desc: string }[])
                : [];
              return (
                <Reveal key={sol.id} delay={0.1 * (index % 3)} distance={35}>
                  <div className="bg-zinc-900/40 border border-zinc-800 p-8 flex flex-col justify-between h-full hover:border-blue-500/35 transition-colors duration-300 group">
                    <div>
                      <h2 className="text-2xl font-black text-white mb-3 group-hover:text-blue-500 transition-colors">
                        {sol.title}
                      </h2>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-8">{sol.tagline}</p>

                      <ul className="space-y-3 mb-8">
                        {benefits.slice(0, 3).map((b, bi) => (
                          <li key={bi} className="flex items-start gap-3 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                            <div>
                              <strong className="text-zinc-300 block">{b.title}</strong>
                              <span className="text-zinc-500 text-xs">{b.desc}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-zinc-850">
                      <Link
                        href={`/solutions/${sol.industrySlug}/${sol.slug}`}
                        aria-label={`Explore ${sol.title} Solution`}
                        className="w-full text-white font-bold hover:text-blue-500 transition-colors flex items-center justify-between group/link"
                      >
                        Explore Solution
                        <ArrowRight className="h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
