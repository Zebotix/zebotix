import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  const socials = {
    twitter: 'https://x.com/zebotix1499',
    facebook: 'https://www.facebook.com/people/Zebotix/61567313714101/',
    instagram: 'https://www.instagram.com/zebotix',
    github: 'https://github.com/Zebotix',
  };

  return (
    <footer className='bg-zebotix-black border-t border-gray-800 pt-16 pb-8' role='contentinfo'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-2 xl:grid-cols-4 gap-10'>
          {/* Company info */}
          <div className='col-span-2 md:col-span-1'>
            <Link href='/' className='inline-block mb-4' aria-label='Zebotix homepage'>
              <Image
                src={'/Zebotix.png'}
                alt='zebotix'
                width={500}
                height={500}
                className='w-16 h-auto'
                priority
              />
            </Link>

            <p className='text-gray-400 mb-4'>
              We build web and mobile solutions — responsive websites, PWAs, admin panels, and
              integrations that help companies scale with confidence.
            </p>

            <address className='not-italic text-gray-400 mb-4'>
              <a
                href='mailto:zebotix@gmail.com'
                className='hover:text-zebotix-blue transition-colors'
                aria-label='Email Zebotix'
              >
                zebotix@gmail.com
              </a>
              <span className='hidden sm:inline'> • </span>
              <Link
                href='/contact'
                className='hidden sm:inline text-gray-400 hover:text-zebotix-blue'
              >
                Contact
              </Link>
            </address>

            <nav aria-label='Zebotix social links' className='flex space-x-4'>
              <a
                href={socials.facebook}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Zebotix on Facebook (opens in new tab)'
                className='inline-flex items-center'
              >
                <Image
                  src={'/icons/facebook.svg'}
                  alt='Facebook'
                  width={20}
                  height={20}
                  className='rounded-full bg-gray-400 hover:bg-zebotix-blue transition-colors'
                />
              </a>

              <a
                href={socials.twitter}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Zebotix on X / Twitter (opens in new tab)'
                className='inline-flex items-center'
              >
                <Image
                  src={'/icons/x.png'}
                  alt='X / Twitter'
                  width={20}
                  height={20}
                  className='rounded-[4px] bg-gray-400 hover:bg-zebotix-blue transition-colors'
                />
              </a>

              <a
                href={socials.instagram}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Zebotix on Instagram (opens in new tab)'
                className='inline-flex items-center'
              >
                <Image
                  src={'/icons/instagram.svg'}
                  alt='Instagram'
                  width={20}
                  height={20}
                  className='rounded-[6px] bg-gray-400 hover:bg-zebotix-blue transition-colors'
                />
              </a>

              <a
                href={socials.github}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Zebotix on GitHub (opens in new tab)'
                className='inline-flex items-center'
              >
                <Image
                  src={'/icons/github.svg'}
                  alt='GitHub'
                  width={20}
                  height={20}
                  className='rounded-full bg-gray-400 hover:bg-zebotix-blue transition-colors'
                />
              </a>
            </nav>
          </div>

          {/* Quick links */}
          <nav aria-label='Quick links'>
            <h3 className='text-lg font-semibold mb-4'>Quick links</h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='#features'
                  className='text-gray-400 hover:text-zebotix-blue transition-colors'
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href='#solutions'
                  className='text-gray-400 hover:text-zebotix-blue transition-colors'
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link
                  href='#portfolio'
                  className='text-gray-400 hover:text-zebotix-blue transition-colors'
                >
                  Portolio
                </Link>
              </li>
              <li>
                <Link
                  href='#pricing'
                  className='text-gray-400 hover:text-zebotix-blue transition-colors'
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </nav>

          {/* Company links */}
          <nav aria-label='Company links'>
            <h3 className='text-lg font-semibold mb-4'>Company</h3>
            <ul className='space-y-3'>
              {/* <li>
                <Link
                  href='/blog'
                  className='text-gray-400 hover:text-zebotix-blue transition-colors'
                >
                  Blog
                </Link>
              </li> */}
              <li>
                <Link
                  href='/contact'
                  className='text-gray-400 hover:text-zebotix-blue transition-colors'
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='text-gray-400 hover:text-zebotix-blue transition-colors'
                >
                  About
                </Link>
              </li>
              {/* <li>
                <Link
                  href='/careers'
                  className='text-gray-400 hover:text-zebotix-blue transition-colors'
                >
                  Careers
                </Link>
              </li> */}
            </ul>
          </nav>

          {/* Legal links */}
          <nav aria-label='Legal links'>
            <h3 className='text-lg font-semibold mb-4'>Legal</h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/privacy'
                  className='text-gray-400 hover:text-zebotix-blue transition-colors'
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='text-gray-400 hover:text-zebotix-blue transition-colors'
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href='/cookie-policy'
                  className='text-gray-400 hover:text-zebotix-blue transition-colors'
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/gdpr'
                  className='text-gray-400 hover:text-zebotix-blue transition-colors'
                >
                  GDPR
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Copyright */}
        <div className='mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm'>
          <p>
            © {year} <span className='font-medium'>Zebotix</span>. All rights reserved.{' '}
            <span className='sr-only'>Company registration and legal disclaimers apply.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
