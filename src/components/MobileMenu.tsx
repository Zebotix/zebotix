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
        "fixed inset-0 z-[100] md:hidden transition-all duration-300 h-[100vh]",
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
          <span className="text-xs font-black uppercase tracking-widest text-zinc-550">
            Navigation
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
        <nav className="flex flex-col gap-4">
          <Link
            href="/"
            onClick={handleLinkClick}
            className={cn(
              "text-sm font-black uppercase tracking-wider py-2 transition-colors block",
              activePath === "/" ? "text-blue-500" : "text-zinc-300 hover:text-white"
            )}
          >
            Home
          </Link>
          <Accordion type="multiple" className="w-full">
            {solutions.length > 0 && (
              <AccordionItem value="solutions" className="border-none">
                <AccordionTrigger className="hover:no-underline py-2 px-0">
                  <span className="text-sm font-black uppercase tracking-wider text-zinc-300 hover:text-white transition-colors">
                    Solutions
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-0 pt-2">
                  <div className="pl-4 flex flex-col gap-2 border-l border-zinc-900 ml-2">
                    {solutions.map((item) => (
                      <Link
                        key={item.id}
                        href={`/solutions/${item.slug}`}
                        onClick={handleLinkClick}
                        className={cn(
                          "text-xs font-black uppercase tracking-wider py-2 pl-3 transition-colors",
                          activePath === `/solutions/${item.slug}`
                            ? "text-blue-500"
                            : "text-zinc-550 hover:text-zinc-300"
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            <AccordionItem value="company" className="border-none">
                <AccordionTrigger className="hover:no-underline py-2 px-0">
                  <span className="text-sm font-black uppercase tracking-wider text-zinc-300 hover:text-white transition-colors">
                    Company
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-0 pt-2">
                  <div className="pl-4 flex flex-col gap-2 border-l border-zinc-900 ml-2">
                      <Link
                        href="/about"
                        onClick={handleLinkClick}
                        className={cn(
                          "text-xs font-black uppercase tracking-wider py-2 pl-3 transition-colors",
                          activePath === "/about"
                            ? "text-blue-500"
                            : "text-zinc-550 hover:text-zinc-300"
                        )}
                      >
                        Who we are
                      </Link>
                      <Link
                        href="/#testimonials"
                        onClick={handleLinkClick}
                        className={cn(
                          "text-xs font-black uppercase tracking-wider py-2 pl-3 transition-colors",
                          activePath === "/#testimonials"
                            ? "text-blue-500"
                            : "text-zinc-550 hover:text-zinc-300"
                        )}
                      >
                        Testimonials
                      </Link>
                      <Link
                        href="/blog"
                        onClick={handleLinkClick}
                        className={cn(
                          "text-xs font-black uppercase tracking-wider py-2 pl-3 transition-colors",
                          activePath === "/blog"
                            ? "text-blue-500"
                            : "text-zinc-550 hover:text-zinc-300"
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
              "text-sm font-black uppercase tracking-wider py-2 transition-colors",
              activePath.startsWith("/careers") ? "text-blue-500" : "text-zinc-300 hover:text-white"
            )}
          >
            Careers
          </Link>
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
        {/* <div className="mt-auto pt-6 border-t border-zinc-900 flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-zinc-550">
            Appearance
          </span>
          <ThemeToggle />
        </div> */}
      </div>
    </div>
  );
};

export default MobileMenu;
