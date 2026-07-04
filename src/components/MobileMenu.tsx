'use client';

import { X, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import { ThemeToggle } from './ThemeToggle';

import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activePath: string;
}

const MobileMenu = ({ isOpen, onClose, activePath }: MobileMenuProps) => {
  const [solutionsExpanded, setSolutionsExpanded] = useState(false);
  const [companyExpanded, setCompanyExpanded] = useState(false);

  const solutions = [
    { name: "Custom Software Engineering", href: "/solutions/custom-software-engineering" },
    { name: "AI-Driven Automation", href: "/solutions/ai-driven-automation" },
    { name: "High-Performance E-Commerce", href: "/solutions/high-performance-ecommerce" },
    { name: "Intelligent Workflows & APIs", href: "/solutions/intelligent-workflows-api" },
    { name: "Cloud Infrastructure & DevOps", href: "/solutions/cloud-infrastructure-devops" },
    { name: "Database Architecture & Design", href: "/solutions/database-architecture-design" }
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] md:hidden transition-all duration-300',
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      )}
    >
      {/* Overlay Background */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm w-full h-full"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel Drawer */}
      <div
        className={cn(
          'absolute right-0 top-0 bottom-0 w-full sm:w-80 bg-zinc-950 border-l border-zinc-900 shadow-2xl transition-transform duration-300 transform p-6 flex flex-col rounded-none overflow-y-auto z-10',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header Row */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-zinc-900">
          <span className="text-xs font-black uppercase tracking-widest text-zinc-550">
            Navigation
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-none bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-850 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links Navigation */}
        <nav className="flex flex-col gap-4">
          <Link
            href="/"
            onClick={handleLinkClick}
            className={cn(
              "text-sm font-black uppercase tracking-wider py-2 transition-colors",
              activePath === "/" ? "text-blue-500" : "text-zinc-300 hover:text-white"
            )}
          >
            Home
          </Link>

          {/* Solutions Dropdown Menu */}
          <div>
            <button
              onClick={() => setSolutionsExpanded(!solutionsExpanded)}
              className="w-full flex justify-between items-center text-sm font-black uppercase tracking-wider py-2 text-zinc-300 hover:text-white transition-colors"
            >
              <span>Solutions</span>
              {solutionsExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            <div
              className={cn(
                "pl-4 flex flex-col gap-2 overflow-hidden transition-all duration-300",
                solutionsExpanded ? "max-h-96 mt-2 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
              )}
            >
              {solutions.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "text-xs font-black uppercase tracking-wider py-2 border-l border-zinc-900 pl-3 transition-colors",
                    activePath === s.href ? "text-blue-500 border-blue-500" : "text-zinc-550 hover:text-zinc-300"
                  )}
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Company Dropdown Menu */}
          <div>
            <button
              onClick={() => setCompanyExpanded(!companyExpanded)}
              className="w-full flex justify-between items-center text-sm font-black uppercase tracking-wider py-2 text-zinc-300 hover:text-white transition-colors"
            >
              <span>Company</span>
              {companyExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            <div
              className={cn(
                "pl-4 flex flex-col gap-2 overflow-hidden transition-all duration-300",
                companyExpanded ? "max-h-48 mt-2 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
              )}
            >
              <Link
                href="/about"
                onClick={handleLinkClick}
                className={cn(
                  "text-xs font-black uppercase tracking-wider py-2 border-l border-zinc-900 pl-3 transition-colors",
                  activePath === "/about" ? "text-blue-500 border-blue-500" : "text-zinc-550 hover:text-zinc-300"
                )}
              >
                Who we are
              </Link>
              <Link
                href="/#testimonials"
                onClick={handleLinkClick}
                className="text-xs font-black uppercase tracking-wider py-2 border-l border-zinc-900 pl-3 text-zinc-550 hover:text-zinc-300 transition-colors"
              >
                Testimonials
              </Link>
              <Link
                href="/blog"
                onClick={handleLinkClick}
                className={cn(
                  "text-xs font-black uppercase tracking-wider py-2 border-l border-zinc-900 pl-3 transition-colors",
                  activePath === "/blog" ? "text-blue-500 border-blue-500" : "text-zinc-550 hover:text-zinc-300"
                )}
              >
                Blogs
              </Link>
            </div>
          </div>

          <Link
            href="/contact"
            onClick={handleLinkClick}
            className={cn(
              "text-sm font-black uppercase tracking-wider py-2 transition-colors",
              activePath === "/contact" ? "text-blue-500" : "text-zinc-300 hover:text-white"
            )}
          >
            Contact
          </Link>
        </nav>

        {/* Footer Area */}
        <div className="mt-auto pt-6 border-t border-zinc-900 flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-zinc-550">
            Appearance
          </span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
