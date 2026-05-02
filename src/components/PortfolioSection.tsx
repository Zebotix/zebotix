'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PORTFOLIOS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/animations';
import { ArrowRight } from 'lucide-react';

type PortfolioItem = (typeof PORTFOLIOS)[number];

const PortfolioCard = ({ item }: { item: PortfolioItem }) => (
  <article className='bg-linear-to-b from-zebotix-darkGray to-zebotix-black border border-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:border-zebotix-blue/40 transition-all duration-500 group'>
    <Link
      href={`/work/${item.slug}`}
      className='block'
      aria-label={`Open ${item.title} project`}
    >
      <div className='relative w-full h-56 overflow-hidden bg-gray-900'>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='object-cover transform group-hover:scale-110 transition-transform duration-700'
        />
        <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6'>
          <span className='text-white font-medium flex items-center gap-2'>
            View Case Study <ArrowRight className='h-4 w-4' />
          </span>
        </div>
      </div>

      <div className='p-6'>
        <div className='flex flex-wrap gap-2 mb-4'>
          {item.tags.map((t) => (
            <span
              key={t}
              className='text-[10px] uppercase tracking-widest px-2 py-1 rounded-md bg-zebotix-blue/10 text-zebotix-blue border border-zebotix-blue/20'
            >
              {t}
            </span>
          ))}
        </div>
        
        <h3 className='text-2xl font-bold text-white mb-2 group-hover:text-zebotix-blue transition-colors'>
          {item.title}
        </h3>
        <p className='text-gray-400 leading-relaxed line-clamp-2'>{item.summary}</p>
      </div>
    </Link>
  </article>
);

const PortfolioSection = () => {
  return (
    <section
      id='portfolio'
      className='bg-zebotix-black py-16 md:py-24 overflow-hidden'
      aria-labelledby='portfolio-heading'
    >
      <div className='section-container'>
        <div className='mb-16'>
          <Reveal>
            <h2 id='portfolio-heading' className='text-3xl md:text-5xl font-bold mb-4 text-white'>
              Selected <span className='bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>Portfolio</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className='text-gray-400 text-lg max-w-2xl'>
              A showcase of our recent work in AI, e-commerce, and custom software development. 
              We turn complex problems into elegant digital experiences.
            </p>
          </Reveal>
        </div>

        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' role='list'>
          {PORTFOLIOS.map((p, index) => (
            <li key={p.slug}>
              <Reveal delay={0.1 * index} distance={40}>
                <PortfolioCard item={p} />
              </Reveal>
            </li>
          ))}
        </ul>
        
        <Reveal delay={0.5} className="mt-16 text-center">
          <Link 
            href="/work" 
            className="inline-flex items-center gap-2 text-white font-semibold hover:text-zebotix-blue transition-colors group"
          >
            View All Projects 
            <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default PortfolioSection;
