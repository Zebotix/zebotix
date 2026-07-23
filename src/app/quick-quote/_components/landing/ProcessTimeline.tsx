import React from "react";

import { Reveal } from "@/components/animations";

export default function ProcessTimeline() {
  const steps = [
    {
      name: "Discovery",
      desc: "Understanding your business goals, target audience, and core requirements.",
    },
    {
      name: "Planning",
      desc: "Creating a detailed project roadmap, technology selection, and milestone definition.",
    },
    {
      name: "UI/UX Design",
      desc: "Crafting intuitive wireframes, interactive prototypes, and premium visual interfaces.",
    },
    {
      name: "Architecture",
      desc: "Designing scalable database schemas, API structures, and cloud infrastructure.",
    },
    {
      name: "Development",
      desc: "Writing clean, secure, and performant code in agile two-week sprints.",
    },
    {
      name: "Testing",
      desc: "Rigorous QA including automated tests, security audits, and user acceptance testing.",
    },
    {
      name: "Deployment",
      desc: "Seamless launch to production servers with zero downtime and full observability.",
    },
    {
      name: "Support",
      desc: "Continuous monitoring, iterative feature updates, and long-term maintenance.",
    },
  ];

  return (
    <section className="py-24 bg-zinc-950 px-6 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Our Development Process
            </h2>
            <p className="text-zinc-400 text-lg">
              We follow a structured, transparent, and battle-tested methodology to ensure your
              project is delivered on time, securely, and to specification.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div
                  className={`relative flex items-start md:items-center ${idx % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"} flex-col md:gap-8`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-zinc-950 border-2 border-blue-500 rounded-full transform -translate-x-1/2 md:translate-x-[-50%] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  </div>

                  {/* Content Box */}
                  <div className="ml-12 md:ml-0 md:w-1/2 p-6 bg-zinc-900/50 border border-zinc-800 rounded-sm hover:border-blue-500/30 transition-colors">
                    <span className="text-blue-500 font-black text-sm uppercase tracking-widest block mb-2">
                      Phase 0{idx + 1}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{step.name}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>

                  {/* Empty space for the other half */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
