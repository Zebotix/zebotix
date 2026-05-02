'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { COMPANY_NAME, SOCIAL_LINKS, NAV_LINKS, CONTACT_EMAIL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/animations';

const Footer = () => {
  const year = new Date().getFullYear();

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'GDPR', href: '/gdpr' },
  ];

  const companyLinks = [
    { name: 'Contact', href: '/contact' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <footer
      className='bg-zebotix-black border-t border-white/5 pt-20 pb-10 overflow-hidden'
      role='contentinfo'
    >
      <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8'>
          {/* Company info */}
          <Reveal distance={30} className='col-span-1 sm:col-span-2 lg:col-span-1'>
            <div>
              <Link
                href='/'
                className='inline-block mb-8 group'
                aria-label={`${COMPANY_NAME} homepage`}
              >
                <Image
                  src='/Zebotix.png'
                  alt={COMPANY_NAME}
                  width={80}
                  height={80}
                  sizes='80px'
                  className='w-20 h-auto grayscale brightness-200 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500'
                />
              </Link>

              <p className='text-gray-400 mb-8 text-base leading-relaxed max-w-sm'>
                Empowering businesses with intelligent software & AI solutions. We architect digital
                products that scale with your vision.
              </p>

              <address className='not-italic mb-8'>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className='text-white hover:text-zebotix-blue font-medium transition-colors block text-lg'
                  aria-label={`Email ${COMPANY_NAME}`}
                >
                  {CONTACT_EMAIL}
                </a>
              </address>

              <nav aria-label={`${COMPANY_NAME} social links`} className='flex space-x-6'>
                {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={`${COMPANY_NAME} on ${platform} (opens in new tab)`}
                    className='text-gray-500 hover:text-white transition-all transform hover:scale-110'
                  >
                    <Image
                      src={`/icons/${platform === 'twitter' ? 'x' : platform}${platform === 'twitter' ? '.png' : '.svg'}`}
                      alt=''
                      aria-hidden='true'
                      width={24}
                      height={24}
                      sizes='24px'
                      className={cn(
                        'w-6 h-6 grayscale brightness-150 hover:grayscale-0 hover:brightness-100 transition-all opacity-60 hover:opacity-100',
                        platform === 'twitter' ? 'rounded-[4px]' : 'rounded-full'
                      )}
                    />
                  </a>
                ))}
              </nav>
            </div>
          </Reveal>

          {/* Solutions links */}
          <Reveal delay={0.1} distance={30}>
            <nav aria-label='Quick links'>
              <h3 className='text-white font-black text-xs uppercase tracking-widest mb-8'>
                Solutions
              </h3>
              <ul className='space-y-4'>
                {NAV_LINKS.filter((link) => link.href.startsWith('#')).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-gray-500 hover:text-zebotix-blue transition-colors text-sm font-medium'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          {/* Company links */}
          <Reveal delay={0.2} distance={30}>
            <nav aria-label='Company links'>
              <h3 className='text-white font-black text-xs uppercase tracking-widest mb-8'>
                Company
              </h3>
              <ul className='space-y-4'>
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-gray-500 hover:text-zebotix-blue transition-colors text-sm font-medium'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          {/* Legal links */}
          <Reveal delay={0.3} distance={30}>
            <nav aria-label='Legal links'>
              <h3 className='text-white font-black text-xs uppercase tracking-widest mb-8'>
                Legal
              </h3>
              <ul className='space-y-4'>
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-gray-500 hover:text-zebotix-blue transition-colors text-sm font-medium'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>

        {/* Copyright */}
        <Reveal delay={0.5} className='mt-20 pt-10 border-t border-white/5'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
            <p className='text-gray-500 text-xs tracking-widest uppercase'>
              © {year} <span className='text-white font-black'>{COMPANY_NAME}</span>. ALL RIGHTS
              RESERVED.
            </p>
            <div className='flex gap-8'>
              <p className='text-[10px] text-gray-600 uppercase tracking-widest'>
                Designed by Zebotix Studio
              </p>
              <p className='text-[10px] text-gray-600 uppercase tracking-widest'>
                Built with Next.js 16 + React 19
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
