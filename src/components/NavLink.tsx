'use client';

import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  mobile?: boolean;
}

const NavLink = ({ href, children, active, onClick, className, mobile }: NavLinkProps) => {
  const baseStyles = mobile
    ? 'block px-4 py-3 text-base font-black uppercase tracking-wider rounded-none transition-all'
    : 'px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors relative group select-none';

  const activeStyles = active
    ? 'text-blue-500 bg-blue-500/5 md:bg-transparent'
    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50 md:hover:bg-transparent';

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(baseStyles, activeStyles, className)}
    >
      {children}
      {!mobile && (
        <span
          className={cn(
            'absolute bottom-0 left-4 right-4 h-[2px] bg-blue-500 transition-transform origin-left duration-300 rounded-none',
            active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          )}
        />
      )}
    </Link>
  );
};

export default NavLink;
