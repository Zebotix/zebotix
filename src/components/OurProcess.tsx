'use client';

import { Search, Compass, Cpu, CheckCircle, Ship } from 'lucide-react';
import React from 'react';

import { Reveal } from '@/components/animations';

export default function OurProcess() {
  const steps = [
    {
      step: '01',
      title: 'Discovery',
      desc: 'Deep-dive session to understand your business goals, target audience, and precise software specifications.',
      icon: <Search className="h-5 w-5 text-blue-500" />,
    },
    {
      step: '02',
      title: 'Architecture',
      desc: 'Drafting data models, database schema configurations, design systems, and visual wireframes with sharp aesthetics.',
      icon: <Compass className="h-5 w-5 text-blue-500" />,
    },
    {
      step: '03',
      title: 'Development',
      desc: 'Writing clean, type-safe Next.js code using Server Actions and modular architectures for optimum execution speed.',
      icon: <Cpu className="h-5 w-5 text-blue-500" />,
    },
    {
      step: '04',
      title: 'UAT & Audit',
      desc: 'Conducting strict performance profiling, accessibility auditing, and staging test window before deployment.',
      icon: <CheckCircle className="h-5 w-5 text-blue-500" />,
    },
    {
      step: '05',
      title: 'Launch & Scale',
      desc: 'Deploying to high-performance hosting platforms, configuring dynamic SEO setups, and enabling GDPR compliance.',
      icon: <Ship className="h-5 w-5 text-blue-500" />,
    },
  ];

  return (
    <section
      id="process"
      className="bg-zinc-950 py-20 md:py-28 border-t border-zinc-900 overflow-hidden"
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-24">
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-blue-500 font-black mb-4 block">
              Methodology
            </span>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 id="process-heading" className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tighter">
              Engineered Execution
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-zinc-400 text-lg leading-relaxed">
              We follow a streamlined, highly structured workflow to turn your ambitious ideas into enterprise-grade applications.
            </p>
          </Reveal>
        </div>

        <div className="border-t border-l border-zinc-900 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((item, index) => (
            <Reveal
              key={index}
              delay={0.1 * index}
              distance={20}
              className="h-full"
            >
              <div className="border-r border-b border-zinc-900 p-6 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[280px] hover:bg-zinc-900/10 transition-colors group duration-300 relative select-none rounded-none">
                <div className="flex justify-between items-center w-full">
                  <span className="text-xs font-mono font-black text-zinc-400 tracking-wider">
                    STEP {item.step}
                  </span>
                  <div className="w-8 h-8 bg-zinc-900 border border-zinc-850 flex items-center justify-center group-hover:border-blue-500/35 transition-colors duration-300">
                    {item.icon}
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-lg font-black text-white mb-3 group-hover:text-blue-500 transition-colors uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
