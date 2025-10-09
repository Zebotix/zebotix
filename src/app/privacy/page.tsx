import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className='min-h-screen py-12 px-6 lg:px-24'>
      <article className='shadow-md rounded-2xl max-w-4xl mx-auto p-8'>
        <header className='mb-8'>
          <h1 className='text-3xl font-extrabold mb-2'>Privacy Policy</h1>
          <p className='text-sm'>
            Last updated: <strong>October 2025</strong>
          </p>
        </header>
        <nav className='mb-6'>
          <h2 className='text-sm font-semibold text-gray-400 mb-2'>On this page</h2>
          <ul className='flex flex-wrap gap-3 text-sm'>
            <li>
              <a className='text-indigo-600 hover:underline' href='#overview'>
                Overview
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#information-we-collect'>
                Information We Collect
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#how-we-use-information'>
                How We Use Information
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#data-protection'>
                Data Protection
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#sharing-information'>
                Sharing Information
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#your-rights'>
                Your Rights
              </a>
            </li>
          </ul>
        </nav>
        <section id='overview' className='mb-8'>
          <h2 className='text-2xl font-semibold mb-3'>1. Overview</h2>
          <p>
            Zebotix values your privacy. This policy explains how we collect, use, and protect your
            information when you visit our website or use our services.
          </p>
        </section>

        <section id='information-we-collect' className='mb-8'>
          <h2 className='text-2xl font-semibold mb-3'>2. Information We Collect</h2>
          <ul className='list-disc ml-6 space-y-2'>
            <li>Contact details (name, email, phone)</li>
            <li>Business information (company name, project details)</li>
            <li>Technical data (cookies, IP address, browser type)</li>
            <li>
              Payment details (processed securely via Stripe, PayPal, or other PCI-compliant
              providers — we do not store card numbers)
            </li>
          </ul>
        </section>

        <section id='how-we-use-information' className='mb-8'>
          <h2 className='text-2xl font-semibold mb-3'>3. How We Use Information</h2>
          <ul className='list-disc ml-6 space-y-2'>
            <li>To communicate and deliver requested services</li>
            <li>To process payments and issue invoices</li>
            <li>To improve user experience and site performance</li>
            <li>To comply with legal or tax obligations</li>
          </ul>
        </section>

        <section id='data-protection' className='mb-8'>
          <h2 className='text-2xl font-semibold mb-3'>4. Data Protection</h2>
          <p>
            We apply secure hosting, HTTPS encryption, and limited access control. Personal data is
            stored only as long as necessary and deleted upon written request.
          </p>
        </section>

        <section id='sharing-information' className='mb-8'>
          <h2 className='text-2xl font-semibold mb-3'>5. Sharing Information</h2>
          <p>
            We do not sell or trade personal data. Data may be shared only with trusted vendors or
            sub-processors (hosting, email, analytics) under strict confidentiality, or with legal
            authorities when required by law.
          </p>
        </section>

        <section id='your-rights' className='mb-8'>
          <h2 className='text-2xl font-semibold mb-3'>6. Your Rights (GDPR/EU Clients)</h2>
          <p>
            You may request access, correction, or deletion of your personal data by contacting us
            at{' '}
            <a href='mailto:zebotix@gmail.com' className='underline'>
              zebotix@gmail.com
            </a>
            . We respond within 30 days.
          </p>
        </section>

        <footer className='mt-8 border-t pt-4 text-sm text-gray-600'>
          <p>
            Questions about these Privacy Polices? Contact us at{' '}
            <a href='mailto:zebotix@gmail.com' className='text-indigo-600 hover:underline'>
              zebotix@gmail.com
            </a>
            .
          </p>
        </footer>
      </article>
    </main>
  );
}
