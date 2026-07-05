'use client';

import { Flame, ShieldCheck, Users, Rocket } from 'lucide-react';
import React from 'react';

export default function TrustedBy() {
  const badges = [
    { label: 'Startup Friendly', icon: <Flame className="h-5 w-5 text-blue-500" /> },
    { label: 'Enterprise Ready', icon: <ShieldCheck className="h-5 w-5 text-blue-500" /> },
    { label: 'Remote Team', icon: <Users className="h-5 w-5 text-blue-500" /> },
    { label: 'Fast Delivery', icon: <Rocket className="h-5 w-5 text-blue-500" /> },
  ];

  // Repeat items to fill marquee width seamlessly
  const repeatedBadges = [...badges, ...badges, ...badges, ...badges];

  return (
    <section className="bg-zinc-950 py-6 sm:py-10 border-y border-zinc-900 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 relative flex items-center overflow-hidden">
        {/* Gradients on edges for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-8 sm:gap-16 animate-marquee whitespace-nowrap min-w-full">
          {repeatedBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 sm:gap-3 text-zinc-400 font-bold uppercase tracking-wider text-xs sm:text-sm select-none"
            >
              {badge.icon}
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
