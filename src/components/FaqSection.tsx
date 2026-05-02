'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui';
import { FAQS } from '@/lib/constants';
import { Reveal } from '@/components/animations';

const FaqSection = () => {
  return (
    <section
      id='faq'
      className='bg-zebotix-black py-16 md:py-24 border-t border-white/5 overflow-hidden'
    >
      <div className='section-container'>
        <div className='text-center max-w-3xl mx-auto mb-16'>
          <Reveal>
            <h2 className='text-3xl md:text-5xl font-bold mb-4 text-white'>
              Frequently Asked{' '}
              <span className='bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>
                Questions
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className='text-gray-400 text-lg'>
              Find answers to common questions about our methodology and delivery. Can't find what
              you need? We're just a message away.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.4} distance={40}>
          <div className='max-w-3xl mx-auto bg-zebotix-darkGray rounded-3xl p-6 md:p-10 border border-gray-800 shadow-2xl'>
            <Accordion type='single' collapsible className='space-y-2'>
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className='border-b border-white/5 last:border-0'
                >
                  <AccordionTrigger className='text-left text-lg font-semibold text-white hover:text-zebotix-blue py-6 transition-all'>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className='text-gray-400 text-base leading-relaxed pb-6'>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FaqSection;
