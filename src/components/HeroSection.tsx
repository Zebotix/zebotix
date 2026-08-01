import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui";
import { COMPANY_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface HeroSectionProps {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  heroImageSrc?: string;
  className?: string;
}

export default function HeroSection({
  eyebrow = "Tired of software that slows you down?",
  title,
  description = `Outdated tech and manual processes cost you time and money. We eliminate bottlenecks with ${COMPANY_NAME}'s enterprise-grade IT services, custom software, and AI automation.`,
  primaryCta = { href: "/quick-quote", label: "Get a Quick Quote" },
  className = "",
}: Readonly<HeroSectionProps>) {
  return (
    <section
      id="home"
      className={cn(
        "relative bg-zinc-950 text-zinc-300 min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden flex flex-col justify-center",
        className
      )}
    >
      {/* Cinematic Radial Wash Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          tabIndex={-1}
          preload="metadata"
          poster="/images/bg-3-poster.webp"
          className={cn(
            "absolute inset-0 w-full h-full object-cover pointer-events-none z-0 transition-opacity duration-1000 opacity-40"
          )}
          style={{ willChange: "transform", transform: "translate3d(0, 0, 0)" }}
        >
          <source src="/videos/bg-3-opt.webm" type="video/webm" />
          <source src="/videos/bg-3-opt.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-start w-full">
        <div className="text-left max-w-5xl flex flex-col items-start">
          <span className="text-xs uppercase tracking-widest text-blue-500 font-black mb-6 block">
            {eyebrow}
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-6 sm:mb-8 text-white tracking-tighter leading-[1.05] max-w-5xl">
            {title || (
              <>
                Top-Tier{" "}
                <span
                  className="inline-block w-16 sm:w-24 lg:w-32 h-8 sm:h-12 lg:h-16 border border-white/10 align-middle bg-cover bg-center mx-2"
                  style={{
                    backgroundImage: "url(/images/hero-section-image.webp)",
                  }}
                />{" "}
                IT Services & Custom Software.
              </>
            )}
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-3xl leading-relaxed font-medium">
            {description}
          </p>

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
        </div>
      </div>
    </section>
  );
}
