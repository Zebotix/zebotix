import React from "react";

import { Reveal } from "@/components/animations";

export default function SocialProof() {
  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "100+", label: "Projects Completed" },
    { value: "24/7", label: "Premium Support" },
    { value: "12+", label: "Industries Served" },
  ];

  return (
    <section className="py-24 bg-zinc-950 px-6 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Trusted by Ambitious Teams
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              We've partnered with startups, SMEs, and enterprises globally to deliver
              transformative digital products.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-zinc-500 font-medium text-sm tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500" />
            <div className="text-6xl text-zinc-800 font-serif absolute top-4 left-6 leading-none select-none">
              "
            </div>
            <p className="text-xl md:text-2xl text-zinc-300 italic leading-relaxed relative z-10 font-medium max-w-3xl">
              Zebotix completely transformed how we approach our technical architecture. They didn't
              just build what we asked for—they challenged our assumptions and delivered a system
              that is incredibly fast, secure, and ready for our next phase of growth.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-white">
                CTO
              </div>
              <div>
                <div className="text-white font-bold">Tech Leadership</div>
                <div className="text-zinc-500 text-sm">Enterprise SaaS Client</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
