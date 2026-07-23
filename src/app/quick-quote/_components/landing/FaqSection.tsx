import React from "react";

import { Reveal } from "@/components/animations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

export default function FaqSection() {
  const faqs = [
    {
      question: "How is pricing calculated?",
      answer:
        "Pricing is transparently calculated based on project complexity, platforms, specific features, selected timeline, and team size. We don't believe in hidden fees—you only pay for what brings value to your business.",
    },
    {
      question: "How long will my project take?",
      answer:
        "A standard web or mobile application typically takes 2-4 months. Complex enterprise systems, ERPs, or AI SaaS platforms can take 4-6+ months depending on the feature scope and integration requirements.",
    },
    {
      question: "Will I own the source code?",
      answer:
        "Absolutely. Once the project is completed and final payments are cleared, 100% of the Intellectual Property (IP) and source code ownership is transferred to you.",
    },
    {
      question: "Can requirements change during development?",
      answer:
        "Yes. We use an Agile methodology. While major scope changes might affect the timeline or budget, we are flexible and welcome iterations to ensure the final product hits your business goals.",
    },
    {
      question: "Do you provide long-term support?",
      answer:
        "Yes, we offer post-launch maintenance, security updates, and performance monitoring. We act as your long-term technical partner, helping you scale as your user base grows.",
    },
    {
      question: "Can you improve existing software?",
      answer:
        "Yes, we offer architecture audits, code refactoring, and legacy modernization services to make your existing applications faster, more secure, and scalable.",
    },
    {
      question: "Do you sign NDAs?",
      answer:
        "Yes. We take your privacy and intellectual property seriously. We sign strict Non-Disclosure Agreements before discussing any proprietary project details.",
    },
  ];

  return (
    <section className="py-24 bg-zinc-950 px-6 border-t border-zinc-900">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-400 text-lg">
              Everything you need to know about partnering with Zebotix.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border border-zinc-800 bg-zinc-900/50 px-6 rounded-sm data-[state=open]:border-blue-500/50 transition-colors"
              >
                <AccordionTrigger className="text-left text-white hover:text-blue-400 hover:no-underline font-bold text-lg py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
