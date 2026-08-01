"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Reveal } from "@/components/animations";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface SolutionBenefit {
  title: string;
  desc?: string;
}

interface SolutionProduct {
  name: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  slug?: string;
  tagline?: string;
  subtitle?: string;
  image?: string | null;
  products?: SolutionProduct[];
  benefits?: SolutionBenefit[];
  industrySlug?: string;
}

interface ProductsCarouselSectionProps {
  solutions?: SolutionItem[];
}

const ProductsCarouselSection = ({ solutions = [] }: ProductsCarouselSectionProps) => {
  const items = solutions.slice(0, 4);

  // Bento layout classes for 4 cards
  const gridClasses = [
    "col-span-12 md:col-span-7 min-h-[360px]",
    "col-span-12 md:col-span-5 min-h-[360px]",
    "col-span-12 md:col-span-5 min-h-[360px]",
    "col-span-12 md:col-span-7 min-h-[360px]",
  ];

  return (
    <section
      id="solutions"
      className="bg-zinc-950 py-20 md:py-28 border-t border-zinc-900 overflow-hidden"
      aria-labelledby="solutions-heading"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-24">
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-blue-500 font-black mb-4 block">
              Core Expertise
            </span>
          </Reveal>
          <Reveal delay={0.15}>
            <h2
              id="solutions-heading"
              className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tighter"
            >
              Scalable Software Architectures
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-zinc-400 text-lg leading-relaxed">
              We design, build, and deploy high-performance digital systems. No generic templates,
              just tailored code engineered for absolute scale.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-4 sm:gap-6 md:gap-8 grid-flow-dense">
          {items.map((s, i) => {
            const title = s.title;
            const subtitle = s.subtitle || s.tagline || "";
            const slug = s.slug || s.id || "";
            const industrySlug = s.industrySlug || "general";
            const id = s.id || s.slug || "";
            let benefits: string[] = [];
            if (s.products) {
              benefits = s.products.map((p: SolutionProduct) => p.name);
            } else if (Array.isArray(s.benefits)) {
              benefits = (s.benefits as SolutionBenefit[]).map((b: SolutionBenefit) => b.title);
            }

            const layoutClass = gridClasses[i % 4];

            return (
              <Reveal key={id} delay={0.1 * i} distance={30} className={cn("h-full", layoutClass)}>
                <div className="bg-zinc-900/40 p-8 border border-zinc-800 flex flex-col justify-between h-full hover:border-blue-500/35 transition-all duration-300 relative overflow-hidden group select-none">
                  {/* Subtle Background Art */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <Image
                      src={s.image || "/images/hero-section-image.webp"}
                      alt={title}
                      fill
                      className="object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 650px"
                    />
                  </div>
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-linear-to-br from-zinc-950/90 via-zinc-950/80 to-transparent pointer-events-none" />
                  {/* Glassy hover gradient */}
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <h3 className="text-2xl font-black text-white mb-3 group-hover:text-blue-500 transition-colors tracking-tight">
                      {title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-xl">
                      {subtitle}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {benefits.slice(0, 3).map((bText: string, pi: number) => (
                        <li key={pi} className="flex items-center gap-3 text-sm text-zinc-300">
                          <span className="w-1.5 h-1.5 bg-blue-500 shrink-0" />
                          <span className="font-medium text-xs uppercase tracking-wider text-zinc-400">
                            {bText}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-zinc-850 relative z-10">
                    <Link
                      href={`/solutions/${industrySlug}/${slug}`}
                      aria-label={`Explore ${title} Solution`}
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

        <Reveal delay={0.5} className="mt-12 md:mt-24 text-center max-w-4xl mx-auto">
          <div className="p-6 sm:p-8 md:p-12 bg-zinc-900/30 border border-zinc-800 flex flex-col items-center">
            <h4 className="text-2xl font-black text-white mb-4 tracking-tight">
              Ready to architect your custom software?
            </h4>
            <p className="text-zinc-400 mb-8 max-w-xl leading-relaxed">
              Book a consultation call with our team to analyze your business goals and configure
              your system roadmap.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 h-12 rounded-none"
            >
              <Link href="/quick-quote">Request Technical Scope</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ProductsCarouselSection;
