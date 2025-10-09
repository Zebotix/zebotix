'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const portfolios = [
  {
    title: 'Zebotix E-Commerce',
    slug: 'zebotix-ecommerce',
    summary:
      'A fast, responsive e-commerce storefront with CMS-driven product pages and Stripe checkout.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60',
    tags: ['E-commerce', 'Stripe', 'PWA'],
  },
  {
    title: 'TeamTracker App',
    slug: 'teamtracker-app',
    summary:
      'Project & task dashboard with role-based access, progress tracking and real-time updates.',
    image:
      'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?auto=format&fit=crop&w=800&q=60',
    tags: ['Dashboard', 'Auth', 'Realtime'],
  },
  {
    title: 'LocalBiz Landing',
    slug: 'localbiz-landing',
    summary:
      '10-page responsive website for a local business with lead capture and performance optimizations.',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60',
    tags: ['Responsive', 'SEO', 'Lead Capture'],
  },
];

const PortfolioCard = ({
  item,
}: {
  item: {
    title: string;
    slug: string;
    summary: string;
    image: string;
    tags: string[];
  };
}) => (
  <article className='bg-gradient-to-b from-zebotix-darkGray to-zebotix-black border border-gray-800 rounded-xl overflow-hidden shadow-sm'>
    <Link
      href={`/portfolios/${item.slug}`}
      className='block'
      aria-label={`Open ${item.title} project`}
    >
      <div className='w-full h-44 md:h-40 lg:h-48 overflow-hidden bg-gray-900'>
        <img
          src={item.image}
          alt={item.title}
          loading='lazy'
          className='w-full h-full object-cover transform hover:scale-105 transition-transform duration-300'
        />
      </div>

      <div className='p-5'>
        <h3 className='text-lg font-semibold text-white mb-1'>{item.title}</h3>
        <p className='text-gray-300 text-sm mb-3'>{item.summary}</p>

        <div className='flex flex-wrap gap-2 mb-4'>
          {item.tags.map((t) => (
            <span
              key={t}
              className='text-xs px-2 py-1 rounded bg-white/5 text-gray-300 border border-transparent'
            >
              {t}
            </span>
          ))}
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-xs text-gray-400'>Case study</span>
          <span className='text-xs text-zebotix-blue font-medium'>View project →</span>
        </div>
      </div>
    </Link>
  </article>
);

const PortfolioSection = () => {
  return (
    <section
      id='portfolio'
      className='bg-zebotix-black py-16 md:py-24'
      aria-labelledby='portfolio-heading'
    >
      <div className='section-container'>
        <div className='flex items-center justify-between mb-8'>
          <div className='max-w-2xl'>
            <h2 id='portfolio-heading' className='text-3xl md:text-4xl font-bold mb-2'>
              Selected <span className='gradient-text'>Portfolio</span>
            </h2>
            <p className='text-gray-400'>
              Small selection of recent projects. Click a card to view the case study or see all
              projects.
            </p>
          </div>

          <div className='hidden sm:block'>
            <Link href='/portfolios' aria-label='See all portfolios'>
              <Button className='bg-zebotix-blue hover:bg-blue-600 text-white'>See all</Button>
            </Link>
          </div>
        </div>

        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' role='list'>
          {portfolios.map((p) => (
            <li key={p.slug}>
              <PortfolioCard item={p} />
            </li>
          ))}
        </ul>

        {/* Mobile "See all" placed below grid for easier reach */}
        <div className='mt-8 sm:hidden text-center'>
          <Link href='/portfolios' aria-label='See all portfolios'>
            <Button className='bg-zebotix-blue hover:bg-blue-600 text-white'>See all</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
