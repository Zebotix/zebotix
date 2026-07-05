import { Sparkles, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { getFaqsAction } from '@/app/actions/faqs';
import { Reveal } from '@/components/animations';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui';

export const metadata = {
  title: 'Frequently Asked Questions | Zebotix',
  description: 'Find answers to common questions about our software development services, project timelines, pricing packages, and SLA support.',
};

export default async function FaqPage() {
  const res = await getFaqsAction();
  const faqs = res.success ? res.data : [];

  // Group FAQs by category
  const categories: Record<string, typeof faqs> = {};
  faqs.forEach((faq) => {
    const cat = faq.category || 'general';
    if (!categories[cat]) {
      categories[cat] = [];
    }
    categories[cat].push(faq);
  });

  return (
    <main className="bg-zinc-950 text-zinc-300 min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <header className="text-center max-w-3xl mx-auto mb-20">
          <Reveal>
            <span className="text-blue-500 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-4 w-4" /> Help Center
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Frequently Asked Questions
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-zinc-400">
              Clear, transparent answers about our packages, revision processes, billing, and system support options.
            </p>
          </Reveal>
        </header>

        {faqs.length === 0 ? (
          <Reveal delay={0.3}>
            <div className="text-center py-20 border border-zinc-900 bg-zinc-900/20">
              <HelpCircle className="h-12 w-12 text-zinc-650 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">FAQs Coming Soon</h2>
              <p className="text-zinc-500 mb-8 max-w-md mx-auto">
                We are compiling standard inquiries. Feel free to contact our architects directly.
              </p>
              <Link
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 transition-colors inline-block"
              >
                Ask a Question
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="space-y-16">
            {Object.entries(categories).map(([catName, catFaqs], cIdx) => (
              <Reveal key={catName} delay={0.1 * cIdx} distance={25}>
                <div>
                  <h2 className="text-2xl font-black text-white mb-6 capitalize border-b border-zinc-900 pb-2 tracking-wide">
                    {catName} Questions
                  </h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {catFaqs.map((faq, index) => (
                      <AccordionItem
                        key={faq.id}
                        value={`item-${cIdx}-${index}`}
                        className="border-b border-zinc-900 last:border-0"
                      >
                        <AccordionTrigger className="text-left text-lg font-bold text-white hover:text-blue-500 py-6 transition-all">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-zinc-400 text-base leading-relaxed pb-6">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
