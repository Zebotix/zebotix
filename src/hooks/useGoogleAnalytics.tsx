'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

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
      console.log(res);
      if (res.ok) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-JD55RSPP55';
        document.head.appendChild(script);
      }
    }
    loadGtag();

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', process.env.NEXT_PUBLIC_GA_ID || 'G-JD55RSPP55');
  }, []);

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID || 'G-JD55RSPP55', {
        page_path: url,
      });
      console.log('success');
    }
    console.log('failed');
  }, [pathname, searchParams]);
};
