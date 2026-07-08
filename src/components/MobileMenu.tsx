"use client";

import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

// import { ThemeToggle } from "./ThemeToggle";

import type { Prisma } from "@/generated/prisma/client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activePath: string;
  solutions?: Prisma.SolutionGetPayload<{}>[];
}

const MobileMenu = ({ isOpen, onClose, activePath, solutions = [] }: MobileMenuProps) => {
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-100 md:hidden transition-all duration-300 h-screen",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
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
          "absolute right-0 top-0 bottom-0 w-full  sm:w-80 bg-zinc-950 border-l border-zinc-900 shadow-2xl transition-transform duration-300 transform p-6 flex flex-col rounded-none overflow-y-auto z-10",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header Row */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-zinc-900">
          <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
            ZEBOTIX
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={onClose}
            className="rounded-none bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-850 transition-colors w-10 h-10 sm:w-12 sm:h-12"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 sm:h-6 sm:w-6" />
          </Button>
        </div>

        {/* Links Navigation */}
        <nav className="flex flex-col gap-2">
          <Link
            href="/"
            onClick={handleLinkClick}
            className={cn(
              "text-sm font-black uppercase tracking-wider py-3 transition-colors block",
              activePath === "/" ? "text-blue-500" : "text-zinc-300 hover:text-white"
            )}
          >
            Home
          </Link>
          <Accordion type="single" collapsible className="w-full">
            {solutions.length > 0 && (
              <AccordionItem value="solutions" className="border-none">
                <div className="flex items-center justify-between w-full group">
                  <Link
                    href="/solutions"
                    onClick={handleLinkClick}
                    className={cn(
                      "text-sm font-black uppercase tracking-wider py-3 transition-colors flex-1 text-left",
                      activePath === "/solutions"
                        ? "text-blue-500"
                        : "text-zinc-300 group-hover:text-white"
                    )}
                  >
                    Solutions
                  </Link>
                  <AccordionTrigger className="hover:no-underline py-3 px-4 -mr-4 flex-none data-[state=open]:text-white text-zinc-300" />
                </div>
                <AccordionContent className="pb-0 pt-2">
                  <div className="pl-4 flex flex-col gap-2 border-l border-zinc-900 ml-2">
                    {solutions.map((item) => {
                      const href = `/solutions/${item.industrySlug}/${item.slug}`;
                      return (
                        <Link
                          key={item.id}
                          href={href}
                          onClick={handleLinkClick}
                          className={cn(
                            "text-xs font-black uppercase tracking-wider py-3 pl-3 transition-colors block",
                            activePath === href
                              ? "text-blue-500"
                              : "text-zinc-400 hover:text-zinc-300"
                          )}
                        >
                        {item.title}
                      </Link>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            <AccordionItem value="company" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3 px-0 group">
                <span className="text-sm font-black uppercase tracking-wider transition-colors group-data-[state=open]:text-white text-zinc-300 group-hover:text-white">
                  Company
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-0 pt-2">
                <div className="pl-4 flex flex-col gap-2 border-l border-zinc-900 ml-2">
                  <Link
                    href="/about"
                    onClick={handleLinkClick}
                    className={cn(
                      "text-xs font-black uppercase tracking-wider py-3 pl-3 transition-colors block",
                      activePath === "/about"
                        ? "text-blue-500"
                        : "text-zinc-400 hover:text-zinc-300"
                    )}
                  >
                    Who we are
                  </Link>
                  <Link
                    href="/#testimonials"
                    onClick={handleLinkClick}
                    className={cn(
                      "text-xs font-black uppercase tracking-wider py-3 pl-3 transition-colors block",
                      activePath === "/#testimonials"
                        ? "text-blue-500"
                        : "text-zinc-400 hover:text-zinc-300"
                    )}
                  >
                    Testimonials
                  </Link>
                  <Link
                    href="/blog"
                    onClick={handleLinkClick}
                    className={cn(
                      "text-xs font-black uppercase tracking-wider py-3 pl-3 transition-colors block",
                      activePath === "/blog" ? "text-blue-500" : "text-zinc-400 hover:text-zinc-300"
                    )}
                  >
                    Blogs
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link
            href="/careers"
            onClick={handleLinkClick}
            className={cn(
              "text-sm font-black uppercase tracking-wider py-3 transition-colors block",
              activePath.startsWith("/careers") ? "text-blue-500" : "text-zinc-300 hover:text-white"
            )}
          >
            Careers
          </Link>
          <Link
            href="/contact"
            onClick={handleLinkClick}
            className={cn(
              "text-sm font-black uppercase tracking-wider py-3 transition-colors block",
              activePath === "/contact" ? "text-blue-500" : "text-zinc-300 hover:text-white"
            )}
          >
            Contact
          </Link>
        </nav>

        {/* Footer Area */}
        <div className="mt-auto pt-6 border-t border-zinc-900 w-full">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full h-14 border-zinc-800 hover:bg-zinc-900 bg-transparent text-white font-bold rounded-none uppercase tracking-wider"
            onClick={handleLinkClick}
          >
            <Link href="/contact">Let's Discuss</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
