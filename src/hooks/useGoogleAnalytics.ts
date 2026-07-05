'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface GlobalThis {
    dataLayer?: unknown[][];
    gtag?: GtagFn;
  }
}

type GlobalWindow = typeof globalThis & {
  dataLayer?: unknown[][];
  gtag?: GtagFn;
};

export const useGoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views on route change
    const win = globalThis as GlobalWindow;
    if (typeof win.gtag === 'function') {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      win.gtag('config', process.env.NEXT_PUBLIC_GA_ID ?? 'G-JD55RSPP55', {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);
};
