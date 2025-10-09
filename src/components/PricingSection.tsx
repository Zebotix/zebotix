'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Router, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    pricePKR: 'PKR 4,999',
    short: 'Simple, fast launch for small businesses — responsive site + basic PWA/wrapper.',
    features: [
      'Up to 10 responsive pages',
      'Basic contact form (emails forwarded)',
      '1 simple logo (free)',
      'PWA / wrapper (not a native app)',
      'Content upload guidance',
    ],
    details: {
      deliverables:
        '1 responsive website (up to 10 pages), basic contact form (emails forwarded to client), 1 simple logo, Progressive Web App (PWA) or wrapper for Android/iOS — not a native app unless explicitly scoped.',
      content:
        'Client supplies all content (images, copy). Content upload allowed to local storage only. We provide upload instructions; optional upload-for-you service available for an extra fee on request.',
      exclusions:
        'No source code / no repo access included. Hosting is not included by default; hosting available for an additional monthly fee (quoted separately).',
      delivery: 'Delivery within 2 business days after we receive required content and deposit.',
      revisions:
        'Up to 5 UI revisions included (minor edits: text, images, colors, layout tweaks). Major scope changes (new pages, new features) will be quoted separately.',
      support:
        '30-day limited bug-fix window after delivery. Response SLA: critical issues within 48 hours; non-critical within 5 business days.',
      note: 'Starter is intended for quick launches and small sites. If you need server-side admin or custom integrations, choose Business or Enterprise.',
      addons: [
        'Role-based access: +PKR 2,999 (up to 3 roles; custom roles quoted separately)',
        'Payment gateway / e-commerce basics: +PKR 1,999 (Stripe recommended; gateway fees & PCI compliance are client responsibility)',
        'Source code transfer: +PKR 4,999 (delivered after final payment and repo handover)',
      ],
    },
  },
  {
    id: 'business',
    name: 'Business (recommended)',
    pricePKR: 'PKR 14,999',
    short: 'Content editing, staging, and a small admin panel for growing businesses.',
    features: [
      'Simple admin panel (lightweight CMS)',
      'Email/password auth + reset',
      'Image optimization & CDN',
      'Staging environment',
      'UAT with 5 business days acceptance',
    ],
    details: {
      deliverables:
        'Responsive website with a lightweight admin panel for editing content (titles, images, basic pages). Tech: lightweight headless or in-app editor (e.g., Next.js + headless CMS or similar) — focused on content updates, not a full enterprise CMS.',
      auth: 'Basic email/password login with secure password reset via email. Passwords are stored hashed; standard security measures applied (rate limits, secure cookies). For SSO or enterprise auth, choose Enterprise.',
      performance:
        'We will implement image optimization (e.g., next/image or build-time optimizations), caching recommendations, and CDN setup where applicable. This is implemented as part of the deliverable (not just recommended).',
      staging_uat:
        'A staging environment is provided for review. One round of User Acceptance Testing (UAT) is included. Client has 5 business days to provide feedback; after that, changes follow the revision policy.',
      delivery:
        'Delivery timeline depends on scope and content — typical delivery quoted on acceptance. Includes basic QA and one UAT round.',
      support:
        '30-day bug-fix window included. Response SLA: critical within 24–48 hours; non-critical within 3–5 business days.',
      addons: [
        'Role-based access: +PKR 2,999 (up to 5 roles; complexity caps apply — custom roles require quote)',
        'Payment gateway / e-commerce basics: +PKR 1,999 (Stripe; client pays gateway fees; PCI compliance considerations apply)',
        'Source code transfer: +PKR 4,999 (after final payment & license checks)',
        'Advanced SEO / performance: quoted per page or fixed package — includes audit, prioritized fixes, and a report.',
      ],
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    pricePKR: 'PKR 34,999',
    short: 'Full delivery with repo access, CI/CD, analytics, and security checklist.',
    features: [
      'Source code & repo access (after final payment)',
      'Basic CI/CD setup (Vercel/Netlify)',
      'Analytics + GTM setup',
      'Security checklist delivered',
      'Custom integrations (quoted separately)',
    ],
    details: {
      deliverables:
        'Full project delivery with code repository access and a basic CI/CD pipeline (Vercel / Netlify or equivalent). Analytics and Google Tag Manager (GTM) setup included. A concise security checklist will be provided.',
      source_code:
        'Source code transfer is provided only after final payment is cleared and confirmation of required third-party licenses. We will grant repo access (Git) once payment and license checks are complete.',
      ci_cd:
        'Basic CI/CD setup for automatic deploys (branch → staging / branch → production workflows). Further automation or complex pipelines are scoped separately.',
      integrations:
        'Enterprise integrations (ERP, payment platforms, CRMs) require separate scoping and quote — not included in the base price.',
      delivery:
        'Delivery timeline depends on final scope and integrations. Exact timelines provided after scoping.',
      support:
        'Enterprise-level SLAs available — contact sales for dedicated support and options (on-call, faster response times).',
      addons: [
        'Role-based access: +PKR 2,999 (complexity caps; custom RBAC quoted separately)',
        'Payment gateway / e-commerce basics: +PKR 1,999 (Stripe; gateway fees & PCI/merchant responsibilities apply)',
        'Source code transfer: +PKR 4,999 (transfer terms: post-payment & repo handover)',
        'Advanced SEO / performance: custom quote (site audit, fixes, and reporting).',
      ],
    },
  },
];

