'use client';

import React from 'react';
import { Toaster, Sonner, TooltipProvider } from '@/components/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar, Footer, ContactButton } from '@/components';
import { useScrollHash } from '@/hooks/useScrollHash';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  useScrollHash();
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Navbar />
        <main className='min-h-screen bg-background text-foreground selection:bg-primary/30'>
          {children}
          <ContactButton />
        </main>
        <Footer />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
