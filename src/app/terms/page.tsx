import Head from 'next/head';

export default function Terms() {
  return (
    <main className='min-h-screen py-12 px-6 lg:px-24'>
      <article className='max-w-4xl mx-auto shadow-md rounded-2xl p-8'>
        <header className='mb-8'>
          <h1 className='text-3xl font-extrabold mb-2'>Terms &amp; Conditions</h1>
          <p className='text-sm '>
            Last updated: <strong>October 2025</strong>
          </p>
        </header>

        <nav className='mb-6'>
          <h2 className='text-sm font-semibold text-gray-400 mb-2'>On this page</h2>
          <ul className='flex flex-wrap gap-3 text-sm'>
            <li>
              <a className='text-indigo-600 hover:underline' href='#introduction'>
                Introduction
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#services'>
                Services &amp; Deliverables
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#payment'>
                Payment &amp; Pricing
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#ip'>
                Intellectual Property
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#revisions'>
                Revisions
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#confidentiality'>
                Confidentiality
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#liability'>
                Liability &amp; Warranty
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#cancellation'>
                Cancellation &amp; Disputes
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#force-majeure'>
                Force Majeure
              </a>
            </li>
          </ul>
        </nav>

        <section id='introduction' className='prose prose-slate mb-6'>
          <h3>1. Introduction</h3>
          <p>
            These Terms and Conditions (“<strong>Terms</strong>”) govern the use of all services,
            products, and digital assets provided by <strong>Zebotix</strong> (“Supplier”, “we”,
            “our”, “us”) to its clients (“Client”, “you”). By engaging our services or accessing our
            website, you agree to these Terms.
          </p>
        </section>

        <section id='services' className='prose prose-slate mb-6'>
          <h3>2. Services &amp; Deliverables</h3>
          <p>
            All project scopes, deliverables, and timelines will be outlined in the proposal or
            Statement of Work (SOW). Any change in scope after approval will require a formal Change
            Request and may affect pricing and timelines.
          </p>
          <ul>
            <li>
              Deliverables will be accepted in the form agreed in the SOW (staging URL, repository
              access, or build artifacts).
            </li>
            <li>
              Delivery dates are estimated and depend on timely client feedback and provision of
              assets.
            </li>
          </ul>
        </section>

        <section id='payment' className='prose prose-slate mb-6'>
          <h3>3. Payment &amp; Pricing</h3>
          <p>
            <strong>Payment Schedule:</strong> 50% upfront, 40% upon staging/design approval, 10%
            upon final acceptance.
          </p>
          <p>
            <strong>Currency:</strong> All payments in PKR (Pakistani Rupees) unless otherwise
            stated.
          </p>
          <p>
            <strong>Late Fees:</strong> 2% monthly interest applies on overdue invoices after 15
            days.
          </p>
          <p>
            <strong>Refunds:</strong> See Refund Policy section.
          </p>
          <p>
            <strong>Invoices:</strong> Prices exclude applicable taxes; invoices are issued
            electronically.
          </p>
        </section>

        <section id='ip' className='prose prose-slate mb-6'>
          <h3>4. Intellectual Property (IP)</h3>
          <p>
            Upon full payment, all rights and ownership of deliverables created specifically for the
            Client transfer to the Client. Zebotix retains ownership of any pre-existing tools,
            frameworks, or libraries used. Zebotix may display completed work in its portfolio
            unless an NDA restricts it.
          </p>
          <p>
            <strong>Third-party components:</strong> Any third-party or open-source components used
            are subject to their respective licenses. Client is responsible for any paid third-party
            license fees.
          </p>
        </section>

        <section id='revisions' className='prose prose-slate mb-6'>
          <h3>5. Revisions &amp; Change Requests</h3>
          <p>
            Projects include limited revisions as agreed. Additional requests altering scope or
            functionality are billed at standard hourly or fixed rates. Revision rounds for UI/copy
            adjustments are defined in each proposal.
          </p>
        </section>

        <section id='confidentiality' className='prose prose-slate mb-6'>
          <h3>6. Confidentiality &amp; NDA</h3>
          <p>
            Zebotix treats all client information as confidential. If required, a separate NDA can
            be signed before work begins. Data is stored securely and shared only with authorized
            personnel.
          </p>
        </section>

        <section id='liability' className='prose prose-slate mb-6'>
          <h3>7. Liability &amp; Warranty</h3>
          <p>
            Zebotix provides a 30-day bug-fix warranty after launch for defects reported in writing.
            Our total liability is capped at the total fees paid for the specific project. We are
            not liable for indirect losses, third-party failures, or content provided by the Client.
          </p>
        </section>

        <section id='cancellation' className='prose prose-slate mb-6'>
          <h3>8. Cancellation &amp; Disputes</h3>
          <p>
            Either party may terminate with written notice. Refunds are issued per the Refund
            Policy. Any disputes shall first go through mediation. Governing law is{' '}
            <strong>Pakistan</strong>, with jurisdiction in <strong>Karachi courts</strong>.
          </p>
        </section>

        <section id='force-majeure' className='prose prose-slate mb-6'>
          <h3>9. Force Majeure</h3>
          <p>
            Neither party is liable for delays caused by events beyond reasonable control (natural
            disasters, cyberattacks, government restrictions, etc.). In such cases, affected
            timelines will be extended commensurately and parties will cooperate to minimize
            disruption.
          </p>
        </section>

        <footer className='mt-8 border-t pt-4 text-sm text-gray-600'>
          <p>
            Questions about these Terms? Contact us at{' '}
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
