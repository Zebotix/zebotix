'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function ContactPage() {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [message, setMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const liveRef = useRef(null);

  useEffect(() => {
    if (mounted) return;
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const CONTACT = {
    phone: '+92-337-8568671',
    email: 'zebotix@gmail.com',
    addressLine: 'Karachi, Pakistan',
    mapQuery: 'Zebotix,+Karachi+Pakistan',
    socials: {
      twitter: 'https://x.com/zebotix1499',
      facebook: 'https://www.facebook.com/people/Zebotix/61567313714101/',
      instagram: 'https://www.instagram.com/zebotix',
      github: 'https://github.com/Zebotix',
    },
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    setStatus('sending');
    setMessage('');

    const data = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      subject: e.target.subject.value.trim(),
      message: e.target.message.value.trim(),
      page: window.location.href,
    };

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      setStatus('error');
      setMessage('Please fill name, email, and message.');
      (liveRef as any).current?.focus();
      return;
    }

    // Try sending to your API route first (if you implement /api/contact)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        setMessage('Thanks — your message was sent. We will reply soon.');
        e.target.reset();
        (liveRef as any).current?.focus();
        return;
      }
      // if API not available or returns non-2xx, fallback:
      throw new Error('API failed');
    } catch (err) {
      // Fallback to mailto if API not implemented
      const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
        data.subject || 'New contact from website'
      )}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`;
      window.location.href = mailto;
      setStatus('idle');
      return;
    }
  }

  return (
    <>
      {/* JSON-LD structured data for LocalBusiness */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Zebotix',
            telephone: CONTACT.phone,
            email: CONTACT.email,
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Karachi',
              addressCountry: 'PK',
            },
            url:
              typeof window !== 'undefined'
                ? window.location.origin
                : 'https://zebotix.netlify.app',
            sameAs: Object.values(CONTACT.socials).filter(Boolean),
          }),
        }}
      />

      <main className='min-h-screen py-12 px-6 lg:px-20'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start'>
          {/* LEFT: Contact Form */}
          <section
            aria-labelledby='contact-heading'
            className='bg-white/5 p-6 rounded-2xl shadow-md'
          >
            <h1 id='contact-heading' className='text-2xl md:text-3xl font-extrabold mb-2'>
              Get in touch
            </h1>
            <p className='text-sm text-gray-300 mb-6'>
              Have a project or question? Send us a message — we typically reply within 1-2 business
              days.
            </p>

            <form
              onSubmit={handleSubmit}
              className='space-y-4'
              aria-describedby='contact-form-desc'
            >
              <p id='contact-form-desc' className='sr-only'>
                Required fields are name, email and message.
              </p>

              <div>
                <label htmlFor='name' className='block text-sm font-medium'>
                  Name <span aria-hidden='true'>*</span>
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  required
                  placeholder='your name'
                  className='mt-1 block w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-indigo-500'
                />
              </div>

              <div>
                <label htmlFor='email' className='block text-sm font-medium'>
                  Email <span aria-hidden='true'>*</span>
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  required
                  placeholder='you@example.com'
                  className='mt-1 block w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-indigo-500'
                />
              </div>

              <div>
                <label htmlFor='subject' className='block text-sm font-medium'>
                  Subject
                </label>
                <input
                  id='subject'
                  name='subject'
                  type='text'
                  placeholder='Project: e-commerce website'
                  className='mt-1 block w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-indigo-500'
                />
              </div>

              <div>
                <label htmlFor='message' className='block text-sm font-medium'>
                  Message <span aria-hidden='true'>*</span>
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows={6}
                  required
                  placeholder='Tell us about your project and timeline...'
                  className='mt-1 block w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-indigo-500'
                />
              </div>

              <div className='flex items-center gap-3'>
                <button
                  type='submit'
                  className='inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md px-4 py-2 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300'
                  aria-disabled={status === 'sending'}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>

                <button
                  type='button'
                  onClick={() => {
                    document.getElementById('name')?.focus();
                  }}
                  className='text-sm text-gray-300 underline'
                >
                  Reset focus
                </button>
              </div>

              {/* status message for screen readers and visible users */}
              <div
                role='status'
                aria-live='polite'
                tabIndex={-1}
                ref={liveRef}
                className={`text-sm mt-2 ${
                  status === 'success'
                    ? 'text-green-400'
                    : status === 'error'
                    ? 'text-rose-400'
                    : 'text-gray-300'
                }`}
              >
                {message}
              </div>
            </form>
          </section>

          {/* RIGHT: Contact details + map */}
          <aside className='space-y-6'>
            <div className='bg-white/5 p-6 rounded-2xl shadow-md'>
              <h2 className='text-lg font-semibold mb-3'>Contact details</h2>

              <dl className='space-y-3'>
                <div>
                  <dt className='text-xs font-medium text-gray-300'>Phone</dt>
                  <dd>
                    <a href={`tel:${CONTACT.phone}`} className='text-indigo-300 hover:underline'>
                      {CONTACT.phone}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className='text-xs font-medium text-gray-300'>Email</dt>
                  <dd>
                    <a href={`mailto:${CONTACT.email}`} className='text-indigo-300 hover:underline'>
                      {CONTACT.email}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className='text-xs font-medium text-gray-300'>Address</dt>
                  <dd className='text-gray-300'>{CONTACT.addressLine}</dd>
                </div>
              </dl>

              <div className='mt-4'>
                <h3 className='text-sm font-medium text-gray-300 mb-2'>Follow</h3>
                <div className='flex gap-3'>
                  {/* Accessible social links */}
                  <a
                    href={CONTACT.socials.twitter}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='X / Twitter'
                    className='invert p-2 rounded-md bg-white/3 hover:bg-black/5'
                  >
                    <Image src={'/icons/x.png'} alt='X / Twitter' width={18} height={18} priority />
                  </a>

                  <a
                    href={CONTACT.socials.facebook}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='LinkedIn'
                    className='invert p-2 rounded-md bg-white/3 hover:bg-black/5'
                  >
                    <Image
                      src='/icons/facebook.svg'
                      alt='Facebook'
                      width={18}
                      height={18}
                      priority
                    />
                  </a>

                  <a
                    href={CONTACT.socials.instagram}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Instagram'
                    className='invert p-2 rounded-md bg-white/3 hover:bg-black/5'
                  >
                    <Image
                      src='/icons/instagram.svg'
                      alt='Instagram'
                      width={18}
                      height={18}
                      priority
                    />
                  </a>

                  <a
                    href={CONTACT.socials.github}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='GitHub'
                    className='invert p-2 rounded-md bg-white/3 hover:bg-black/5'
                  >
                    <Image src='/icons/github.svg' alt='GitHub' width={18} height={18} priority />
                  </a>
                </div>
              </div>
            </div>
            {/* Map card */}
            <div className='rounded-2xl overflow-hidden border border-white/6'>
              <h3 className='px-4 pt-4 text-sm font-medium text-gray-300'>Our location</h3>
              <div className='h-56 md:h-72 w-full' role='region' aria-label='Zebotix location map'>
                <iframe
                  title='Zebotix location — Karachi'
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.119119060057!2d66.9517913743672!3d24.92801164255311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb36b3db19b7841%3A0x9235016aac7382a7!2sPolice%20family%20quater!5e0!3m2!1sen!2s!4v1760044931444!5m2!1sen!2s`}
                  width='100%'
                  height='100%'
                  style={{ border: 0 }}
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                />
              </div>
            </div>

            {/* Small trust / compliance note */}
            <div className='text-xs text-gray-400'>
              <p>
                We use secure channels for messages and do not store payment card details. For
                privacy and legal information, see our{' '}
                <a href='/privacy' className='text-indigo-300 hover:underline'>
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
