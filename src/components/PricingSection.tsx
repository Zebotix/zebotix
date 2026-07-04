'use client';

import { Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { Reveal } from '@/components/animations';
import { Button } from '@/components/ui';
import { PRICING_PLANS } from '@/lib/mockData';
import { cn } from '@/lib/utils';

type ModalType = {
  open: boolean;
  onClose: () => void;
  content: any;
};

interface PricingSectionProps {
  pricingPlans?: any[];
}

const Modal = ({ open, onClose, content }: ModalType) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    modalRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }

    if (e.key === 'Tab') {
      const container = modalRef.current;
      if (!container) return;
      const focusable = container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first) {
        e.preventDefault();
        return;
      }
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
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
      <div
        className='fixed inset-0 bg-black/80 backdrop-blur-xs z-40'
        onClick={onClose}
        aria-hidden='true'
      />
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='plan-modal-title'
        className='fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-auto'
        onKeyDown={handleKeyDown}
      >
        <div
          ref={modalRef}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          className='modal-scroll w-full max-w-3xl mx-auto bg-zebotix-darkGray rounded-3xl p-8 shadow-2xl text-gray-200 max-h-[90vh] overflow-auto border border-white/10'
        >
          <div className='flex items-start justify-between mb-8'>
            <div>
              <h3 id='plan-modal-title' className='text-3xl font-bold text-white mb-2'>
                {content.name} — {content.pricePKR}
              </h3>
              <p className='text-gray-400'>{content.short}</p>
            </div>
            <button
              onClick={onClose}
              aria-label='Close details'
              className='p-2 rounded-full hover:bg-white/10 transition-colors'
            >
              <X className='h-6 w-6' />
            </button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-sm'>
            <div className='space-y-6'>
              <div>
                <strong className='text-white block mb-2'>Deliverables</strong>
                <p className='text-gray-400 leading-relaxed'>{content.details.deliverables}</p>
              </div>
              {content.details.content && (
                <div>
                  <strong className='text-white block mb-2'>Content Strategy</strong>
                  <p className='text-gray-400 leading-relaxed'>{content.details.content}</p>
                </div>
              )}
              {content.details.exclusions && (
                <div>
                  <strong className='text-white block mb-2'>Exclusions & Hosting</strong>
                  <p className='text-gray-400 leading-relaxed'>{content.details.exclusions}</p>
                </div>
              )}
            </div>

            <div className='space-y-6'>
              <div>
                <strong className='text-white block mb-2'>Delivery & Support</strong>
                <p className='text-gray-400 leading-relaxed'>{content.details.delivery}</p>
                <p className='text-gray-400 leading-relaxed mt-2'>{content.details.support}</p>
              </div>
              <div>
                <strong className='text-white block mb-2'>Optional Add-ons</strong>
                <ul className='space-y-2 text-gray-400'>
                  {content.details.addons.map((a: string, i: number) => (
                    <li key={i} className='flex items-start gap-2'>
                      <span className='w-1.5 h-1.5 rounded-full bg-zebotix-blue mt-1.5 shrink-0' />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className='mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-end gap-4'>
            <Button variant='ghost' onClick={onClose} className='text-gray-400 hover:text-white'>
              Go Back
            </Button>
            <Button
              onClick={() => router.push('/contact')}
              className='bg-zebotix-blue hover:bg-blue-600 text-white px-8 h-12'
            >
              Proceed with {content.name}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const PricingSection = ({ pricingPlans }: PricingSectionProps) => {
  const plans = pricingPlans || PRICING_PLANS;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const openDetails = (planId: string) => {
    const p = plans.find((x: any) => x.id === planId);
    setSelectedPlan(p);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPlan(null);
  };

  const router = useRouter();

  return (
    <section
      id='pricing'
      className='bg-linear-to-b from-zebotix-darkGray to-zebotix-black py-16 md:py-24 overflow-hidden'
    >
      <div className='section-container'>
        <div className='text-center max-w-3xl mx-auto mb-16'>
          <Reveal>
            <h2 className='text-3xl md:text-5xl font-bold mb-4 text-white'>
              Simple,{' '}
              <span className='bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>
                Transparent
              </span>{' '}
              Pricing
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className='text-gray-400 text-lg'>
              Choose the plan that fits your business stage. No hidden costs, just pure digital
              growth.
            </p>
          </Reveal>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {plans.map((plan: any, index: number) => (
            <Reveal key={plan.id} delay={0.1 * index} distance={40} className='h-full'>
              <div
                className={cn(
                  'flex flex-col justify-between rounded-3xl p-8 h-full transition-all duration-500 shadow-2xl',
                  plan.name.includes('recommended')
                    ? 'bg-linear-to-b from-blue-900/20 to-zebotix-black border-2 border-zebotix-blue relative'
                    : 'bg-zebotix-darkGray border border-gray-800'
                )}
              >
                {plan.name.includes('recommended') && (
                  <span className='absolute -top-4 left-1/2 -translate-x-1/2 bg-zebotix-blue text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter'>
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className='text-2xl font-bold mb-2 text-white'>{plan.name}</h3>
                  <p className='text-gray-400 text-sm mb-6 leading-relaxed'>{plan.short}</p>

                  <div className='mb-8'>
                    <div className='text-3xl font-black text-white'>{plan.pricePKR}</div>
                    <div className='text-[10px] uppercase tracking-widest text-gray-500 mt-1'>
                      Starting price / One-time
                    </div>
                  </div>

                  <ul className='space-y-4 mb-10'>
                    {plan.features.map((feature: string, i: number) => (
                      <li key={i} className='flex items-start text-sm'>
                        <div className='bg-zebotix-blue/20 rounded-full p-1 mr-3 mt-0.5'>
                          <Check className='h-3 w-3 text-zebotix-blue' />
                        </div>
                        <span className='text-gray-300'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='flex flex-col gap-3'>
                  <Button
                    size='lg'
                    onClick={() => router.push('/contact')}
                    className={cn(
                      'w-full h-12 rounded-xl font-bold transition-all',
                      plan.name.includes('recommended')
                        ? 'bg-zebotix-blue hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                    )}
                  >
                    {plan.name === 'Enterprise' ? 'Custom Quote' : 'Get Started'}
                  </Button>

                  <button
                    onClick={() => openDetails(plan.id)}
                    className='w-full text-xs font-medium text-gray-500 hover:text-white transition-colors py-2'
                  >
                    View Full Scope & Add-ons
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal open={modalOpen} onClose={closeModal} content={selectedPlan} />
    </section>
  );
};

export default PricingSection;
