'use client';

import { ArrowRight, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Reveal } from '@/components/animations';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  image: string | null;
  publishedAt: Date | string | null;
}

interface BlogSectionProps {
  blogs: BlogPost[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <section
      id="blogs"
      className="bg-zinc-950 py-20 md:py-28 border-t border-zinc-900 overflow-hidden"
      aria-labelledby="blogs-heading"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-20">
          <div>
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-blue-500 font-black mb-4 block">
                Resources
              </span>
            </Reveal>
            <Reveal delay={0.15}>
              <h2 id="blogs-heading" className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tighter uppercase">
                Latest Insights
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                Explore our thoughts on engineering high-performance software, AI workflows, and digital design patterns.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.4} className="mt-6 md:mt-0">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white font-bold hover:text-blue-500 transition-colors group text-sm uppercase tracking-wider"
            >
              Read All Articles
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {blogs.slice(0, 3).map((blog, index) => {
            const formattedDate = blog.publishedAt
              ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : '';

            return (
              <Reveal key={blog.id} delay={0.1 * index} distance={30} className="h-full">
                <article className="bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between h-full hover:border-blue-500/35 transition-all duration-300 group rounded-none select-none relative overflow-hidden">
                  <Link href={`/blog/${blog.slug}`} className="block">
                    <div className="relative h-48 w-full bg-zinc-950 overflow-hidden border-b border-zinc-850">
                      {blog.image ? (
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-103 transition-transform duration-700 grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center text-zinc-550 font-black text-xs uppercase tracking-widest">
                          Zebotix Blog
                        </div>
                      )}
                    </div>
                    <div className="p-5 sm:p-8">
                      <div className="flex gap-4 items-center text-[10px] font-black uppercase tracking-wider text-zinc-550 mb-4">
                        {formattedDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-blue-500" />
                            {formattedDate}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3 text-blue-500" />
                          {blog.author}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-white mb-3 group-hover:text-blue-500 transition-colors leading-tight uppercase tracking-tight">
                        {blog.title}
                      </h3>
                      <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>
                  </Link>
                  <div className="px-5 sm:px-8 pb-5 sm:pb-8 pt-0 border-t border-zinc-850/50 mt-4">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="text-white group-hover:text-blue-500 font-bold transition-colors flex items-center gap-2 text-xs uppercase tracking-wider"
                    >
                      Read Article <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