type ModalType = {
  open: boolean;
  onClose: () => void;
  content: {
    id: string;
    name: string;
    pricePKR: string;
    short: string;
    features: string[];
    details: {
      deliverables: string;
      source_code: string;
      ci_cd: string;
      integrations: string;
      delivery: string;
      support: string;
      exclusions: string;
      content: string;
      revisions: string;
      auth: string;
      addons: string[];
    };
  };
};

const Modal = ({ open, onClose, content }: ModalType) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    // Focus the modal container for screen readers / keyboard users
    const el = modalRef.current;
    (el as any)?.focus();

    // Prevent background scrolling while modal is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Basic focus-trap & Escape handling
  const handleKeyDown = (e: any) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }

    if (e.key === 'Tab') {
      const container = modalRef.current;
      if (!container) return;

      const focusable = (container as any)?.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first) {
        e.preventDefault();
        return;
      }

      // If Shift+Tab on first element, move to last
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }

      // If Tab on last element, move to first
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const router = useRouter();

  if (!open || !content) return null;

  return (
    <>
      {/* Overlay */}
      <div className='fixed inset-0 bg-black/60 z-40' onClick={onClose} aria-hidden='true' />

      {/* Wrapper: fixed full-screen, allows scrolling if content taller than viewport */}
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='plan-modal-title'
        className='fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-auto'
        onKeyDown={handleKeyDown}
      >
        {/* Panel: stops propagation so clicking inside doesn't close modal.
            max-h + overflow-auto makes the panel content scrollable */}
        <div
          ref={modalRef}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          className='modal-scroll w-full max-w-3xl mx-auto bg-zebotix-darkGray rounded-2xl p-6 shadow-xl text-gray-200 max-h-[90vh] overflow-auto'
        >
          <div className='flex items-start justify-between'>
            <div>
              <h3 id='plan-modal-title' className='text-2xl font-bold mb-1'>
                {content.name} — {content.pricePKR}
              </h3>
              <p className='text-gray-400 text-sm'>{content.short}</p>
            </div>
            <button
              onClick={onClose}
              aria-label='Close details'
              className='p-2 rounded-md hover:bg-white/5'
            >
              <X className='h-5 w-5' />
            </button>
          </div>

          <div className='mt-4 space-y-4 text-sm'>
            <div>
              <strong>Deliverables:</strong>
              <p className='text-gray-300 mt-1'>{content.details.deliverables}</p>
            </div>

            <div>
              <strong>Content:</strong>
              <p className='text-gray-300 mt-1'>{content.details.content}</p>
            </div>

            <div>
              <strong>Exclusions & Hosting:</strong>
              <p className='text-gray-300 mt-1'>{content.details.exclusions}</p>
            </div>

            <div>
              <strong>Delivery & UAT:</strong>
              <p className='text-gray-300 mt-1'>{content.details.delivery}</p>
            </div>

            <div>
              <strong>Revisions & Support:</strong>
              <p className='text-gray-300 mt-1'>
                {content.details.revisions || content.details.support}
              </p>
            </div>

            {content.details.auth && (
              <div>
                <strong>Authentication / Security:</strong>
                <p className='text-gray-300 mt-1'>{content.details.auth}</p>
              </div>
            )}

            {content.details.ci_cd && (
              <div>
                <strong>CI / CD & Repo:</strong>
                <p className='text-gray-300 mt-1'>{content.details.ci_cd}</p>
              </div>
            )}

            {content.details.integrations && (
              <div>
                <strong>Integrations:</strong>
                <p className='text-gray-300 mt-1'>{content.details.integrations}</p>
              </div>
            )}

            <div>
              <strong>Support SLA:</strong>
              <p className='text-gray-300 mt-1'>{content.details.support}</p>
            </div>

            <div>
              <strong>Add-ons (optional):</strong>
              <ul className='list-disc list-inside mt-1 text-gray-300'>
                {content.details.addons.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>

            <div className='text-xs text-gray-400 mt-2'>
              <strong>Note:</strong> Enterprise integrations (ERP, advanced APIs) require separate
              scoping and a custom quote.
            </div>
          </div>

          <div className='mt-6 flex justify-end'>
            <Button onClick={onClose} className='mr-3'>
              Close
            </Button>
            <Button
              onClick={() => router.push('/contact')}
              className='bg-zebotix-blue hover:bg-blue-600 text-white'
            >
              Proceed / Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const PricingSection = () => {
  const [isAnnual] = useState(true); // retained UI toggle for looks (no price change here)
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<ModalType | null>(null);

  const openDetails = (planId: string) => {
    const p = plans.find((x) => x.id === planId);
    setSelectedPlan(p as any);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPlan(null);
  };

  const router = useRouter();

  return (
    <div
      id='pricing'
      className='bg-gradient-to-b from-zebotix-darkGray to-zebotix-black py-16 md:py-24'
    >
      <div className='section-container'>
        <div className='text-center max-w-3xl mx-auto mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Simple, <span className='gradient-text'>Transparent</span> Pricing
          </h2>
          <p className='text-gray-400 mb-8'>
            Choose the plan that fits your business needs. No hidden fees — basic add-ons available.
          </p>

          {/* Pricing toggle (visual only) */}
          <div className='flex items-center justify-center space-x-4 mb-12'>
            <span className={`text-sm font-medium text-zebotix-blue`}>One-time / Fixed</span>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={` flex flex-col justify-between rounded-2xl p-8 transition-all duration-300 ${
                plan.name.includes('recommended')
                  ? 'bg-gradient-to-b from-zebotix-blue/20 to-zebotix-black border border-zebotix-blue/30 transform hover:-translate-y-2'
                  : 'bg-zebotix-darkGray border border-gray-800 transform hover:-translate-y-1'
              }`}
            >
              {plan.name.includes('recommended') && (
                <span className='w-fit bg-zebotix-blue text-zebotix-black text-xs font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block'>
                  Recommended
                </span>
              )}

              <h3 className='text-2xl font-bold mb-2'>{plan.name}</h3>
              <p className='text-gray-400 mb-4'>{plan.short}</p>

              <div className='mb-6'>
                <span className='text-2xl font-bold'>{plan.pricePKR}</span>
                <span className='text-gray-400'> • One-time / starting price</span>
              </div>

              <ul className='space-y-3 mb-6'>
                {plan.features.map((feature, i) => (
                  <li key={i} className='flex items-start'>
                    <Check className='h-5 w-5 text-zebotix-blue mr-2 shrink-0' />
                    <span className='text-gray-300'>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className='flex flex-col gap-3'>
                <Button
                  onClick={() => router.push('/contact')}
                  className={`w-full ${
                    plan.name.includes('recommended')
                      ? 'bg-zebotix-blue hover:bg-blue-600 text-white'
                      : 'bg-zebotix-black hover:bg-blue-700 border border-zebotix-blue/30 hover:border-zebotix-blue text-white'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : `Start with ${plan.name}`}
                </Button>

                <button
                  onClick={() => openDetails(plan.id)}
                  className='w-full mt-1 text-sm py-2 rounded-md border border-gray-700 hover:bg-white/3'
                >
                  Read details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={modalOpen} onClose={closeModal} content={selectedPlan as any} />
    </div>
  );
};

export default PricingSection;
