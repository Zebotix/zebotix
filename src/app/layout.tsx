import type { Metadata } from 'next';
import './globals.css';
import React, { Suspense } from 'react';
import { Layout, StructuredData, GoogleAnalytics } from '@/components';

import Script from 'next/script';
import SmoothScrollProvider from '@/providers/SmoothScrollProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { cn } from '@/lib/utils';

import { COMPANY_NAME, SITE_URL, SHORT_DESC, SOCIAL_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY_NAME} — Empowering innovation with software & AI`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description: `${SHORT_DESC} Build responsive web apps, AI-driven products, and scalable systems with our expert team.`,
  applicationName: COMPANY_NAME,
  keywords: [
    COMPANY_NAME,
    'e-commerce solutions',
    'products showcasing and portfolios',
    'clothes selling websites',
    'business websites',
    'responsive websites',
    'web development services',
    'mobile app development',
    'web apps',
    'web design',
    'web development',
    'web solutions',
    'mobile apps',
    'web development company',
    'software development company',
    'AI solutions',
    'web application development',
    'machine learning services',
    'IT services',
    'custom software',
    'product engineering',
    'full-stack development',
  ],
  authors: [{ name: COMPANY_NAME, url: SITE_URL }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,
  icons: {
    icon: '/Zebotix.png',
    shortcut: '/Zebotix.png',
    apple: '/Zebotix.png',
  },
  manifest: '/favicon/site.webmanifest',
  verification: {
    google: process.env.GOOGLE_CONSOLE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: `${COMPANY_NAME} — Empowering innovation with software & AI`,
    description: SHORT_DESC,
    url: SITE_URL,
    siteName: COMPANY_NAME,
    type: 'website',
    images: [
      {
        url: '/Zebotix.png',
        width: 1200,
        height: 630,
        alt: `${COMPANY_NAME} — software and AI solutions`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${COMPANY_NAME} — Empowering innovation with software & AI`,
    description: SHORT_DESC,
    images: ['/Zebotix.png'],
    creator: '@zebotix1499',
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
    name: COMPANY_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/Zebotix.png`,
    sameAs: [SOCIAL_LINKS.twitter, SOCIAL_LINKS.github],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+92-337-8568671',
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
    name: COMPANY_NAME,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <StructuredData data={websiteJsonLd} />
        <Suspense fallback={null}>{GoogleAnalytics && <GoogleAnalytics />}</Suspense>
        {/* <Script
          id='Cookiebot'
          src='https://consent.cookiebot.com/uc.js'
          data-cbid='ac073247-713c-4261-9aac-a2e1d19d759a'
          data-blockingmode='auto'
          strategy='afterInteractive'
        />
        <Script
          id='CookieDeclaration'
          src='https://consent.cookiebot.com/ac073247-713c-4261-9aac-a2e1d19d759a/cd.js'
          strategy='lazyOnload'
        /> */}
        <meta
          name='google-site-verification'
          content='n3zhHWv55V2TBqwJtUEVc9-YMIGteykJyrSfCzQ57ck'
        />

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
          content={`${COMPANY_NAME} — Empowering innovation with software & AI`}
        />
        <meta property='og:description' content={SHORT_DESC} />
        <meta property='og:url' content={SITE_URL} />
        <meta property='og:site_name' content={COMPANY_NAME} />
        <meta property='og:image' content={`${SITE_URL}/Zebotix.png`} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@zebotix1499' />
        <meta
          name='twitter:title'
          content={`${COMPANY_NAME} — Empowering innovation with software & AI`}
        />
        <meta name='twitter:description' content={SHORT_DESC} />
        <meta name='twitter:image' content={`${SITE_URL}/Zebotix.png`} />
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

<<<<<<< HEAD
      <body className={cn('modal-scroll antialiased')}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          <SmoothScrollProvider>
            <Layout>{children}</Layout>
          </SmoothScrollProvider>
        </ThemeProvider>
=======
      <body className={`modal-scroll antialiased`} suppressHydrationWarning>
        <ScrollToHash />
        <Layout>{children}</Layout>
>>>>>>> 4c66256f69216bc8e9534e10def70f1c356b6776
      </body>
    </html>
  );
}
