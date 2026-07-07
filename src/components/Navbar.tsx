"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import MobileMenu from "./MobileMenu";
import NavLink from "./NavLink";

import type { Prisma } from "@/generated/prisma/client";

import { Button } from "@/components/ui/Button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/NavigationMenu";
import { COMPANY_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Navbar = ({ solutions = [] }: { solutions?: Prisma.SolutionGetPayload<{}>[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
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

            <NavigationMenu delayDuration={100}>
              <NavigationMenuList className="gap-2 p-0 m-0">
                {/* Solutions */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    onClick={() => router.push("/solutions")}
                    className={cn(
                      "px-4 py-2 h-auto text-xs font-black uppercase tracking-widest transition-colors relative group/navitem select-none flex items-center gap-1 cursor-pointer bg-transparent border-none outline-none hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent",
                      pathname.startsWith("/solutions")
                        ? "text-blue-500 hover:text-blue-500 data-[state=open]:text-blue-500 focus:text-blue-500"
                        : "text-zinc-400 hover:text-white data-[state=open]:text-white focus:text-white"
                    )}
                  >
                    Solutions
                    <div
                      className={cn(
                        "absolute bottom-0 left-4 right-4 h-[2px] bg-blue-500 transition-transform origin-left duration-300",
                        pathname.startsWith("/solutions")
                          ? "scale-x-100"
                          : "scale-x-0 group-hover/navitem:scale-x-100 group-data-[state=open]/navitem:scale-x-100 group-focus/navitem:scale-x-100"
                      )}
                    />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-zinc-950 border-t-0 border border-zinc-900 p-8 shadow-2xl rounded-none md:w-5xl w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {Object.entries(
                        solutions.reduce(
                          (acc, item) => {
                            const category = item.category || "Other Solutions";
                            if (!acc[category]) acc[category] = [];
                            acc[category].push(item);
                            return acc;
                          },
                          {} as Record<string, typeof solutions>
                        )
                      ).map(([category, items]) => (
                        <div key={category} className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-2">
                            {category}
                          </h4>
                          <ul className="space-y-3">
                            {items.map((item) => (
                              <li key={item.id}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={`/solutions/${item.slug}`}
                                    className="text-[11px] font-black text-zinc-400 hover:text-blue-500 transition-colors uppercase tracking-wider block leading-tight outline-none focus-visible:text-blue-500"
                                  >
                                    {item.title}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu
              delayDuration={100}
              viewportWrapperClassName="!left-auto !right-0 !translate-x-0"
              viewportWrapperStyle={{ left: "auto", right: 0, transform: "none" }}
            >
              <NavigationMenuList className="gap-2 p-0 m-0">
                {/* Company */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "px-4 py-2 h-auto text-xs font-black uppercase tracking-widest transition-colors relative group/navitem select-none flex items-center gap-1 cursor-pointer bg-transparent border-none outline-none hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent",
                      pathname === "/about" || pathname === "/blog" || pathname === "/testimonials"
                        ? "text-blue-500 hover:text-blue-500 data-[state=open]:text-blue-500 focus:text-blue-500"
                        : "text-zinc-400 hover:text-white data-[state=open]:text-white focus:text-white"
                    )}
                  >
                    Company
                    <div
                      className={cn(
                        "absolute bottom-0 left-4 right-4 h-[2px] bg-blue-500 transition-transform origin-left duration-300",
                        pathname === "/about" ||
                          pathname === "/blog" ||
                          pathname === "/testimonials"
                          ? "scale-x-100"
                          : "scale-x-0 group-hover/navitem:scale-x-100 group-data-[state=open]/navitem:scale-x-100 group-focus/navitem:scale-x-100"
                      )}
                    />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-zinc-950 border-t-0 border border-zinc-900 p-4 shadow-2xl rounded-none md:w-52 w-full">
                    <div className="flex flex-col gap-3">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/about"
                          className="text-xs font-black text-zinc-400 hover:text-blue-500 focus-visible:text-blue-500 transition-colors uppercase tracking-wider block outline-none"
                        >
                          Who we are
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/testimonials"
                          className="text-xs font-black text-zinc-400 hover:text-blue-500 focus-visible:text-blue-500 transition-colors uppercase tracking-wider block outline-none"
                        >
                          Testimonials
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/blog"
                          className="text-xs font-black text-zinc-400 hover:text-blue-500 focus-visible:text-blue-500 transition-colors uppercase tracking-wider block outline-none"
                        >
                          Blogs
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavLink href="/careers" active={pathname.startsWith("/careers")}>
              Careers
            </NavLink>
            <NavLink href="/contact" active={pathname === "/contact"}>
              Contact
            </NavLink>
          </div>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="max-sm:hidden h-12 px-8 border-zinc-800 hover:border-zinc-700 bg-transparent text-white font-bold w-full sm:w-auto"
          >
            <Link href="/contact">Let's Discuss</Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMenu}
              className="rounded-none bg-zinc-900 text-white hover:bg-zinc-850 transition-all border-zinc-800 focus:outline-hidden w-10 h-10 sm:w-12 sm:h-12"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} onClose={closeMenu} activePath={pathname} solutions={solutions} />
    </nav>
  );
};

export default Navbar;
