'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { COMPANY_NAME } from '@/lib/constants';
import { Reveal } from '@/components/animations';

const CtaSection = () => {
  const router = useRouter();

  return (
    <section id='cta' className='bg-zebotix-darkGray py-16 md:py-24 overflow-hidden'>
      <div className='section-container'>
        <Reveal distance={40}>
          <div className='bg-gradient-to-br from-blue-900/20 to-zebotix-black rounded-3xl p-8 md:p-16 relative overflow-hidden border border-white/5 shadow-2xl'>
            {/* Abstract glow effects */}
            <div className='absolute -top-24 -right-24 w-96 h-96 bg-zebotix-blue opacity-10 rounded-full blur-[100px]'></div>
            <div className='absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600 opacity-5 rounded-full blur-[100px]'></div>

            <div className='relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12'>
              <div className='lg:w-3/5'>
                <h2 className='text-4xl md:text-5xl font-bold mb-6 text-white leading-tight'>
                  Build faster. <span className='bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>Launch confidently.</span>
                </h2>
                <p className='text-gray-400 text-lg mb-10 max-w-xl leading-relaxed'>
                  {COMPANY_NAME} designs and delivers web and mobile solutions — from fast landing pages and
                  PWAs to admin panels and integrations. Get a clear plan, reliable delivery, and
                  30-day post-launch support.
                </p>
                <div className='flex flex-col sm:flex-row gap-4'>
                  <Button
                    size="lg"
                    onClick={() => router.push('/contact')}
                    className='bg-zebotix-blue hover:bg-blue-600 text-white font-bold h-14 px-8 rounded-xl shadow-lg shadow-blue-500/20'
                  >
                    Get a Free Quote
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => router.push('/contact')}
                    variant='outline'
                    className='border-white/10 text-white hover:bg-white hover:text-zebotix-black h-14 px-8 rounded-xl transition-all'
                  >
                    Book a Demo
                  </Button>
                </div>
              </div>

              <div className='lg:w-2/5 w-full'>
                <div className='relative'>
                  <div className='absolute -inset-1 bg-gradient-to-r from-zebotix-blue to-blue-600 rounded-2xl blur opacity-20'></div>
                  <Image
                    width={500}
                    height={400}
                    src='https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=500&h=400&q=80'
                    alt={`${COMPANY_NAME} dashboard preview`}
                    className='relative rounded-2xl w-full shadow-2xl border border-white/5'
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CtaSection;
