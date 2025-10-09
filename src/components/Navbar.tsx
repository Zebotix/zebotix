'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const location = usePathname();

  // Function to check if a link is active
  const isActive = (path: string) => {
    const active = location === path;
    console.log(location, path, active);
    return active;
  };

  return (
    <nav className='bg-zebotix-black bg-opacity-90 backdrop-blur-sm sticky top-0 z-50 border-b border-zebotix-darkGray'>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='w-full flex justify-between h-16 items-center'>
          {/* Logo */}
          <div className='flex-shrink-0 flex items-center'>
            <Link href='/' className='flex items-center'>
              <span className='text-2xl font-bold bg-gradient-to-r from-zebotix-blue to-blue-300 bg-clip-text text-transparent'>
                Zebotix
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className='hidden md:block'>
            <div className='flex items-center space-x-4'>
              <Link
                href='#home'
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/') ? 'text-zebotix-blue' : 'text-white hover:text-zebotix-blue'
                }`}
              >
                Home
              </Link>
              <Link
                href='#features'
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('') ? 'text-zebotix-blue' : 'text-white hover:text-zebotix-blue'
                }`}
              >
                Features
              </Link>
              <Link
                href='#solutions'
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('') ? 'text-zebotix-blue' : 'text-white hover:text-zebotix-blue'
                }`}
              >
                Solutions
              </Link>
              <Link
                href='#portfolio'
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('') ? 'text-zebotix-blue' : 'text-white hover:text-zebotix-blue'
                }`}
              >
                Portfolio
              </Link>
              <Link
                href='#pricing'
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('') ? 'text-zebotix-blue' : 'text-white hover:text-zebotix-blue'
                }`}
              >
                Pricing
              </Link>
              <Link
                href='/contact'
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('') ? 'text-zebotix-blue' : 'text-white hover:text-zebotix-blue'
                }`}
              >
                Contact
              </Link>
              <Link
                href='#faq'
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('') || location?.startsWith('/')
                    ? 'text-zebotix-blue'
                    : 'text-white hover:text-zebotix-blue'
                }`}
              >
                FAQs
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={toggleMenu}
              className='inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none'
            >
              {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className='relative md:hidden'>
          <div className='w-full absolute bg-zebotix-black bg-opacity-90 backdrop-blur-sm px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            <Link
              href='#home'
              className={`block px-3 py-2 text-base font-medium ${
                isActive('/') ? 'text-zebotix-blue' : 'text-white hover:text-zebotix-blue'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href='#features'
              className={`block px-3 py-2 text-base font-medium ${
                isActive('') ? 'text-zebotix-blue' : 'text-white hover:text-zebotix-blue'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href='#solutions'
              className={`block px-3 py-2 text-base font-medium ${
                isActive('') ? 'text-zebotix-blue' : 'text-white hover:text-zebotix-blue'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Solutions
            </Link>
            <Link
              href='#portfolio'
              className={`block px-3 py-2 text-base font-medium ${
                isActive('') ? 'text-zebotix-blue' : 'text-white hover:text-zebotix-blue'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href='#pricing'
              className={`block px-3 py-2 text-base font-medium ${
                isActive('') ? 'text-zebotix-blue' : 'text-white hover:text-zebotix-blue'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href='/contact'
              className={`block px-3 py-2 text-base font-medium ${
                isActive('') ? 'text-zebotix-blue' : 'text-white hover:text-zebotix-blue'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href='#faq'
              className={`block px-3 py-2 text-base font-medium ${
                isActive('/#faq') ? 'text-zebotix-blue' : 'text-white hover:text-zebotix-blue'
              }`}
              onClick={() => {
                console.log('faq: ', location, isActive('#faq'));
                return setIsOpen(false);
              }}
            >
              <span>FAQs</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
