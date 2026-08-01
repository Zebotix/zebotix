"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

import { Reveal } from "@/components/animations";
import { Button } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

export interface PortfolioItem {
  id?: string;
  title: string;
  slug: string;
  summary?: string;
  problem?: string;
  image?: string;
  gallery?: string[];
  tags?: string[];
  techStack?: string[];
  description?: string;
  challenges?: string;
  results?: unknown;
}

interface PortfolioSectionProps {
  portfolios?: PortfolioItem[];
}

const PortfolioSection = ({ portfolios = [] }: PortfolioSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = portfolios.slice(0, 3); // Take top 3 for stacking layout

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(".portfolio-stack-card");
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // Skip last card

        gsap.fromTo(
          card,
          { scale: 1, opacity: 1 },
          {
            scale: 0.94,
            opacity: 0.4,
            scrollTrigger: {
              trigger: card,
              start: "top top+=140",
              end: "bottom top+=140",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section
      ref={containerRef}
      id="portfolio"
      className="bg-zinc-950 py-20 md:py-28 border-t border-zinc-900 overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-24">
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-blue-500 font-black mb-4 block">
              Case Studies
            </span>
          </Reveal>
          <Reveal delay={0.15}>
            <h2
              id="portfolio-heading"
              className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tighter"
            >
              Featured Deliveries
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Explore how we design and deploy scalable digital systems for innovators and leading
              brands.
            </p>
          </Reveal>
        </div>

        {/* Stacked Cards Container */}
        <div className="relative space-y-0 pb-12">
          {items.map((project, index) => {
            const summary = project.summary || project.problem || "";
            const image = project.image || project.gallery?.[0] || "";
            const tags = project.tags || project.techStack || [];

            return (
              <div
                key={project.slug}
                className="group portfolio-stack-card sticky top-24 md:top-32 w-full min-h-[480px] md:min-h-[560px] bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row justify-between mb-12 sm:mb-16 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] will-change-transform select-none rounded-none"
                style={{
                  zIndex: index + 1,
                }}
              >
                {/* Details Side */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between h-full min-h-[240px] md:min-h-[560px] z-10 bg-zinc-900 rounded-none">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-6 block">
                      Case Study 0{index + 1}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-md line-clamp-3">
                      {summary}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {tags.slice(0, 4).map((t: string) => (
                        <span
                          key={t}
                          className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-blue-900/20 text-blue-300 border border-blue-700/30 rounded-none"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-850 rounded-none">
                    <Button
                      asChild
                      className="bg-white hover:bg-zinc-200 text-black font-bold h-11 px-6 flex items-center gap-2 w-fit rounded-none"
                    >
                      <Link href={`/work/${project.slug}`}>
                        Read Case Study <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Mock Image Side */}
                <div className="w-full md:w-1/2 relative min-h-[240px] md:min-h-[560px] overflow-hidden border-t md:border-t-0 md:border-l border-zinc-850 rounded-none">
                  {image ? (
                    <Image
                      src={image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-103 rounded-none grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 650px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold rounded-none">
                      Zebotix Case Study
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-zinc-950/20 via-transparent to-transparent pointer-events-none rounded-none" />
                </div>
              </div>
            );
          })}
        </div>

        <Reveal delay={0.4} className="mt-20 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-white font-semibold hover:text-blue-500 transition-colors group text-sm uppercase tracking-wider"
          >
            Explore Complete Works
            <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default PortfolioSection;
