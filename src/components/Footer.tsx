"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

import type { Prisma } from "@/generated/prisma/client";

import { Reveal } from "@/components/animations";
import { Button } from "@/components/ui";
import { COMPANY_NAME, SOCIAL_LINKS, CONTACT_EMAIL } from "@/lib/constants";
import { SEO_SERVICES } from "@/lib/seo-services";
import { cn } from "@/lib/utils";

interface FooterProps {
  solutions?: Prisma.SolutionGetPayload<{}>[];
}
const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Cookie Policy", href: "/cookie-policy" },
  { name: "GDPR Compliance", href: "/gdpr" },
];

const Footer = ({ solutions = [] }: FooterProps) => {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success("Successfully subscribed to newsletter!");
    setEmail("");
    setLoading(false);
  };

  if (pathname.startsWith("/admin/secure")) {
    return null;
  }

  return (
    <footer
      key={pathname}
      className="relative z-20 bg-zinc-950 border-t border-zinc-900 pt-20 pb-12 overflow-hidden text-zinc-300"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Newsletter / CTA Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-zinc-900">
          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-4">
                Stay updated on systems engineering
              </h3>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-zinc-400 text-xs max-w-lg leading-relaxed">
                Sign up for our newsletter to receive technical briefs on architecture, web
                optimization, and modern software design patterns.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <Reveal delay={0.3} className="w-full">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-0 w-full border border-zinc-850"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="bg-zinc-900 border-0 focus:ring-0 focus:outline-hidden p-4 text-xs text-white placeholder-zinc-400 grow rounded-none"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-wider text-[10px] h-auto py-4 px-6 rounded-none border-0"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </Reveal>
          </div>
        </div>
        {/* Links Columns Grid - aligned correctly */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-12 gap-x-4 gap-y-8 sm:gap-8 lg:gap-12 pt-12 sm:pt-16 pb-8 sm:pb-12">
          {/* Column 1: Info */}
          <div className="col-span-2 lg:col-span-3">
            <Reveal distance={30}>
              <div className="flex flex-col">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 mb-6 group select-none"
                  aria-label={`${COMPANY_NAME} homepage`}
                >
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <Image
                      src="/Zebotix.png"
                      alt={`${COMPANY_NAME} Logo`}
                      fill
                      className="object-contain"
                      sizes="32px"
                    />
                  </div>
                  <span className="text-lg font-black tracking-tighter text-white uppercase">
                    {COMPANY_NAME}
                  </span>
                </Link>
                <p className="text-zinc-400 text-[10px] leading-relaxed mb-6 max-w-xs uppercase tracking-wider font-bold">
                  Empowering businesses with intelligent software & AI solutions. We architect
                  digital products that scale with your vision.
                </p>
                <address className="not-italic">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-white hover:text-blue-500 font-bold transition-colors block text-sm"
                    aria-label={`Email ${COMPANY_NAME}`}
                  >
                    {CONTACT_EMAIL}
                  </a>
                </address>
              </div>
            </Reveal>
          </div>

          {solutions.length > 0 && (
            <div className="col-span-1 lg:col-span-2">
              <Reveal delay={0.1} distance={30}>
                <div className="flex flex-col">
                  <nav aria-label="Solutions navigation">
                    <h4 className="text-white font-black text-[10px] uppercase tracking-widest mb-6">
                      Solutions
                    </h4>
                    <ul className="space-y-3 mb-6">
                      {solutions.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={`/solutions/${child.industrySlug}/${child.slug}`}
                            className="text-zinc-400 hover:text-blue-500 transition-colors text-[10px] font-black uppercase tracking-wider block"
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </Reveal>
            </div>
          )}

          <div className={cn("col-span-1 lg:col-span-3")}>
            <Reveal delay={0.15} distance={30}>
              <div className="flex flex-col">
                <nav aria-label="Services navigation">
                  <h4 className="text-white font-black text-[10px] uppercase tracking-widest mb-6">
                    Services
                  </h4>
                  <ul className="space-y-3 mb-6">
                    {SEO_SERVICES.slice(0, 5).map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="text-zinc-400 hover:text-blue-500 transition-colors text-[10px] font-black uppercase tracking-wider block"
                        >
                          {service.keyword}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href="/services"
                        className="text-blue-500 hover:text-blue-400 transition-colors text-[10px] font-black uppercase tracking-wider block mt-2"
                      >
                        View All Services &rarr;
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </Reveal>
          </div>

          <div className={cn("col-span-1 lg:col-span-2")}>
            <Reveal delay={0.2} distance={30}>
              <div className="flex flex-col">
                <nav aria-label="Legal navigation">
                  <h4 className="text-white font-black text-[10px] uppercase tracking-widest mb-6">
                    Legal
                  </h4>
                  <ul className="space-y-3 mb-6">
                    {legalLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-zinc-400 hover:text-blue-500 transition-colors text-[10px] font-black uppercase tracking-wider block"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </Reveal>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <Reveal delay={0.2} distance={30}>
              <div className="flex flex-col">
                <nav aria-label="Company navigation">
                  <h4 className="text-white font-black text-[10px] uppercase tracking-widest mb-6">
                    Company
                  </h4>
                  <ul className="space-y-3 mb-6">
                    <li>
                      <Link
                        href="/about"
                        className="text-zinc-400 hover:text-blue-500 transition-colors text-[10px] font-black uppercase tracking-wider block"
                      >
                        Who we are
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/testimonials"
                        className="text-zinc-400 hover:text-blue-500 transition-colors text-[10px] font-black uppercase tracking-wider block"
                      >
                        Testimonials
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/careers"
                        className="text-zinc-400 hover:text-blue-500 transition-colors text-[10px] font-black uppercase tracking-wider block"
                      >
                        Career
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/blog"
                        className="text-zinc-400 hover:text-blue-500 transition-colors text-[10px] font-black uppercase tracking-wider block"
                      >
                        Blogs
                      </Link>
                    </li>
                  </ul>
                </nav>

                <div className="hidden sm:block pt-4 border-t border-zinc-900">
                  <nav
                    aria-label={`${COMPANY_NAME} social links`}
                    className="flex flex-wrap gap-x-4 gap-y-2"
                  >
                    {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${COMPANY_NAME} on ${platform}`}
                        className="text-zinc-400 hover:text-white transition-colors text-[10px] uppercase font-black tracking-wider"
                      >
                        {platform}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="sm:hidden block pt-4 border-t border-zinc-900">
          <nav
            aria-label={`${COMPANY_NAME} social links`}
            className="flex flex-wrap gap-x-4 gap-y-2"
          >
            {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${COMPANY_NAME} on ${platform}`}
                className="text-zinc-400 hover:text-white transition-colors text-[10px] uppercase font-black tracking-wider"
              >
                {platform}
              </a>
            ))}
          </nav>
        </div>
        {/* Giant Typographic Signature */}
        <div className="select-none text-center  mt-8 pt-8 border-t border-zinc-900">
          <span
            aria-hidden="true"
            className="font-black text-[10vw] text-zinc-500 uppercase tracking-tighter leading-none block select-none"
          >
            {COMPANY_NAME}
          </span>
        </div>
        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-zinc-900 text-[10px] uppercase tracking-wider text-zinc-400 font-black">
          <span>
            &copy; {year} {COMPANY_NAME}. All rights reserved.
          </span>
          <span className="mt-2 sm:mt-0">Designed & Engineered for scale.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
