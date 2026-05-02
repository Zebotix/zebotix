'use client';

import React, { FC, useId } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { COMPANY_NAME } from '@/lib/constants';
import { Reveal } from '@/components/animations';

export type HeroStat = { label: string; value: string };

export interface HeroSectionProps {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  heroImageSrc?: string;
  className?: string;
}

const HeroSection: FC<HeroSectionProps> = ({
  eyebrow = 'Revolutionize the way you manage your business',
  title = (
    <>
      Transform Your Business With Our{' '}
      <span className='bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>
        Solutions
      </span>
    </>
  ),
  description = `Simplify how your business operates, communicates, and evolves — all with ${COMPANY_NAME}’s intelligent infrastructure.`,
  primaryCta = { href: '/contact', label: 'Get Started Free' },
  secondaryCta = { href: '/contact', label: 'Book Demo' },
  heroImageSrc = '/images/hero-section-image.webp',
  className = '',
}) => {
  const id = useId();
  const eyebrowId = `${id}-eyebrow`;
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;

  return (
    <section
      id='home'
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className={cn(
        'relative bg-linear-to-b from-zebotix-black to-[#0c0e1c] overflow-hidden min-h-[90vh] flex items-center justify-center',
        className
      )}
    >
      {/* Decorative glows - marked as decorative for accessibility */}
      <div
        aria-hidden='true'
        className='absolute top-1/3 left-1/2 -translate-x-1/2 w-125 h-125 bg-zebotix-blue opacity-10 rounded-full blur-[100px]'
      ></div>
      <div
        aria-hidden='true'
        className='absolute bottom-0 left-1/4 w-75 h-75 bg-blue-700 opacity-15 rounded-full blur-[80px]'
      ></div>

      <div className='section-container relative z-10 text-center px-4'>
        <div className='flex flex-col items-center justify-center max-w-4xl mx-auto'>
          <div className='min-h-[80vh] flex flex-col items-center justify-center'>
            <Reveal delay={0.2} distance={20}>
              <p
                id={eyebrowId}
                className='inline-block bg-zebotix-blue/10 text-zebotix-blue px-4 py-2 rounded-full text-sm font-medium mb-6 border border-zebotix-blue/20'
              >
                {eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <h1
                id={titleId}
                className='text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white'
              >
                {title}
              </h1>
            </Reveal>

            <Reveal delay={0.6}>
              <p
                id={descriptionId}
                className='text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto'
              >
                {description}
              </p>
            </Reveal>

            <Reveal delay={0.8} distance={30}>
              <div className='flex flex-col md:flex-row gap-4 justify-center'>
                <Button
                  asChild
                  size='lg'
                  className='bg-zebotix-blue hover:bg-blue-600 text-white font-semibold rounded-lg h-12 px-8'
                >
                  <Link href={primaryCta.href}>
                    {primaryCta.label}
                    <ArrowRight className='ml-2 h-5 w-5' aria-hidden='true' />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant='outline'
                  size='lg'
                  className='h-12 px-8 border-white/20 text-white hover:bg-white/10'
                >
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={1} distance={50} className='w-full mt-16'>
            <div className='relative max-w-4xl mx-auto'>
              <div
                aria-hidden='true'
                className='absolute inset-0 bg-linear-to-r from-zebotix-blue to-blue-700 blur-2xl opacity-20 rounded-xl'
              ></div>

              <figure className='relative bg-zebotix-darkGray rounded-xl border border-zebotix-blue/20 p-2 shadow-2xl transform transition-all duration-500 hover:scale-[1.01]'>
                <div className='rounded-lg w-full overflow-hidden'>
                  <Image
                    src={heroImageSrc}
                    alt='Modern dashboard interface preview showing real-time analytics and data management'
                    width={1200}
                    height={600}
                    sizes='(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px'
                    className='w-full h-auto rounded-lg'
                    priority
                    loading='eager'
                  />
                </div>
                <figcaption className='sr-only'>
                  Dashboard preview demonstrating {COMPANY_NAME}&apos;s interface for business
                  management
                </figcaption>
              </figure>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
