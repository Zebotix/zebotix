"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Menu, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

import MobileMenu from "./MobileMenu";
import NavLink from "./NavLink";
// import { ThemeToggle } from "./ThemeToggle";

import { COMPANY_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SOLUTIONS_LIST = [
  {
    category: "Software & Web",
    items: [
      { name: "Custom Software Engineering", href: "/solutions/custom-software-engineering" },
      { name: "High-Performance E-Commerce", href: "/solutions/high-performance-ecommerce" },
    ],
  },
  {
    category: "AI & Automation",
    items: [
      { name: "AI-Driven Automation", href: "/solutions/ai-driven-automation" },
      { name: "Intelligent Workflows & APIs", href: "/solutions/intelligent-workflows-api" },
    ],
  },
  {
    category: "Data & Cloud",
    items: [
      { name: "Cloud Infrastructure & DevOps", href: "/solutions/cloud-infrastructure-devops" },
      { name: "Database Architecture & Design", href: "/solutions/database-architecture-design" },
    ],
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      if (!navRef.current) return;

      const tl = gsap.timeline();

      tl.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      if (linksRef.current && linksRef.current.children.length > 0) {
        tl.from(
          linksRef.current.children,
          {
            opacity: 0,
            y: -10,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        );
      }
    },
    { dependencies: [pathname] }
  );

  if (pathname.startsWith("/admin/secure")) {
    return null;
  }

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      ref={navRef}
      aria-label="Primary navigation"
      className={cn(
        "fixed top-0 left-0 right-0 z-90 transition-all duration-500 border-b",
        scrolled
          ? "bg-zinc-950/90 backdrop-blur-xl py-3 border-zinc-900 shadow-2xl"
          : "bg-transparent py-6 border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 select-none" onClick={closeMenu}>
            <div className="relative w-10 h-10 flex items-center justify-center transform group-hover:scale-105 transition-all duration-500 drop-shadow-md">
              <Image
                src="/Zebotix.webp"
                alt={`${COMPANY_NAME} Logo`}
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <span className="text-xl font-black tracking-tighter text-white group-hover:text-blue-500 transition-colors uppercase">
              {COMPANY_NAME}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div ref={linksRef} className="hidden md:flex items-center gap-2 relative">
            <NavLink href="/" active={pathname === "/"}>
              Home
            </NavLink>

            {/* Solutions hover dropdown mega-menu */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
              onKeyDown={() => setSolutionsOpen(false)}
              tabIndex={0}
              role="menu"
            >
              <button
                type="button"
                className={cn(
                  "px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors relative group select-none flex items-center gap-1 cursor-default bg-transparent border-none outline-none",
                  pathname.startsWith("/solutions")
                    ? "text-blue-500"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                Solutions
                <ChevronDown className="h-3 w-3" />
                <span
                  className={cn(
                    "absolute bottom-0 left-4 right-4 h-[2px] bg-blue-500 transition-transform origin-left duration-300",
                    pathname.startsWith("/solutions")
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </button>

              {/* Solutions dropdown container */}
              <div
                className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] bg-zinc-950 border border-zinc-900 p-8 shadow-2xl transition-all duration-300 grid grid-cols-3 gap-8 rounded-none z-50 text-left",
                  solutionsOpen
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 -translate-y-2 invisible pointer-events-none"
                )}
              >
                {SOLUTIONS_LIST.map((group) => (
                  <div key={group.category} className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-550 border-b border-zinc-900 pb-2">
                      {group.category}
                    </h4>
                    <ul className="space-y-3">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="text-[11px] font-black text-zinc-400 hover:text-blue-500 transition-colors uppercase tracking-wider block leading-tight"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Company hover dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCompanyOpen(true)}
              onMouseLeave={() => setCompanyOpen(false)}
              onKeyDown={() => setCompanyOpen(false)}
              tabIndex={0}
              role="menu"
            >
              <button
                type="button"
                className={cn(
                  "px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors relative group select-none flex items-center gap-1 cursor-default bg-transparent border-none outline-none",
                  pathname === "/about" || pathname === "/blog"
                    ? "text-blue-500"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                Company
                <ChevronDown className="h-3 w-3" />
                <span
                  className={cn(
                    "absolute bottom-0 left-4 right-4 h-[2px] bg-blue-500 transition-transform origin-left duration-300",
                    pathname === "/about" || pathname === "/blog"
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </button>

              {/* Company dropdown container */}
              <div
                className={cn(
                  "absolute top-full right-0 mt-2 w-52 bg-zinc-950 border border-zinc-900 p-4 shadow-2xl transition-all duration-300 flex flex-col gap-3 rounded-none z-50 text-left",
                  companyOpen
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 -translate-y-2 invisible pointer-events-none"
                )}
              >
                <Link
                  href="/about"
                  className="text-xs font-black text-zinc-400 hover:text-blue-500 transition-colors uppercase tracking-wider block"
                >
                  Who we are
                </Link>
                <Link
                  href="/#testimonials"
                  className="text-xs font-black text-zinc-400 hover:text-blue-500 transition-colors uppercase tracking-wider block"
                >
                  Testimonials
                </Link>
                <Link
                  href="/blog"
                  className="text-xs font-black text-zinc-400 hover:text-blue-500 transition-colors uppercase tracking-wider block"
                >
                  Blogs
                </Link>
              </div>
            </div>

            <NavLink href="/contact" active={pathname === "/contact"}>
              Contact
            </NavLink>

            {/* <div className="ml-2 pl-2 border-l border-zinc-900">
              <ThemeToggle />
            </div> */}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMenu}
              className="p-3 rounded-none bg-zinc-900 text-white hover:bg-zinc-850 transition-all border border-zinc-800 focus:outline-hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} onClose={closeMenu} activePath={pathname} />
    </nav>
  );
};

export default Navbar;
