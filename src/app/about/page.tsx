import Image from 'next/image';

export default function About() {
  return (
    <main className='min-h-screen py-12 px-6 lg:px-24'>
      <article className='max-w-4xl mx-auto shadow-xl rounded-2xl p-2'>
        <header className='min-h-[20vh] flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-extrabold mb-2'>About Zebotix</h1>
            <p className='text-sm text-gray-400'>
              Last updated: <strong>October 2025</strong>
            </p>
          </div>
          <Image
            src="/Zebotix.webp"
            alt='zebotix'
            width={500}
            height={500}
            className='w-16 h-auto'
            priority
          />
        </header>

        <section className='mb-6'>
          <h2 className='text-xl font-semibold mb-2'>Who we are</h2>
          <p className='text-sm text-gray-400'>
            Zebotix is a Karachi-based digital services studio that builds web and mobile products,
            e-commerce stores, and tailored business systems for local and international clients. We
            combine pragmatic engineering, product design, and digital marketing to help small &
            medium-sized businesses launch quickly and scale sustainably.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-xl font-semibold mb-2'>Our mission & vision</h2>
          <p className='text-sm text-gray-400'>
            <strong>Mission:</strong> Enable Pakistani businesses to compete globally by delivering
            reliable, compliant, and easy-to-run digital products.
          </p>
          <p className='text-sm text-gray-400 mt-2'>
            <strong>Vision:</strong> Be the trusted partner for marketplaces, e-commerce brands,
            service businesses, and startups seeking fast, secure, and legally-compliant digital
            solutions from Pakistan.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-xl font-semibold mb-2'>What we do</h2>
          <p className='text-sm text-gray-400'>Core services we offer:</p>
          <ul className='list-disc ml-6 mt-3 text-sm text-gray-400 space-y-2'>
            <li>Custom E‑commerce & Multi‑vendor Marketplaces</li>
            <li>Fashion & Seasonal Stores (winter collections, perfumes, cosmetics)</li>
            <li>Learning Management Systems (LMS) & Training Portals</li>
            <li>Hotel & Hospitality Management Systems</li>
            <li>Finance, Invoicing & Small ERP solutions</li>
            <li>CRM, Helpdesk & Customer Support Platforms</li>
            <li>Mobile apps (PWA & native) and field‑force tools</li>
            <li>Data Analytics, BI dashboards & integrations</li>
            <li>Hosting, Maintenance & SLAs (optional)</li>
          </ul>
        </section>

        <section className='mb-6'>
          <h2 className='text-xl font-semibold mb-2'>How we work — our process</h2>
          <ol className='list-decimal ml-6 space-y-3 text-sm text-gray-400'>
            <li>
              <strong>Discovery &amp; Proposal:</strong> We collect requirements, scope features,
              propose milestones and agree on payment schedule (typical: 50% upfront, 40% staging,
              10% final).
            </li>
            <li>
              <strong>Design &amp; Development:</strong> Agile sprints with regular demos on staging
              URLs; UAT window for acceptance (usually 5 business days per milestone).
            </li>
            <li>
              <strong>Launch &amp; Handover:</strong> Production deployment, repository access
              (Enterprise plans), documentation, and handover checklist (README, runbook, deployment
              scripts).
            </li>
            <li>
              <strong>Support &amp; Maintenance:</strong> Optional 30/60/90-day support windows and
              paid maintenance plans with defined SLAs for response time and uptime targets.
            </li>
          </ol>
        </section>

        <section className='mb-6'>
          <h2 className='text-xl font-semibold mb-2'>Trust, compliance & security</h2>
          <p className='text-sm text-gray-400'>
            We publish and adhere to standard legal and security documents to build trust with
            clients and end users. Key items include:
          </p>
          <ul className='list-disc ml-6 mt-3 text-sm text-gray-400 space-y-2'>
            <li>
              Terms &amp; Conditions — project terms, payment, IP, liability, and dispute clauses
            </li>
            <li>Privacy Policy &amp; Cookie Policy — how data is collected and cookies handled</li>
            <li>
              GDPR / DPA — Data Processing Agreement for EU/EEA clients; breach notification within
              72 hours
            </li>
            <li>
              PCI statement — we use PCI-compliant payment processors; we do not store card data
            </li>
            <li>Security practices — HTTPS, secure hosting, access control, and regular backups</li>
          </ul>
        </section>

        <section className='mb-6'>
          <h2 className='text-xl font-semibold mb-2'>Pricing & payments (summary)</h2>
          <p className='text-sm text-gray-400'>
            Standard payment schedule used in proposals: <strong>50% upfront</strong>,
            <strong> 40% on staging/design approval</strong>,{' '}
            <strong>10% on final acceptance</strong>. All payments are by default in{' '}
            <strong>PKR</strong>. Late payments incur 2% monthly interest after 15 days. Invoices
            are issued electronically and exclude applicable taxes.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-xl font-semibold mb-2'>Portfolio &amp; clients</h2>
          <p className='text-sm text-gray-400'>
            We work with local Karachi businesses, online retailers, and international clients. We
            retain the right to showcase delivered work in our portfolio unless an NDA is in place.
            For case studies or references, please contact us.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-xl font-semibold mb-2'>Onboarding checklist (quick)</h2>
          <ul className='list-disc ml-6 mt-3 text-sm text-gray-400 space-y-2'>
            <li>Signed contract + upfront payment</li>
            <li>Complete brief, sitemap, branding assets</li>
            <li>
              Credentials &amp; access (hosting, domain registrar, analytics, email) — share via
              secure means/password manager
            </li>
            <li>Weekly progress updates and staging URL for review</li>
          </ul>
        </section>

        <section className='mb-6'>
          <h2 className='text-xl font-semibold mb-2'>Contact &amp; support</h2>

          <a href='mailto:zebotix@gmail.com' className='indent-4 text-indigo-600 hover:underline'>
            zebotix@gmail.com
          </a>
        </section>

        <footer className='mt-8 border-t pt-4 text-sm text-gray-400'>
          <p>
            Have feedback or want this page tailored (Urdu version, downloadable PDF, or shorter
            copy for marketing)? Tell me what you prefer and I will update it.
          </p>
        </footer>
      </article>
    </main>
  );
}
