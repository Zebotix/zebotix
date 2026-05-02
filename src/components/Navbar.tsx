'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { COMPANY_NAME, NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import NavLink from './NavLink';
import MobileMenu from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });

      if (linksRef.current) {
        tl.from(
          linksRef.current.children,
          {
            opacity: 0,
            y: -10,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        );
      }
    },
    { scope: navRef }
  );

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-90 transition-all duration-500 border-b',
        scrolled
          ? 'bg-background/90 backdrop-blur-xl py-3 border-border shadow-2xl'
          : 'bg-transparent py-6 border-transparent'
      )}
    >
      <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-12'>
        <div className='flex justify-between items-center'>
          {/* Logo */}
          <Link href='/' className='group flex items-center gap-3' onClick={closeMenu}>
            <div className='w-10 h-10 bg-zebotix-blue rounded-xl flex items-center justify-center transform group-hover:rotate-15 transition-all duration-500 shadow-lg shadow-zebotix-blue/30'>
              <span className='text-white font-black text-2xl'>Z</span>
            </div>
            <span className='text-2xl font-black tracking-tighter text-foreground group-hover:text-zebotix-blue transition-colors'>
              {COMPANY_NAME}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div ref={linksRef} className='hidden md:flex items-center gap-2'>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                active={
                  pathname === link.href ||
                  (link.href !== '/' && pathname.includes(link.href.replace('#', '')))
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className='ml-2 pl-2 border-l border-white/10'>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={toggleMenu}
              className='p-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all border border-white/5 focus:outline-hidden'
              aria-label='Toggle menu'
            >
              <Menu className='h-6 w-6' />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} onClose={closeMenu} activePath={pathname} />
    </nav>
  );
};

export default Navbar;
