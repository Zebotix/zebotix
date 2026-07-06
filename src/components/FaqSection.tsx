"use client";

import { Reveal } from "@/components/animations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs?: FaqItem[];
}

const FaqSection = ({ faqs = [] }: FaqSectionProps) => {
  const items = faqs;

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section
      id="faq"
      className="bg-zinc-950 py-20 md:py-28 border-t border-zinc-900 overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-blue-500 font-black mb-4 block">
              Support
            </span>
          </Reveal>
          <Reveal delay={0.15}>
            <h2
              id="faq-heading"
              className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tighter"
            >
              Frequently Asked Questions
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Find answers to common questions about our methodology and delivery. Can't find what
              you need? We're just a message away.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.4} distance={40}>
          <div className="max-w-3xl mx-auto bg-zinc-900 rounded-none p-8 md:p-10 border border-zinc-800 shadow-2xl">
            <Accordion type="single" collapsible className="space-y-2">
              {items.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-zinc-850 last:border-0 rounded-none"
                >
                  <AccordionTrigger className="text-left text-base font-black text-white hover:text-blue-500 py-6 transition-all uppercase tracking-tight rounded-none border-0">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400 text-sm leading-relaxed pb-6 rounded-none">
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
