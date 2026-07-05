"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { type FC, useId, useRef, useState, useEffect } from "react";

import { Reveal } from "@/components/animations";
import { Button } from "@/components/ui";
import { COMPANY_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export interface HeroSectionProps {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  heroImageSrc?: string;
  className?: string;
}

const HeroSection: FC<HeroSectionProps> = ({
  eyebrow = "Revolutionize the way you manage your business",
  title,
  description = `Simplify how your business operates, communicates, and evolves — all with ${COMPANY_NAME}’s intelligent infrastructure.`,
  primaryCta = { href: "/quick-quote", label: "Get a Quick Quote" },
  secondaryCta = { href: "/contact", label: "Contact Us" },
  heroImageSrc = "/images/hero-section-image.webp",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageFigureRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      // Glow movement
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.15,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
      });

      // Zooming image on scroll
      if (imageFigureRef.current) {
        gsap.fromTo(
          imageFigureRef.current,
          {
            scale: 0.85,
            opacity: 0.8,
            y: 50,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            force3D: true,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageFigureRef.current,
              start: "top bottom-=100",
              end: "top 20%",
              scrub: 1,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  const id = useId();
  const eyebrowId = `${id}-eyebrow`;
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;

  return (
    <section
      id="home"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      ref={containerRef}
      className={cn(
        "relative bg-zinc-950 text-zinc-300 min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden flex flex-col justify-center",
        className
      )}
    >
      {/* Cinematic Radial Wash Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {mounted && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-screen pointer-events-none z-0"
            style={{ transform: "translateZ(0)" }}
          >
            <source src="/videos/bg-3-opt.webm" type="video/webm" />
            <source src="/videos/bg-3-opt.mp4" type="video/mp4" />
          </video>
        )}
        <div
          ref={glowRef}
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-blue-600/10 rounded-full blur-[120px] z-10"
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-blue-700/5 rounded-full blur-[90px] z-10"
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex flex-col items-center w-full">
        <div className="text-center max-w-5xl flex flex-col items-center">
          <Reveal delay={0.1} distance={15}>
            <span
              id={eyebrowId}
              className="text-xs uppercase tracking-widest text-blue-500 font-black mb-6 block"
            >
              {eyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.25}>
            <h1
              id={titleId}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-6 sm:mb-8 text-white tracking-tighter leading-[1.05] max-w-5xl"
            >
              {title || (
                <>
                  We build{" "}
                  <span
                    className="inline-block w-16 sm:w-24 lg:w-32 h-8 sm:h-12 lg:h-16 border border-white/10 align-middle bg-cover bg-center mx-2 grayscale brightness-125 hover:grayscale-0 transition-all duration-500"
                    style={{
                      backgroundImage: "url(https://picsum.photos/seed/tech/300/150)",
                    }}
                  />{" "}
                  platforms for digital scale.
                </>
              )}
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <p
              id={descriptionId}
              className="text-zinc-400 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-3xl leading-relaxed font-medium"
            >
              {description}
            </p>
          </Reveal>

          <Reveal delay={0.55} distance={20}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-zinc-200 font-bold h-12 px-8 w-full sm:w-auto"
              >
                <Link href={primaryCta.href}>
                  {primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-8 border-zinc-800 hover:border-zinc-700 bg-transparent text-white font-bold w-full sm:w-auto"
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Dashboard Visual Preview */}
        <Reveal delay={0.7} distance={40} className="w-full mt-12 sm:mt-16 md:mt-24 relative z-20">
          <figure
            ref={imageFigureRef}
            className="relative overflow-hidden p-1 md:p-2 bg-white/2 backdrop-blur-3xl rounded-[1.25rem] sm:rounded-[2.25rem] shadow-[0_0_120px_-20px_rgba(59,130,246,0.15)] group max-w-6xl mx-auto ring-1 ring-white/5"
            style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          >
            {/* Top Browser Bar */}
            <div className="flex items-center px-4 py-3 sm:py-4 bg-zinc-950/90 rounded-t-[1.25rem] sm:rounded-t-4xl border-b border-white/5 relative z-10">
              <div className="flex space-x-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-800 group-hover:bg-red-500/90 transition-colors duration-500" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-800 group-hover:bg-yellow-500/90 transition-colors duration-500" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-800 group-hover:bg-green-500/90 transition-colors duration-500" />
              </div>
              <div className="mx-auto flex justify-center w-full absolute left-0 right-0 pointer-events-none">
                <div className="px-6 py-1.5 bg-white/3 rounded-md text-[10px] text-zinc-500 font-medium tracking-wide flex items-center gap-2 border border-white/5">
                  <svg
                    className="w-3 h-3 text-zinc-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  app.zebotix.com
                </div>
              </div>
            </div>

            <div className="w-full overflow-hidden relative aspect-4/5 sm:aspect-video md:aspect-[2.35/1] rounded-b-[1.25rem] sm:rounded-b-4xl bg-zinc-950">
              <Image
                src={heroImageSrc}
                alt="Interactive dashboard preview"
                fill
                className="object-cover object-top transition-transform duration-1000 group-hover:scale-105 opacity-30 rounded-b-xl sm:rounded-b-4xl group-hover:opacity-50 mix-blend-screen"
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
              />

              <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(9,9,11,0.8)_100%)] pointer-events-none" />

              {/* Central Glassmorphic Dashboard Panel */}
              <div className="absolute inset-x-4 sm:inset-x-12 lg:inset-x-32 top-4 sm:top-12 bottom-4 sm:bottom-12 bg-zinc-950/60 backdrop-blur-2xl border border-white/5 rounded-2xl shadow-2xl flex flex-col overflow-hidden transform transition-all duration-700 group-hover:scale-[1.02] ring-1 ring-white/5">
                {/* Panel Header */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <svg
                        className="w-4 h-4 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                        Zebotix Intelligence
                      </h3>
                      <p className="text-zinc-500 text-[9px] sm:text-[10px] uppercase tracking-widest font-medium mt-0.5">
                        Live Environment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                    <span className="relative flex h-1.5 w-1.5">
                      <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <div className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                    </span>
                    <span className="text-green-400 text-[10px] font-semibold tracking-wide hidden sm:inline-block">
                      Active
                    </span>
                  </div>
                </div>

                {/* Panel Body */}
                <div className="flex-1 p-3 sm:p-6 flex flex-col md:flex-row gap-4 sm:gap-6 min-h-0">
                  {/* Left: Code/Log Activity */}
                  <div className="flex-1 bg-zinc-950/80 rounded-xl border border-white/5 p-3 sm:p-5 font-mono text-[9px] sm:text-xs text-zinc-500 flex flex-col gap-2 sm:gap-2.5 overflow-y-auto relative shadow-inner min-h-0">
                    <div className="absolute top-0 left-0 w-full h-12 bg-linear-to-b from-zinc-950 to-transparent z-10" />
                    <div className="text-zinc-600">~ system.initialize()</div>
                    <div className="text-blue-400/80">&gt; Loading neural weights... [100%]</div>
                    <div className="text-zinc-400">
                      &gt; Analyzing real-time data streams (1.2TB/s)...
                    </div>
                    <div className="text-green-400/80 flex items-center gap-2">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Optimization achieved: +42.5% efficiency
                    </div>
                    <div className="text-zinc-400 hidden sm:block">
                      &gt; Syncing across global edge nodes...
                    </div>
                    <div className="hidden sm:flex flex-col gap-1 mt-1 pl-4 border-l border-white/5">
                      <div className="text-zinc-500 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-green-500" /> us-east-1 (2ms)
                      </div>
                      <div className="text-zinc-500 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-green-500" /> eu-west-2 (12ms)
                      </div>
                      <div className="text-zinc-500 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-green-500" /> ap-south-1 (45ms)
                      </div>
                    </div>
                    <div className="text-blue-400/80 mt-auto flex items-center gap-2">
                      <span className="text-zinc-600">root@zebotix:~#</span> await instruction{" "}
                      <span className="w-2 h-3 bg-blue-400 animate-pulse" />
                    </div>
                  </div>

                  {/* Right: Clean Metrics Dashboard */}
                  <div className="w-full md:w-[240px] lg:w-[280px] hidden sm:flex flex-col gap-4">
                    {/* Metric 1: Compute Load */}
                    <div className="bg-zinc-950/80 rounded-xl border border-white/5 p-4 sm:p-5 shadow-inner relative overflow-hidden group/metric">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05)_0%,transparent_50%)]" />
                      <div className="relative z-10 flex justify-between items-start mb-4">
                        <div>
                          <div className="text-zinc-500 text-[9px] uppercase tracking-widest font-bold mb-1.5">
                            Compute Load
                          </div>
                          <div className="text-white text-2xl font-medium tracking-tight font-mono flex items-baseline gap-1">
                            24.5<span className="text-zinc-500 text-sm">%</span>
                          </div>
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                          <svg
                            className="w-3.5 h-3.5 text-blue-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="relative z-10 h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-1/4 rounded-full relative">
                          <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        </div>
                      </div>
                    </div>

                    {/* Metric 2: Global Requests */}
                    <div className="bg-zinc-950/80 rounded-xl border border-white/5 p-4 sm:p-5 shadow-inner flex-1 flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05)_0%,transparent_50%)]" />
                      <div className="relative z-10 flex justify-between items-start">
                        <div>
                          <div className="text-zinc-500 text-[9px] uppercase tracking-widest font-bold mb-1.5">
                            Global Requests
                          </div>
                          <div className="text-white text-2xl font-medium tracking-tight font-mono flex items-baseline gap-1">
                            1.2<span className="text-zinc-500 text-sm">M/s</span>
                          </div>
                        </div>
                        <span className="text-green-400 text-[10px] font-semibold tracking-wide flex items-center gap-1 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                          <svg
                            className="w-2.5 h-2.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 10l7-7m0 0l7 7m-7-7v18"
                            />
                          </svg>
                          12%
                        </span>
                      </div>

                      {/* Minimalist Bar Chart Mock */}
                      <div className="relative z-10 flex items-end gap-1.5 h-12 mt-4 opacity-90">
                        {[40, 70, 45, 90, 65, 85, 100, 60, 80].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-zinc-800 rounded-t-sm hover:bg-zinc-700 transition-colors relative group/bar"
                            style={{ height: `${h}%` }}
                          >
                            {i === 6 && (
                              <div className="absolute inset-0 bg-green-500 rounded-t-sm animate-pulse" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Minimal Metric Card 1 - Left Edge */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:-left-4 lg:-left-6 p-3 bg-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-xl hidden xl:flex flex-col gap-1 transform transition-all duration-700 hover:-translate-y-1 hover:bg-zinc-900/60 shadow-2xl z-30">
                <span className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                  Latency
                </span>
                <span className="text-xl font-medium text-white tracking-tight font-mono">
                  12<span className="text-zinc-500 text-sm">ms</span>
                </span>
              </div>

              {/* Minimal Metric Card 2 - Right Edge */}
              <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-4 lg:-right-6 p-3 bg-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-xl hidden xl:flex flex-col gap-1 transform transition-all duration-700 hover:-translate-y-1 hover:bg-zinc-900/60 shadow-2xl z-30">
                <span className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                  Throughput
                </span>
                <span className="text-xl font-medium text-white tracking-tight font-mono">
                  1.4<span className="text-zinc-500 text-sm">TB/s</span>
                </span>
              </div>
            </div>
            <figcaption className="sr-only">
              Dashboard interface detailing client-facing analytics control panel modules.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
};

export default HeroSection;
