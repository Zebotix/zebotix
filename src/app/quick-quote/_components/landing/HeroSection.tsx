"use client";

import { CheckCircle2, ArrowRight } from "lucide-react";
import React from "react";

import { Reveal } from "@/components/animations";
import { Button } from "@/components/ui/Button";

export default function HeroSection() {
  const benefits = [
    "Free Project Consultation",
    "Response within 24 Hours",
    "Custom Software Experts",
    "No Upfront Commitment",
  ];

  const scrollToEstimator = () => {
    const el = document.getElementById("estimator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-zinc-950 to-zinc-950 -z-10" />

      <Reveal>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          Accepting New Projects
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          Transform Your Vision Into{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
            Scalable Reality
          </span>
        </h1>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Get a professional, transparent estimate for your custom software project. We build
          enterprise-grade applications designed for growth, security, and performance.
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-2 text-zinc-300">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <span className="font-medium text-sm md:text-base">{benefit}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.4}>
        <Button
          onClick={scrollToEstimator}
          className="group relative inline-flex items-center justify-center gap-3 bg-white text-zinc-950 px-8 h-14 text-lg font-bold transition-all hover:bg-zinc-200 rounded-xl"
        >
          Start Your Project Estimation
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Reveal>
    </section>
  );
}
