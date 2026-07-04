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
            src="/videos/bg-3.mp4"
          />
        )}
        <div
          ref={glowRef}
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-blue-600/10 rounded-full blur-[120px] will-change-transform z-10"
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
        <Reveal delay={0.7} distance={40} className="w-full mt-12 sm:mt-16 md:mt-24">
          <figure
            ref={imageFigureRef}
            className="relative border border-zinc-800 p-2 bg-zinc-950/80 shadow-[0_0_80px_-20px_rgba(59,130,246,0.15)] will-change-transform overflow-hidden group max-w-5xl mx-auto"
          >
            <div className="w-full overflow-hidden relative aspect-video md:aspect-[21/9]">
              <Image
                src={heroImageSrc}
                alt="Interactive dashboard preview showing analytical workflows and system automation modules"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-102"
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent flex flex-col items-center justify-end pb-8 text-center" />
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
