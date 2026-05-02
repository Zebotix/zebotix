'use client';

import React from 'react';
import { X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import NavLink from './NavLink';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activePath: string;
}

const MobileMenu = ({ isOpen, onClose, activePath }: MobileMenuProps) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-100 md:hidden transition-all duration-300',
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      )}
    >
      {/* Overlay */}
      <div 
        className='absolute inset-0 bg-black/60 backdrop-blur-xs' 
        onClick={onClose} 
      />

      {/* Menu Panel */}
      <div
        className={cn(
          'absolute right-0 top-0 bottom-0 w-[280px] bg-zebotix-darkGray shadow-2xl transition-transform duration-300 transform p-6 flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className='flex justify-between items-center mb-8'>
          <span className='text-xl font-bold gradient-text'>Menu</span>
          <button
            onClick={onClose}
            className='p-2 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        <nav className='flex flex-col gap-2'>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              active={activePath === link.href || (link.href !== '/' && activePath.includes(link.href.replace('#', '')))}
              onClick={onClose}
              mobile
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <span className="text-sm text-gray-400 font-medium">Appearance</span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
