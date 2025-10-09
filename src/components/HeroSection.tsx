import React, { useId } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export type HeroStat = { label: string; value: string };

export interface HeroSectionProps {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  stats?: HeroStat[];
  avatars?: { src: string; alt?: string }[];
  heroImageSrc?: string;
  className?: string;
}

const HeroSection: FC<HeroSectionProps> = ({
  eyebrow = 'Revolutionize the way you manage your business',
  title = (
    <>
      Transform Your Business With Our{' '}
      <span className='bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>
        Solutions
      </span>
    </>
  ),
  description = 'Simplify how your business operates, communicates, and evolves — all with Zebotix’s intelligent infrastructure.',
  primaryCta = { href: '/contact', label: 'Get Started Free' },
  secondaryCta = { href: '/contact', label: 'Book Demo' },
  heroImageSrc = '/images/hero-section-image.webp',
  className = '',
}) => {
  const id = useId();
  const eyebrowId = `${id}-eyebrow`;
  const titleId = `${id}-title`;

  return (
    <section
      id='home'
      aria-labelledby={titleId}
      className={`relative bg-gradient-to-b from-zebotix-black to-[#0c0e1c] overflow-hidden min-h-[90vh] flex items-center justify-center ${className}`}
    >
      {/* Decorative glows (purely visual) */}
      <div
        aria-hidden
        className='absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-zebotix-blue opacity-10 rounded-full blur-[100px]'
      ></div>
      <div
        aria-hidden
        className='absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-blue-700 opacity-15 rounded-full blur-[80px]'
      ></div>
      <div
        aria-hidden
        className='absolute top-20 right-1/4 w-[250px] h-[250px] bg-blue-400 opacity-10 rounded-full blur-[70px]'
      ></div>

      <div className='section-container relative z-10 text-center px-4'>
        <div className='flex flex-col items-center justify-center max-w-4xl mx-auto'>
          <div className='min-h-[80vh] animate-fade-in'>
            <p
              id={eyebrowId}
              className='inline-block bg-zebotix-blue/10 text-zebotix-blue px-4 py-2 rounded-full text-sm font-medium mb-6 border border-zebotix-blue/20'
            >
              {eyebrow}
            </p>

            <h1
              id={titleId}
              className='text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight'
            >
              {title}
            </h1>

            <p className='text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto'>{description}</p>

            <div className='place-self-center flex flex-col md:flex-row max-w-md gap-4 justify-between'>
              <Link href={primaryCta.href} passHref aria-label={primaryCta.label}>
                <Button
                  asChild
                  className='bg-zebotix-blue hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200'
                >
                  <div>
                    {primaryCta.label}
                    <ArrowRight className='ml-2 h-4 w-4' aria-hidden />
                  </div>
                </Button>
              </Link>

              <Link href={secondaryCta.href} passHref>
                <Button
                  asChild
                  title={secondaryCta.label}
                  className='z-50 bg-white text-blue-600  hover:text-white'
                >
                  <span>{secondaryCta.label ?? 'Book Demo'}Book Demo</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className='mt-16 animate-fade-in' style={{ animationDelay: '0.5s' }}>
            <div className='relative max-w-4xl mx-auto'>
              <div
                aria-hidden
                className='absolute inset-0 bg-gradient-to-r from-zebotix-blue to-blue-700 blur-xl opacity-20 rounded-xl'
              ></div>

              <article
                className='relative bg-zebotix-darkGray rounded-xl border border-zebotix-blue/20 p-2 card-shadow transform transition-all duration-500 hover:scale-[1.01] hover:shadow-blue-500/10 hover:shadow-lg'
                aria-label='Dashboard preview'
              >
                {/* Use next/image for hero preview. mark as priority since it's in view. */}
                <div className='rounded-lg w-full overflow-hidden'>
                  <Image
                    src={heroImageSrc}
                    alt='Modern dashboard interface preview'
                    width={1200}
                    height={600}
                    className='w-full h-auto rounded-lg'
                    priority
                  />
                </div>

                <div className='absolute bottom-4 left-4 bg-zebotix-blue/80 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm font-medium'>
                  Modern Dashboard Interface
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      {/* Abstract shapes (decorative) */}
      <div
        aria-hidden
        className='absolute bottom-10 left-10 w-20 h-20 border border-zebotix-blue rounded-full'
      ></div>
      <div
        aria-hidden
        className='absolute top-20 right-10 w-10 h-10 border border-zebotix-blue/50 rounded-full'
      ></div>
      <div
        aria-hidden
        className='absolute top-40 left-20 w-5 h-5 bg-zebotix-blue/50 rounded-full'
      ></div>
      <div
        aria-hidden
        className='absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-zebotix-black via-zebotix-black/50 to-transparent pointer-events-none'
      ></div>
    </section>
  );
};

export default HeroSection;
