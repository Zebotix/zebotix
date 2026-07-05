'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';

import { Reveal } from '@/components/animations';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesSection() {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);

  const statement = 
    "We build high-performance software, automated workflows, and custom e-commerce experiences that transform how modern companies scale. By combining robust database architectures, type-safe Next.js systems, and zero-compromise design systems, we deliver digital platforms that operate with absolute speed and reliability.";

  const words = statement.split(' ');

  useGSAP(
    () => {
      if (!wordsRef.current) return;

      gsap.fromTo(
        wordsRef.current.children,
        {
          opacity: 0.08,
          y: 5,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: 'top 80%',
            end: 'bottom 35%',
            scrub: 1,
          },
        }
      );
    },
    { scope: textContainerRef }
  );

  return (
    <section
      ref={textContainerRef}
      id="features"
      className="bg-zinc-950 py-20 md:py-28 border-t border-zinc-900 overflow-hidden flex flex-col justify-center min-h-[60vh]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-12">
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-blue-500 font-black mb-4 block">
              Our Statement
            </span>
          </Reveal>
        </div>

        <p
          ref={wordsRef}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.25] tracking-tight select-none"
        >
          {words.map((word, index) => (
            <span
              key={index}
              className="inline-block mr-2 sm:mr-3 md:mr-4 transition-all duration-300 will-change-transform"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
