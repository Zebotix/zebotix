import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { type Portfolio } from "@/generated/prisma/client";

export function WorkCard({ work }: Readonly<{ work: Portfolio }>) {
  const image = work.gallery?.[0] || "/images/hero-section-image.webp";

  return (
    <article className="group relative bg-white/2 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 hover:bg-white/4 transition-all duration-500 h-full flex flex-col hover:-translate-y-1">
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-zebotix-blue/20 blur-[60px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 blur-[60px] rounded-full" />
      </div>

      <div className="block relative h-60 overflow-hidden rounded-t-3xl border-b border-white/5">
        <Image
          src={image}
          alt={work.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-90" />

        {work.industry && (
          <div className="absolute top-4 left-4">
            <span className="backdrop-blur-xl bg-black/40 border border-white/10 text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full font-bold">
              {work.industry}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 md:p-8 grow flex flex-col z-10 relative">
        <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all duration-300">
          <Link href={`/work/${work.slug}`} className="before:absolute before:inset-0">
            {work.title}
          </Link>
        </h2>

        {work.client && (
          <div className="text-zinc-400 text-sm font-medium mb-4 flex items-center">
            <div className="w-4 h-px bg-zebotix-blue mr-2" />
            Client: <span className="text-white ml-1">{work.client}</span>
          </div>
        )}

        <div 
          className="text-zinc-400 mb-6 line-clamp-3 text-sm md:text-base font-light leading-relaxed [&>p]:m-0"
          dangerouslySetInnerHTML={{ __html: work.problem || "" }}
        />

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {work.techStack.slice(0, 3).map((tech: string) => (
              <span
                key={tech}
                className="text-[11px] uppercase tracking-wider text-zinc-300 font-semibold bg-white/5 px-2.5 py-1 rounded-md border border-white/5"
              >
                {tech}
              </span>
            ))}
            {work.techStack.length > 3 && (
              <span className="text-[11px] text-zinc-500 font-semibold px-1 py-1">
                +{work.techStack.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-white/5">
            <div className="text-sm font-bold text-white group-hover:text-zebotix-blue transition-colors flex items-center">
              View Case Study
              <ArrowUpRight className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
