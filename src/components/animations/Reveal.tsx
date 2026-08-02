'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

const Reveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 1,
  distance = 50,
  className = '',
}: RevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = containerRef.current;
      if (!element) return;

      const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
      if (isBot) return;

      const fromVars: gsap.TweenVars = { opacity: 0 };
      const toVars: gsap.TweenVars = {
        opacity: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      };

      if (direction === 'up') {
        fromVars.y = distance;
        toVars.y = 0;
      }
      if (direction === 'down') {
        fromVars.y = -distance;
        toVars.y = 0;
      }
      if (direction === 'left') {
        fromVars.x = distance;
        toVars.x = 0;
      }
      if (direction === 'right') {
        fromVars.x = -distance;
        toVars.x = 0;
      }

      gsap.fromTo(element, fromVars, toVars);
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default Reveal;
