import React from 'react';
import { Button } from '@/components/ui/button';

const CtaSection = () => {
  return (
    <div className='bg-zebotix-darkGray py-16 md:py-20'>
      <div className='section-container'>
        <div className='bg-gradient-to-r from-zebotix-blue/20 to-blue-300/20 rounded-2xl p-8 md:p-12 relative overflow-hidden'>
          {/* Abstract glow effect */}
          <div className='absolute top-0 right-0 w-64 h-64 bg-zebotix-blue opacity-20 rounded-full blur-3xl'></div>
          <div className='absolute bottom-0 left-0 w-64 h-64 bg-blue-600 opacity-10 rounded-full blur-3xl'></div>

          <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-8'>
            <div className='md:w-2/3'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Build faster. Launch confidently.
              </h2>
              <p className='text-gray-300 mb-6 max-w-xl'>
                Zebotix designs and delivers web and mobile solutions — from fast landing pages and
                PWAs to admin panels and integrations. Get a clear plan, reliable delivery, and
                30-day post-launch support.
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Button className='bg-zebotix-blue hover:bg-blue-600 text-white font-semibold'>
                  Get a free quote
                </Button>
                <Button
                  variant='outline'
                  className='border-background text-white hover:bg-white hover:text-zebotix-black hover:border-white'
                >
                  Book a demo
                </Button>
              </div>
            </div>

            <div className='md:w-1/3'>
              <img
                src='https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=300&h=300&q=80'
                alt='Zebotix dashboard preview'
                className='rounded-lg w-full card-shadow'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
