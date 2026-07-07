"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Reveal } from "@/components/animations";
import { Button } from "@/components/ui";
import { COMPANY_NAME } from "@/lib/constants";

const CtaSection = () => {
  return (
    <section
      id="cta"
      className="bg-zinc-950 py-20 md:py-28 border-t border-zinc-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <Reveal distance={40}>
          <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-16 relative overflow-hidden rounded-none select-none">
            {/* Abstract glow effects */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-none blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/3 rounded-none blur-[120px] pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-3/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-4 block">
                  Next Step
                </span>
                <h2 className="text-3xl md:text-5xl font-black mb-6 text-white leading-[1.1] uppercase tracking-tighter">
                  Build faster.
                  <br />
                  <span className="text-blue-500">Launch confidently.</span>
                </h2>
                <p className="text-zinc-400 text-sm mb-10 max-w-xl leading-relaxed">
                  {COMPANY_NAME} designs and delivers web and mobile solutions — from fast landing
                  pages and PWAs to admin panels and integrations. Get a clear plan, reliable
                  delivery, and 30-day post-launch support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-wider h-14 px-8 rounded-none border border-white/10"
                  >
                    <Link href="/quick-quote">Get a Free Quote</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-zinc-800 text-zinc-300 hover:bg-zinc-850 hover:text-white h-14 px-8 rounded-none bg-transparent"
                  >
                    <Link href="/contact">Book a Demo</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:w-2/5 w-full">
                <div className="relative border border-zinc-800 rounded-none bg-zinc-950 p-2">
                  <div className="absolute inset-0 bg-linear-to-tr from-blue-500/10 via-transparent to-transparent pointer-events-none" />
                  <Image
                    width={500}
                    height={400}
                    src="/images/hero-section-image.webp"
                    alt={`${COMPANY_NAME} dashboard preview`}
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="w-full grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700 rounded-none object-cover border border-zinc-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CtaSection;
