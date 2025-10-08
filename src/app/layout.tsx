import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import Layout from '@/components/layout/Layout';

const SITE_URL = 'https://zebotix.netlify.app'; // <-- update to your canonical domain
const Company = 'Zebotix';
const SHORT_DESC =
  'Zebotix — software & AI solutions that power modern businesses: web apps, ML, and custom IT services.';

export const metadata: Metadata = {
  title: {
    default: `${Company} — Empowering innovation with software & AI`,
    template: `%s | ${Company}`,
  },
  description:
    SHORT_DESC +
    ' Build responsive web apps, AI-driven products, and scalable systems with our expert team.',
  applicationName: Company,
  keywords: [
    'Zebotix',
    'software development company',
    'AI solutions',
    'web application development',
    'machine learning services',
    'IT services',
    'custom software',
    'product engineering',
    'full-stack development',
  ],
  authors: [{ name: 'Zebotix', url: SITE_URL }],
  icons: {
    icon: '/Zebotix.png',
    apple: '/icons/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${Company} — Empowering innovation with software & AI`,
    description: SHORT_DESC,
    url: SITE_URL,
    siteName: Company,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image-1200x630.png`,
        width: 1200,
        height: 630,
        alt: 'Zebotix — software and AI solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${Company} — Empowering innovation with software & AI`,
    description: SHORT_DESC,
    images: [`${SITE_URL}/og-image-1200x630.png`],
    creator: '@ZebotixOfficial', // update or remove
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: Company,
    url: SITE_URL,
    logo: `${SITE_URL}/Zebotix.png`,
    sameAs: [
      /* add company social URLs here: "https://twitter.com/..", "https://www.linkedin.com/..", etc. */
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+92-XXX-XXXXXXX', // update or remove
        contactType: 'customer service',
        areaServed: 'PK',
        availableLanguage: 'English',
      },
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE_URL,
    name: Company,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#0ea5a4' />
        <meta name='msapplication-TileColor' content='#0ea5a4' />
        <link rel='manifest' href='/favicon/site.webmanifest' />
        <link rel='icon' href='/Zebotix.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/Zebotix.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/Zebotix.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/Zebotix.png' />
        <link rel='mask-icon' href='/Zebotix.png' color='#0ea5a4' />
        <link rel='canonical' href={SITE_URL} />
        <meta name='robots' content='index, follow' />
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content={`${Company} — Empowering innovation with software & AI`}
        />
        <meta property='og:description' content={SHORT_DESC} />
        <meta property='og:url' content={SITE_URL} />
        <meta property='og:site_name' content={Company} />
        <meta property='og:image' content={`${SITE_URL}/Zebotix.png`} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@ZebotixOfficial' />
        <meta
          name='twitter:title'
          content={`${Company} — Empowering innovation with software & AI`}
        />
        <meta name='twitter:description' content={SHORT_DESC} />
        <meta name='twitter:image' content={`${SITE_URL}/Zebotix.png`} />
        <link rel='preconnect' href='https://fonts.googleapis.com' crossOrigin='' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
        {/* <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
          rel='stylesheet'
        />
        <link
          rel='preload'
          href='/fonts/Inter-Variable.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        /> */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='mobile-web-app-capable' content='yes' />
      </head>

      <body className={`modal-scroll antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
