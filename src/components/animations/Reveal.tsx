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

      const vars: gsap.TweenVars = {
        opacity: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      };

      if (direction === 'up') vars.y = distance;
      if (direction === 'down') vars.y = -distance;
      if (direction === 'left') vars.x = distance;
      if (direction === 'right') vars.x = -distance;

      gsap.from(element, vars);
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
