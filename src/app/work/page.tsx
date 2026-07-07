import { ArrowRight, Sparkles } from "lucide-react";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { getPortfoliosAction } from "@/app/actions/portfolio";
import { Reveal } from "@/components/animations";
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
    <main className="bg-zinc-950 text-zinc-300 min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 transition-colors inline-block"
              >
                Talk to an Expert
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolios.map((item, index) => {
              const summary = item.problem || "";
              const image = (item.gallery && item.gallery[0]) || "";
              const tags = item.techStack || [];

              return (
                <Reveal key={item.id} delay={0.1 * (index % 3)} distance={35}>
                  <div className="bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between h-full hover:border-blue-500/35 transition-all duration-300 group">
                    <Link href={`/work/${item.slug}`} className="block">
                      <div className="relative h-56 w-full bg-zinc-850 overflow-hidden">
                        {image ? (
                          <Image
                            src={image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center text-zinc-550 font-bold">
                            Case Study
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tags.slice(0, 3).map((t: string) => (
                            <span
                              key={t}
                              className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-blue-500/10 text-blue-500 border border-blue-500/20"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <h2 className="text-2xl font-black text-white mb-3 group-hover:text-blue-500 transition-colors">
                          {item.title}
                        </h2>
                        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                          {summary}
                        </p>
                      </div>
                    </Link>
                    <div className="p-6 pt-0">
                      <Link
                        href={`/work/${item.slug}`}
                        className="text-white text-xs font-black uppercase tracking-wider hover:text-blue-500 transition-colors flex items-center gap-1"
                      >
                        Explore Case Study <ArrowRight className="h-3.5 w-3.5" />
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
