'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface GlobalThis {
    trackingFunctions?: {
      onLoad?: (opts: { appId: string }) => void;
    };
    // gtag pushes arrays of arguments into the dataLayer, so dataLayer is an array of arg-arrays
    dataLayer?: unknown[][];
    gtag?: GtagFn;
  }
}

type GlobalWindow = typeof globalThis & {
  trackingFunctions?: { onLoad?: (opts: { appId: string }) => void };
  dataLayer?: unknown[][];
  gtag?: GtagFn;
};

export const useGoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Load gtag script
    async function loadGtag() {
      const res = await fetch(
        `https://www.googletagmanager.com/gtag/js?id=${
          process.env.NEXT_PUBLIC_GA_ID || 'G-JD55RSPP55'
        }`
      );

      if (res.ok) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-JD55RSPP55';
        document.head.appendChild(script);
      }
    }
    loadGtag().catch(() => undefined);

    // Load Apollo tracker script
    function loadApollo() {
      if (typeof globalThis === 'undefined') return;
      const win = globalThis as GlobalWindow;
      const n = Math.random().toString(36).substring(7);
      const o = document.createElement('script');
      o.src = `https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=${n}`;
      o.async = true;
      o.defer = true;
      o.onload = function () {
        try {
          if (win.trackingFunctions && typeof win.trackingFunctions.onLoad === 'function') {
            win.trackingFunctions.onLoad({ appId: '697851b7dfd262000d555d78' });
          }
        } catch (e) {
          // swallow any errors to avoid breaking app
          // eslint-disable-next-line no-console
          console.warn('Apollo tracker onLoad error', e);
        }
      };
      document.head.appendChild(o);
    }
    loadApollo();

    // Initialize gtag
    const win = globalThis as GlobalWindow;
    const dataLayer: unknown[][] = win.dataLayer ?? [];
    // ensure the global dataLayer references the same array
    win.dataLayer = dataLayer;

    function gtag(...args: unknown[]) {
      dataLayer.push(args);
    }

    // expose a global gtag compatible function if consumer scripts expect it
    if (typeof win.gtag !== 'function') {
      win.gtag = gtag;
    }

    gtag('js', new Date());
    gtag('config', process.env.NEXT_PUBLIC_GA_ID ?? 'G-JD55RSPP55');
  }, []);

  useEffect(() => {
    // Track page views
    const win = globalThis as GlobalWindow;
    if (typeof win.gtag === 'function') {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      win.gtag('config', process.env.NEXT_PUBLIC_GA_ID ?? 'G-JD55RSPP55', {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);
};
