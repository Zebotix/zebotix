import { ArrowRight, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { type BlogPost } from "@/generated/prisma/client";

export function BlogCard({ post }: Readonly<{ post: BlogPost }>) {
  return (
    <article className="group bg-[#0B0F19] rounded-3xl overflow-hidden border border-white/5 hover:border-zebotix-blue/20 hover:-translate-y-1 hover:shadow-[0_8px_30px_-15px_rgba(59,130,246,0.1)] transition-all duration-500 h-full flex flex-col relative">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-zebotix-blue/5 blur-[50px] -z-10 group-hover:bg-zebotix-blue/10 transition-colors duration-500 rounded-full" />
      
      <Link href={`/blog/${post.slug}`} className="block relative h-56 overflow-hidden m-2 rounded-2xl">
        <Image
          src={post.image || "/images/hero-section-image.webp"}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
      </Link>
      
      <div className="p-6 md:p-8 grow flex flex-col z-10">
        <div className="flex gap-3 mb-5 flex-wrap items-center">
          {post.category && (
            <span className="text-[11px] uppercase tracking-widest text-zebotix-blue bg-zebotix-blue/10 px-3 py-1.5 rounded-full font-black border border-zebotix-blue/20">
              {post.category}
            </span>
          )}
          {post.tags.slice(0, 1).map((tag: string) => (
            <span
              key={tag}
              className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-400 group-hover:to-blue-600 transition-all duration-300 line-clamp-2 leading-tight">
          <Link href={`/blog/${post.slug}`} className="before:absolute before:inset-0">
            {post.title}
          </Link>
        </h2>
        
        <p className="text-gray-400/90 mb-8 line-clamp-3 leading-relaxed text-sm md:text-base font-light">
          {post.excerpt}
        </p>
        
        <div className="mt-auto flex items-center justify-between pt-5 border-t border-white/5">
          <div className="flex items-center text-xs text-gray-500 font-medium">
            <CalendarDays className="w-3.5 h-3.5 mr-1.5 opacity-70" />
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Draft"}
          </div>
          <div
            className="flex items-center text-sm font-bold text-white group-hover:text-zebotix-blue transition-colors duration-300"
          >
            Read More
            <ArrowRight className="w-4 h-4 ml-1.5 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
          </div>
        </div>
      </div>
    </article>
  );
}
