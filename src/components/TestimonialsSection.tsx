"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Reveal } from "@/components/animations";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string | null;
  content: string;
  rating: number;
  avatar: string | null;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: Readonly<TestimonialsSectionProps>) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="bg-zinc-950 py-20 md:py-28 border-t border-zinc-900 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-24">
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-blue-500 font-black mb-4 block">
              Validation
            </span>
          </Reveal>
          <Reveal delay={0.15}>
            <h2
              id="testimonials-heading"
              className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tighter"
            >
              Trusted by Innovators
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Hear from startup founders and enterprise leaders who trust Zebotix to deliver
              exceptional digital platforms.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <Reveal key={t.id} delay={0.1 * (index % 3)} distance={30} className="h-full">
              <div className="bg-zinc-900/40 p-8 border border-zinc-800 h-full flex flex-col justify-between hover:border-blue-500/35 transition-colors duration-300 rounded-none relative overflow-hidden group select-none">
                <div>
                  <div
                    className="flex gap-1 mb-6"
                    role="img"
                    aria-label={`Rating: ${t.rating} stars`}
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < t.rating ? "text-blue-500 fill-blue-500" : "text-zinc-800"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-zinc-350 leading-relaxed italic mb-8 text-sm">"{t.content}"</p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-zinc-850">
                  {t.avatar ? (
                    <div className="relative h-12 w-12 overflow-hidden border border-zinc-850 rounded-none bg-zinc-950">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 bg-zinc-950 border border-zinc-850 flex items-center justify-center font-black text-white text-xs rounded-none">
                      {t.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="text-white font-black text-sm uppercase tracking-tight mb-1">
                      {t.name}
                    </h3>
                    <p className="text-zinc-550 text-[10px] font-black uppercase tracking-wider">
                      {t.role} {t.company ? `at ${t.company}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
