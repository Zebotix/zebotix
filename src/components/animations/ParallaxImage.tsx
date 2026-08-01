'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import React, { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  speed?: number;
  className?: string;
  containerClassName?: string;
}

const ParallaxImage = ({
  src,
  alt,
  width,
  height,
  speed = 0.5,
  className = '',
  containerClassName = '',
}: ParallaxImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const image = imageRef.current;
      if (!container || !image) return;

      gsap.fromTo(
        image,
        { yPercent: 0 },
        {
          yPercent: 20 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative ${containerClassName}`}
      style={{ width, height }}
    >
      <div ref={imageRef} className='absolute inset-0 -top-20 h-[120%]'>
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${className}`}
          sizes='(max-width: 768px) 100vw, 50vw'
        />
      </div>
    </div>
  );
};

export default ParallaxImage;
