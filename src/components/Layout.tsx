'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { Navbar, Footer, ContactButton } from '@/components';
import { Toaster, TooltipProvider } from '@/components/ui';
import { useScrollHash } from '@/hooks/useScrollHash';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  useScrollHash();
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[200] focus:rounded-full focus:bg-zebotix-blue focus:px-4 focus:py-2 focus:text-white focus:shadow-lg'
        >
          Skip to main content
        </a>
        <Navbar />
        <main
          id='main-content'
          className='min-h-screen bg-background text-foreground selection:bg-primary/30'
        >
          {children}
          <ContactButton />
        </main>
        <Footer />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
