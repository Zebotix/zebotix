import React from "react";

import { Reveal } from "@/components/animations";

export default function TechnologiesGrid() {
  const techs = [
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "Supabase",
    "Docker",
    "AWS",
    "OpenAI",
    "Claude",
    "Google Cloud",
    "Azure",
    "Redis",
    "Tailwind CSS",
    "Framer Motion",
  ];

  return (
    <section className="py-24 bg-zinc-950 px-6 border-t border-zinc-900 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Powered by Premium Tech
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              We leverage modern, enterprise-grade technologies to build scalable, high-performance
              applications that stand the test of time.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
          {techs.map((tech, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <div className="bg-zinc-900 border border-zinc-800 px-6 py-4 flex items-center justify-center hover:border-blue-500/50 hover:bg-blue-500/5 hover:-translate-y-1 transition-all duration-300 cursor-default">
                <span className="text-zinc-300 font-bold text-sm md:text-base tracking-wide">
                  {tech}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
