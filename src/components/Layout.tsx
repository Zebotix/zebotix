"use client";

import React from "react";

import type { Prisma } from "@/generated/prisma/client";

import { Navbar, Footer, ContactButton } from "@/components";
import { Toaster, TooltipProvider } from "@/components/ui";
import { useScrollHash } from "@/hooks/useScrollHash";

export default function Layout({
  children,
  solutions = [],
}: Readonly<{
  children: React.ReactNode;
  solutions?: Prisma.SolutionGetPayload<{}>[];
}>) {
  useScrollHash();

  return (
    <TooltipProvider>
      <Toaster />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-200 focus:rounded-full focus:bg-zebotix-blue focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Navbar solutions={solutions} />
      <main
        id="main-content"
        className="min-h-screen bg-background text-foreground selection:bg-primary/30"
      >
        {children}
        <ContactButton />
      </main>
      <Footer
        solutions={solutions
          .toSorted((a, b) => {
            const dateA = new Date(a.updatedAt).getTime();
            const dateB = new Date(b.updatedAt).getTime();
            return dateB - dateA;
          })
          .slice(0, 6)}
      />
    </TooltipProvider>
  );
}
