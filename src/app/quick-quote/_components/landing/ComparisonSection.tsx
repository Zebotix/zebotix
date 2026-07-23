import { X, Check } from "lucide-react";
import React from "react";

import { Reveal } from "@/components/animations";

export default function ComparisonSection() {
  const comparisons = [
    {
      feature: "Ownership & Control",
      generic: "You rent the software (SaaS). You don't own the code or your data entirely.",
      custom: "100% ownership. You own the intellectual property and the source code.",
    },
    {
      feature: "Scalability",
      generic: "Restricted by tier limits, per-user pricing, and rigid database structures.",
      custom: "Built for infinite scale. Grows exactly as your business and user base grows.",
    },
    {
      feature: "Flexibility & Features",
      generic: "You must adapt your business processes to fit how the software works.",
      custom: "The software is engineered specifically to match your unique business workflows.",
    },
    {
      feature: "Competitive Advantage",
      generic: "You are using the exact same tools and features as your direct competitors.",
      custom:
        "A proprietary system that sets you apart and delivers unique value to your customers.",
    },
  ];

  return (
    <section className="py-24 bg-zinc-950 px-6 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Why Invest in Custom Software?
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Off-the-shelf solutions are great for getting started, but they eventually become
              bottlenecks. Here's why market leaders choose custom builds.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Generic Column */}
          <Reveal delay={0.1}>
            <div className="bg-zinc-900 border border-zinc-800 p-8 flex flex-col h-full">
              <h3 className="text-2xl font-bold text-white mb-8 pb-4 border-b border-zinc-800 text-center">
                Generic Solutions
              </h3>
              <div className="space-y-8 flex-1">
                {comparisons.map((c, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 shrink-0">
                      <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                        <X className="w-3 h-3 text-red-500" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-zinc-300 font-bold mb-1 text-sm">{c.feature}</h4>
                      <p className="text-zinc-500 text-sm leading-relaxed">{c.generic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Custom Column */}
          <Reveal delay={0.2}>
            <div className="bg-linear-to-b from-blue-900/20 to-zinc-900 border border-blue-500/30 p-8 flex flex-col h-full relative overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.1)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
              <h3 className="text-2xl font-bold text-white mb-8 pb-4 border-b border-blue-500/20 text-center relative z-10">
                Custom Software by Zebotix
              </h3>
              <div className="space-y-8 flex-1 relative z-10">
                {comparisons.map((c, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 shrink-0">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-blue-100 font-bold mb-1 text-sm">{c.feature}</h4>
                      <p className="text-blue-200/70 text-sm leading-relaxed">{c.custom}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
