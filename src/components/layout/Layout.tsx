import React from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';
import ContactButton from '../ContactButton';
import { Toaster } from '../ui';

export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      {/* <Sonner /> */}
      <Navbar />
      <main className='min-h-screen bg-zebotix-black text-white'>
        {children}
        <ContactButton />
      </main>
      <Footer />
    </>
    //   </TooltipProvider>
    // </QueryClientProvider>
  );
}
