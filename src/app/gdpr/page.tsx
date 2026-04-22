export default function GDPR() {
  return (
    <main className='min-h-screen py-12 px-6 lg:px-24'>
      <article className='max-w-4xl mx-auto shadow-xl rounded-2xl p-8'>
        <header className='mb-8'>
          <h1 className='text-3xl font-extrabold mb-2'>GDPR / Data Processing Agreement (DPA)</h1>
          <p className='text-sm'>
            Last updated: <strong>October 2025</strong>
          </p>
        </header>

        <nav className='mb-6'>
          <h2 className='text-sm font-semibold text-gray-400 mb-2'>On this page</h2>
          <ul className='flex flex-wrap gap-3 text-sm'>
            <li>
              <a className='text-indigo-600 hover:underline' href='#purpose'>
                Purpose
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#scope'>
                Data Processing Scope
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#processor-resp'>
                Processor Responsibilities
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#sub-processors'>
                Sub-processors
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#transfers'>
                Data Transfers
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#termination'>
                Termination
              </a>
            </li>
          </ul>
        </nav>

        <section id='purpose' className='prose prose-invert mb-6'>
          <h3>1. Purpose</h3>
          <p>
            This Data Processing Agreement (“<strong>DPA</strong>”) outlines how{' '}
            <strong>Zebotix</strong>, acting as a data processor, handles personal data on behalf of
            the Client (data controller) in compliance with the EU General Data Protection
            Regulation (<strong>GDPR</strong>).
          </p>
        </section>

        <section id='scope' className='prose prose-invert mb-6'>
          <h3>2. Data Processing Scope</h3>
          <p>
            <strong>Data types:</strong> Client names, email addresses, usage data, website content,
            and any other personal data provided in the course of the Services.
          </p>
          <p>
            <strong>Purpose:</strong> Processing is carried out to provide digital, design, and
            development services as described in the applicable contract or SOW.
          </p>
          <p>
            <strong>Duration:</strong> Personal data will be processed for the term of the
            engagement and until termination or until a lawful deletion request is fulfilled,
            subject to any legal retention obligations.
          </p>
        </section>

        <section id='processor-resp' className='prose prose-invert mb-6'>
          <h3>3. Processor Responsibilities</h3>
          <p>Zebotix will:</p>
          <ul>
            <li>Process personal data only under the Client’s documented instructions.</li>
            <li>
              Maintain appropriate technical and organizational security measures to protect
              personal data.
            </li>
            <li>Ensure confidentiality and restrict access to authorised personnel only.</li>
            <li>
              Assist the Client with data subject requests and compliance obligations where
              reasonable and feasible.
            </li>
            <li>
              Notify the Client of any personal data breach affecting the Client's data within{' '}
              <strong>72 hours</strong> of discovery.
            </li>
          </ul>
        </section>

        <section id='sub-processors' className='prose prose-invert mb-6'>
          <h3>4. Sub-processors</h3>
          <p>
            Zebotix may engage trusted sub-processors (for example, hosting providers, email
            services, or cloud storage vendors) to assist in providing services. Zebotix will ensure
            that any sub-processor is bound by obligations at least as protective as those in this
            DPA.
          </p>
        </section>

        <section id='transfers' className='prose prose-invert mb-6'>
          <h3>5. Data Transfers</h3>
          <p>
            If personal data is transferred outside the EU/EEA, Zebotix will implement appropriate
            safeguards such as Standard Contractual Clauses (SCCs) or other lawful transfer
            mechanisms to ensure an adequate level of protection for the data.
          </p>
        </section>

        <section id='termination' className='prose prose-invert mb-6'>
          <h3>6. Termination</h3>
          <p>
            Upon termination of the contract, Zebotix will, at the Client's choice, return or
            securely delete all personal data processed on behalf of the Client, unless retention is
            required by law.
          </p>
        </section>

        <footer className='mt-8 border-t border-gray-200 pt-4 text-sm text-gray-600'>
          <p>
            For questions about this DPA or GDPR compliance, contact us at{' '}
            <a href='mailto:privacy@zebotix.com' className='text-indigo-600 hover:underline'>
              privacy@zebotix.com
            </a>
            .
          </p>
        </footer>
      </article>
    </main>
  );
}
