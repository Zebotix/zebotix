'use client';

import Link from 'next/link';
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
    ? 'block px-3 py-2 text-base font-medium rounded-md transition-all'
    : 'px-3 py-2 text-sm font-medium transition-colors relative group';

  const activeStyles = active
    ? 'text-zebotix-blue bg-zebotix-blue/10'
    : 'text-white hover:text-zebotix-blue hover:bg-white/5';

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(baseStyles, activeStyles, className)}
    >
      {children}
      {!mobile && active && (
        <span className='absolute bottom-0 left-3 right-3 h-0.5 bg-zebotix-blue rounded-full' />
      )}
    </Link>
  );
};

export default NavLink;
