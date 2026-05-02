'use client';

import React, { useRef } from 'react';
import { Button } from '@/components/ui';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { SOLUTIONS, PLATFORMS } from '@/lib/constants';
import { Reveal } from '@/components/animations';
import Link from 'next/link';

const HorizontalCarousel = ({ items }: { items: typeof SOLUTIONS }) => {
  const ref = useRef<HTMLUListElement>(null);

  const scroll = (dir: 'left' | 'right' = 'right') => {
    const el = ref.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <div className='relative group/carousel'>
      <div className='flex items-center gap-4'>
        <Button
          onClick={() => scroll('left')}
          variant='outline'
          size='icon'
          className='hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-zebotix-black/80 backdrop-blur-xs border-white/10 hover:border-zebotix-blue text-white rounded-full'
          aria-label='Scroll left'
        >
          <ChevronLeft className='h-6 w-6' />
        </Button>

        <ul
          ref={ref}
          className='flex gap-6 overflow-x-auto py-8 px-2 no-scrollbar touch-pan-x snap-x snap-mandatory'
          aria-label='Products carousel'
        >
          {items?.map((s, i) => (
            <li
              key={i}
              className='flex flex-col justify-between min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] snap-center bg-linear-to-br from-zebotix-darkGray to-zebotix-black rounded-3xl p-8 border border-gray-800 hover:border-zebotix-blue/40 transition-all duration-500 shadow-xl group/card'
            >
              <div>
                <h3 className='text-2xl font-bold text-white mb-3 group-hover/card:text-zebotix-blue transition-colors'>
                  {s.title}
                </h3>
                <p className='text-gray-400 leading-relaxed mb-6'>{s.subtitle}</p>

                <ul className='space-y-3 mb-8'>
                  {s.products.slice(0, 3).map((p, pi) => (
                    <li key={pi} className='flex items-start gap-3 text-sm text-gray-300'>
                      <span className='w-1.5 h-1.5 rounded-full bg-zebotix-blue mt-2 shrink-0' />
                      <span>{p.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='pt-6 border-t border-white/5'>
                <Button
                  asChild
                  variant='ghost'
                  className='w-full justify-between hover:bg-zebotix-blue hover:text-white group/btn'
                >
                  <Link href={`/solutions/${s.id}`}>
                    Explore Solution
                    <ArrowRight className='h-4 w-4 group-hover/btn:translate-x-1 transition-transform' />
                  </Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <Button
          onClick={() => scroll('right')}
          variant='outline'
          size='icon'
          className='hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-zebotix-black/80 backdrop-blur-xs border-white/10 hover:border-zebotix-blue text-white rounded-full'
          aria-label='Scroll right'
        >
          <ChevronRight className='h-6 w-6' />
        </Button>
      </div>
    </div>
  );
};

const ProductsCarouselSection = () => {
  return (
    <section
      id='solutions'
      className='bg-zebotix-black py-16 md:py-24 overflow-hidden'
      aria-labelledby='solutions-heading'
    >
      <div className='section-container'>
        <div className='mb-12'>
          <Reveal>
            <h2 id='solutions-heading' className='text-3xl md:text-5xl font-bold mb-4 text-white'>
              Scalable{' '}
              <span className='bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>
                Business Solutions
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className='text-gray-400 text-lg max-w-3xl'>
              Practical digital infrastructure designed to dominate markets. From niche e-commerce
              to enterprise ERPs, we build the tools that power growth.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.4} distance={40}>
          <HorizontalCarousel items={SOLUTIONS} />
        </Reveal>

        <div className='mt-24'>
          <Reveal>
            <h3 className='text-2xl font-bold mb-8 text-white'>
              Platforms & Ecosystems <span className='text-zebotix-blue'>We Architect</span>
            </h3>
          </Reveal>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {PLATFORMS.map((p, i) => (
              <Reveal key={p.id} delay={0.05 * i} distance={20}>
                <div className='bg-zebotix-darkGray rounded-xl p-5 border border-gray-800 text-gray-300 hover:border-zebotix-blue/30 hover:bg-zebotix-blue/5 transition-all duration-300 flex items-center justify-between group'>
                  <span className='font-medium'>{p.title}</span>
                  <ArrowRight className='h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2.5 group-hover:translate-x-0 transition-all text-zebotix-blue' />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.6} className='mt-16 text-center'>
          <div className='p-12 rounded-3xl bg-linear-to-r from-blue-900/20 to-transparent border border-blue-500/10'>
            <h4 className='text-2xl font-bold text-white mb-4'>Ready to digitize your vision?</h4>
            <p className='text-gray-400 mb-8 max-w-xl mx-auto'>
              Book a consultation with our technology architects to map out your digital roadmap.
            </p>
            <Button
              asChild
              size='lg'
              className='bg-zebotix-blue hover:bg-blue-600 px-10 h-14 text-lg font-semibold'
            >
              <Link href='/contact'>Talk to an Expert</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ProductsCarouselSection;
