import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What services does Zebotix offer?',
    answer:
      'We build responsive websites, Progressive Web Apps (PWA), mobile wrappers, and admin panels. We also provide hosting, performance optimization, analytics setup, and custom integrations for growing businesses.',
  },
  {
    question: 'What is the difference between a PWA, a wrapper, and a native app?',
    answer:
      'A PWA is a web app that behaves like a mobile app (installable, offline support). A wrapper packages a web app into an Android/iOS shell (not a native rebuild). A native app is built specifically for Android/iOS and requires separate development and costs.',
  },
  {
    question: 'Which package should I choose (Starter / Business / Enterprise)?',
    answer:
      'Starter is for small sites/landing pages (PKR 4,999). Business is for growing companies needing a lightweight CMS and staging (PKR 14,999). Enterprise is for full repo access, CI/CD, analytics and custom integrations (PKR 34,999). Contact us if you need help selecting.',
  },
  {
    question: 'What does the Starter package include?',
    answer:
      'Starter includes one responsive site up to 10 pages, a basic contact form (email forwarding), one simple logo, and a PWA/wrapper (not a native app). Client provides content; optional uploads-for-you are available for a fee.',
  },
  {
    question: 'Do you provide content or design copywriting?',
    answer:
      'Clients should provide images and copy. We offer guidance and templates for content upload. Content creation or copywriting is available as an add-on and will be quoted separately.',
  },
  {
    question: 'Will you host my website? What are hosting fees?',
    answer:
      'Hosting is not included by default. We can host your site for a separate monthly fee (quoted based on traffic and storage). Alternatively, we can supply deployment instructions so you host with your own provider.',
  },
  {
    question: 'Do I get source code or repo access?',
    answer:
      'Source code transfer is available as an add-on (PKR 4,999) and is provided only after final payment and confirmation of licenses for third-party tools. Repo access for collaboration can be provided earlier on request under agreed terms.',
  },
  {
    question: 'What are payment terms, deposits and refunds?',
    answer:
      'A deposit is required before work starts (typically 30–50%). Final payment is due before source code transfer or project handover. Refunds follow our contract; simple cancellations before development may be partially refundable depending on work completed.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Starter sites: typically 2 business days after we receive required content and deposit. Business & Enterprise timelines vary by scope — we provide a delivery estimate during quoting.',
  },
  {
    question: 'How many revisions are included?',
    answer:
      'Starter: up to 5 UI revisions (small edits to text, images, and layout). Business/Enterprise include UAT and one formal review; additional revisions or scope changes are quoted separately.',
  },
  {
    question: 'What post-delivery support do you offer?',
    answer:
      'All packages include a 30-day limited bug-fix window. Response SLA: critical issues within 24–48 hours; non-critical within 3–5 business days. Extended maintenance plans are available.',
  },
  {
    question: 'Do you provide a staging environment and UAT?',
    answer:
      'Business and Enterprise plans include a staging environment. We include one round of UAT with a 5-business-day acceptance window; feedback after that may follow the revision/change policy.',
  },
  {
    question: 'What does the Business admin panel include?',
    answer:
      'A lightweight content editor for managing pages, images, and basic content. Built using a simple headless or in-app editor (e.g., Next.js + lightweight CMS). It is not a full enterprise CMS unless scoped separately.',
  },
  {
    question: 'How is authentication handled?',
    answer:
      'We provide basic email/password authentication with secure password reset flows. Passwords are stored hashed and best-practice security measures (secure cookies, rate limits) are applied. SSO and advanced auth are available on Enterprise.',
  },
  {
    question: 'What performance and SEO work is included?',
    answer:
      'We implement core performance optimizations such as image optimization, caching, and CDN recommendations. Basic on-page SEO best practices (meta tags, semantic markup) are included; full SEO packages are available as add-ons.',
  },
  {
    question: 'Can you integrate payment gateways or e-commerce?',
    answer:
      'Yes — payment gateway basics (Stripe integration, checkout flow) are available as an add-on (+PKR 1,999). Gateway fees and PCI compliance responsibilities remain with the merchant; advanced e-commerce requires separate scoping.',
  },
  {
    question: 'What about role-based access control (RBAC)?',
    answer:
      'Role-based access add-on is available (+PKR 2,999) with caps on complexity (starter caps: up to 3 roles; business caps: up to 5 roles). Complex RBAC requirements will be custom quoted.',
  },
  {
    question: 'How do you handle third-party licenses and analytics?',
    answer:
      'We configure analytics (Google Analytics / GTM) and basic third-party services. Any paid third-party licenses (fonts, plugins, APIs) must be procured by the client unless agreed otherwise in the quote.',
  },
  {
    question: 'What happens to data and backups?',
    answer:
      'We advise regular backups and can enable automated backups for hosted sites (additional fee may apply). For self-hosted deployments, we provide backup instructions and recommend scheduled offsite backups.',
  },
  {
    question: 'How do I request custom features or enterprise integrations?',
    answer:
      'Contact us with your requirements. Enterprise integrations (ERP, CRM, custom APIs) require a separate scoping session and quote. We provide a written scope, timeline, and cost estimate before starting work.',
  },
  {
    question: 'How do you test quality and accessibility?',
    answer:
      'We perform functional QA, basic cross-browser testing, and keyboard/accessibility checks for major flows. Full WCAG audits or accessibility remediation can be quoted as an additional service.',
  },
  {
    question: 'How do I start a project with Zebotix?',
    answer:
      'Reach out via the contact form or email. We’ll schedule a quick discovery call, provide a scope and quote, request a deposit to start, and collect content requirements to begin development.',
  },
];

const FaqSection = () => {
  return (
    <div id='faq' className='bg-zebotix-black py-16 md:py-24 border-t border-gray-800'>
      <div className='section-container'>
        <div className='text-center max-w-3xl mx-auto mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Frequently Asked <span className='gradient-text'>Questions</span>
          </h2>
          <p className='text-gray-400'>
            Find answers to common questions about Zebotix. If you can’t find what you’re looking
            for, please contact our support team.
          </p>
        </div>

        <div className='max-w-3xl mx-auto bg-zebotix-darkGray rounded-xl p-6 md:p-8 border border-gray-800 card-shadow'>
          <Accordion type='single' collapsible className='space-y-4'>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className='border-b border-gray-800 last:border-0'
              >
                <AccordionTrigger className='text-left text-white hover:text-zebotix-blue py-4'>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className='text-gray-400 pb-4'>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
