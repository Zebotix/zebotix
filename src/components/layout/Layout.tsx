'use client';
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from '../Footer';
import Navbar from '../Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Navbar />
        <main className='min-h-screen bg-zebotix-black text-white'>{children}</main>
        <Footer />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
