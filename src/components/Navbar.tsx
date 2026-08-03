"use client";

import { Menu, ArrowRight } from "lucide-react";
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
import { SEO_SERVICES } from "@/lib/seo-services";
import { cn } from "@/lib/utils";

const Navbar = ({ solutions = [] }: { solutions?: Prisma.SolutionGetPayload<{}>[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeServiceCategory, setActiveServiceCategory] = useState<string>(
    SEO_SERVICES[0]?.category || ""
  );
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
                src="/Zebotix.png"
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
            <NavigationMenu
              delayDuration={100}
              className="static!"
              viewportWrapperClassName="!left-1/2 !-translate-x-1/2 top-full mt-6"
              viewportWrapperStyle={{}}
            >
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
                        "absolute bottom-0 left-4 right-4 h-0.5 bg-blue-500 transition-transform origin-left duration-300",
                        pathname.startsWith("/solutions")
                          ? "scale-x-100"
                          : "scale-x-0 group-hover/navitem:scale-x-100 group-data-[state=open]/navitem:scale-x-100 group-focus/navitem:scale-x-100"
                      )}
                    />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-zinc-950 border-t-0 border border-zinc-900 p-0 shadow-2xl rounded-none w-[95vw] lg:w-[900px] xl:w-[1000px] flex flex-col">
                    {/* Top Heading */}
                    <div className="p-8 border-b border-zinc-900 bg-zinc-900/10">
                      <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-2">
                        Solutions
                      </h3>
                      <p className="text-[11px] text-zinc-400 font-medium tracking-wide">
                        Tailored industry solutions to scale your business and automate workflows.
                      </p>
                    </div>

                    <div className="p-8 bg-zinc-950">
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {solutions.map((item) => (
                          <NavigationMenuLink key={item.id} asChild>
                            <Link
                              href={`/solutions/${item.industrySlug}/${item.slug}`}
                              className="group block p-5 hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800 transition-colors bg-zinc-900/10"
                            >
                              <h4 className="text-[11px] font-black text-zinc-200 group-hover:text-blue-500 uppercase tracking-wider mb-2 leading-tight transition-colors">
                                {item.title}
                              </h4>
                              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest group-hover:text-zinc-400 transition-colors">
                                {item.category || "Solution"}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavLink href="/work" active={pathname === "/work"}>
              Portfolio
            </NavLink>
            <NavigationMenu
              delayDuration={100}
              className="static!"
              viewportWrapperClassName="!left-1/2 !-translate-x-1/2 top-full mt-6"
              viewportWrapperStyle={{}}
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
                        "absolute bottom-0 left-4 right-4 h-0.5 bg-blue-500 transition-transform origin-left duration-300",
                        pathname === "/about" ||
                          pathname === "/blog" ||
                          pathname === "/testimonials"
                          ? "scale-x-100"
                          : "scale-x-0 group-hover/navitem:scale-x-100 group-data-[state=open]/navitem:scale-x-100 group-focus/navitem:scale-x-100"
                      )}
                    />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-zinc-950 border-t-0 border border-zinc-900 shadow-2xl rounded-none md:w-150 w-full p-0 flex flex-col md:flex-row">
                    {/* Left Column: Links */}
                    <div className="w-full md:w-1/2 p-6 flex flex-col gap-4">
                      <div className="mb-2">
                        <h4 className="text-[11px] font-black uppercase tracking-widest text-zinc-500 mb-1">
                          Company
                        </h4>
                        <p className="text-[10px] text-zinc-400 leading-relaxed">
                          Discover our team, culture, and what our clients say about us.
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/about"
                            className="group flex items-center justify-between p-3 bg-zinc-900/20 hover:bg-zinc-900/60 border border-transparent hover:border-zinc-800 transition-all rounded-none outline-none"
                          >
                            <span className="text-xs font-black text-zinc-300 group-hover:text-blue-500 transition-colors uppercase tracking-wider">
                              Who we are
                            </span>
                            <ArrowRight className="h-3 w-3 text-zinc-600 group-hover:text-blue-500 transition-colors" />
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/testimonials"
                            className="group flex items-center justify-between p-3 bg-zinc-900/20 hover:bg-zinc-900/60 border border-transparent hover:border-zinc-800 transition-all rounded-none outline-none"
                          >
                            <span className="text-xs font-black text-zinc-300 group-hover:text-blue-500 transition-colors uppercase tracking-wider">
                              Testimonials
                            </span>
                            <ArrowRight className="h-3 w-3 text-zinc-600 group-hover:text-blue-500 transition-colors" />
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/blog"
                            className="group flex items-center justify-between p-3 bg-zinc-900/20 hover:bg-zinc-900/60 border border-transparent hover:border-zinc-800 transition-all rounded-none outline-none"
                          >
                            <span className="text-xs font-black text-zinc-300 group-hover:text-blue-500 transition-colors uppercase tracking-wider">
                              Blogs
                            </span>
                            <ArrowRight className="h-3 w-3 text-zinc-600 group-hover:text-blue-500 transition-colors" />
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>

                    {/* Right Column: Featured block */}
                    <div className="w-full md:w-1/2 bg-zinc-900/30 border-t md:border-t-0 md:border-l border-zinc-900 p-6 flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none" />
                      <div className="relative z-10">
                        <h4 className="text-[11px] font-black text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                          Inside Zebotix
                        </h4>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">
                          We engineer high-performance software, AI workflows, and digital design
                          patterns for ambitious enterprises. Our mission is to push the boundaries
                          of what is possible on the web.
                        </p>
                      </div>

                      <div className="relative z-10 mt-6 pt-6 border-t border-zinc-800/50">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 text-[11px] font-bold text-white hover:text-blue-500 transition-colors uppercase tracking-widest group"
                          >
                            Get in touch
                            <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavLink href="/careers" active={pathname.startsWith("/careers")}>
              Careers
            </NavLink>

            <NavigationMenu
              delayDuration={100}
              className="static!"
              viewportWrapperClassName="!left-1/2 !-translate-x-1/2 top-full mt-6"
              viewportWrapperStyle={{}}
            >
              <NavigationMenuList className="gap-2 p-0 m-0">
                {/* Services */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    onClick={() => router.push("/services")}
                    className={cn(
                      "px-4 py-2 h-auto text-xs font-black uppercase tracking-widest transition-colors relative group/navitem select-none flex items-center gap-1 cursor-pointer bg-transparent border-none outline-none hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent",
                      pathname.startsWith("/services")
                        ? "text-blue-500 hover:text-blue-500 data-[state=open]:text-blue-500 focus:text-blue-500"
                        : "text-zinc-400 hover:text-white data-[state=open]:text-white focus:text-white"
                    )}
                  >
                    Services
                    <div
                      className={cn(
                        "absolute bottom-0 left-4 right-4 h-0.5 bg-blue-500 transition-transform origin-left duration-300",
                        pathname.startsWith("/services")
                          ? "scale-x-100"
                          : "scale-x-0 group-hover/navitem:scale-x-100 group-data-[state=open]/navitem:scale-x-100 group-focus/navitem:scale-x-100"
                      )}
                    />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-zinc-950 border-t-0 border border-zinc-900 p-0 shadow-2xl rounded-none w-[95vw] lg:w-[900px] xl:w-[1100px] flex flex-col min-h-[450px]">
                    {/* Top Heading */}
                    <div className="p-8 border-b border-zinc-900 bg-zinc-900/10">
                      <h3 className="text-3xl font-black text-white uppercase tracking-widest">
                        Services
                      </h3>
                    </div>

                    <div className="flex flex-1">
                      {/* Left Sidebar: Categories */}
                      <div className="w-1/3 bg-zinc-900/20 border-r border-zinc-900 py-6 flex flex-col">
                        {Array.from(new Set(SEO_SERVICES.map((s) => s.category))).map(
                          (category) => (
                            <div
                              key={category}
                              onMouseEnter={() => setActiveServiceCategory(category)}
                              className={cn(
                                "px-8 py-4 cursor-pointer transition-colors border-l-2",
                                activeServiceCategory === category
                                  ? "border-blue-500 bg-zinc-900/50 text-white"
                                  : "border-transparent text-zinc-400 hover:bg-zinc-900/30 hover:text-zinc-200"
                              )}
                            >
                              <h4 className="text-[11px] font-black uppercase tracking-widest">
                                {category}
                              </h4>
                            </div>
                          )
                        )}
                      </div>

                      {/* Right Panel: Services for Active Category */}
                      <div className="w-2/3 p-8 bg-zinc-950">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                          {SEO_SERVICES.filter((s) => s.category === activeServiceCategory).map(
                            (item) => (
                              <NavigationMenuLink key={item.slug} asChild>
                                <Link
                                  href={`/services/${item.slug}`}
                                  className="group block p-3 hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800 transition-colors rounded-none"
                                >
                                  <h5 className="text-[11px] font-black text-zinc-200 group-hover:text-blue-500 uppercase tracking-wider mb-1 leading-tight transition-colors">
                                    {item.keyword}
                                  </h5>
                                  <p className="text-[10px] text-zinc-500 font-medium tracking-wide line-clamp-1 group-hover:text-zinc-400 transition-colors">
                                    {item.heroHeadline}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
