import Head from 'next/head';

export default function CookiePolicy() {
  return (
    <main className='min-h-screen py-12 px-6 lg:px-24'>
      <article className='max-w-4xl mx-auto shadow-xl rounded-2xl p-8'>
        <header className='mb-8'>
          <h1 className='text-3xl font-extrabold mb-2'>Cookie Policy</h1>
          <p className='text-sm'>
            Last updated: <strong>October 2025</strong>
          </p>
        </header>

        <nav className='mb-6'>
          <h2 className='text-sm font-semibold text-gray-400 mb-2'>On this page</h2>
          <ul className='flex flex-wrap gap-3 text-sm'>
            <li>
              <a className='text-indigo-600 hover:underline' href='#what-are-cookies'>
                What are Cookies?
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#how-we-use'>
                How We Use Cookies
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#managing'>
                Managing Cookies
              </a>
            </li>
            <li>
              <a className='text-indigo-600 hover:underline' href='#third-party'>
                Third-Party Cookies
              </a>
            </li>
          </ul>
        </nav>

        <section id='what-are-cookies' className='prose prose-invert mb-6'>
          <h3>1. What Are Cookies?</h3>
          <p>
            Cookies are small text files placed on your device by websites you visit. They help the
            site remember your preferences, support essential functionality, and provide analytics
            about how the site is used.
          </p>
        </section>

        <section id='how-we-use' className='prose prose-invert mb-6'>
          <h3>2. How We Use Cookies</h3>
          <p>We use cookies for several purposes, including:</p>
          <ul>
            <li>
              <strong>Essential cookies:</strong> Required for core site functionality (sessions,
              security, load balancing). These cookies cannot be disabled if you want to use
              essential features.
            </li>
            <li>
              <strong>Analytics cookies:</strong> Used to understand visitor behaviour and improve
              performance. We typically use tools such as Google Analytics or similar services
              operating as our processors.
            </li>
            <li>
              <strong>Preference cookies:</strong> Remember your choices such as language, theme
              (including your dark/black theme preference), and other UI settings.
            </li>
          </ul>
        </section>

        <section id='managing' className='prose prose-invert mb-6'>
          <h3>3. Managing Cookies</h3>
          <p>
            When you first visit our site, you'll see a cookie banner that allows you to accept or
            reject non-essential cookies. You can change your preferences at any time via that
            banner or through your browser settings.
          </p>
          <p>
            Disabling cookies may limit some functionality — for example, your saved theme or
            language preferences might not persist between visits.
          </p>
          <p className='text-sm text-gray-400'>
            Useful links for managing cookies in popular browsers:
          </p>
          <ul className='text-sm text-gray-400'>
            <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
            <li>Firefox: Preferences → Privacy & Security → Cookies and Site Data</li>
            <li>Safari: Preferences → Privacy → Manage Website Data</li>
          </ul>
        </section>

        <section id='third-party' className='prose prose-invert mb-6'>
          <h3>4. Third-Party Cookies</h3>
          <p>
            Some cookies used on our site are set by third-party services (for example, embedded
            videos, analytics providers, or social widgets). These cookies are governed by the third
            party's own privacy policies and controls, which we do not control. We recommend
            reviewing those providers' policies if you have concerns about their cookies.
          </p>
        </section>

        <footer className='mt-8 border-t border-gray-800 pt-4 text-sm text-gray-400'>
          <p>
            Questions about cookies? Contact us at{' '}
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
