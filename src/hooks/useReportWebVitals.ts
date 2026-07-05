'use client';

import { useEffect } from 'react';

import { reportWebVital, getMetricRating, type WebVital } from '@/lib/web-vitals';

/**
 * Hook to report Core Web Vitals metrics
 * Call this in your root layout to track performance metrics
 */
export function useReportWebVitals() {
  useEffect(() => {
    // Observer for Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
          renderTime?: number;
          loadTime?: number;
        };
        const lcpValue = lastEntry.renderTime || lastEntry.loadTime || 0;

        const metric: WebVital = {
          name: 'LCP',
          value: lcpValue,
          delta: 0,
          id: `lcp-${Date.now()}`,
          rating: getMetricRating('LCP', lcpValue),
          navigationType: performance.getEntriesByType('navigation')[0]?.toJSON().type,
        };

        reportWebVital(metric);
      });

      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      return () => lcpObserver.disconnect();
    } catch {
      // LCP observer not supported
    }
  }, []);

  useEffect(() => {
    // Observer for Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
          if (layoutShiftEntry.hadRecentInput) continue;
          clsValue += layoutShiftEntry.value || 0;
        }
      });

      clsObserver.observe({ type: 'layout-shift', buffered: true });

      // Report CLS when page is hidden or unloaded
      const reportCLS = () => {
        if (clsValue > 0) {
          const metric: WebVital = {
            name: 'CLS',
            value: clsValue,
            delta: clsValue,
            id: `cls-${Date.now()}`,
            rating: getMetricRating('CLS', clsValue),
          };

          reportWebVital(metric);
        }
      };

      document.addEventListener('visibilitychange', reportCLS);
      window.addEventListener('unload', reportCLS);

      return () => {
        clsObserver.disconnect();
        document.removeEventListener('visibilitychange', reportCLS);
        window.removeEventListener('unload', reportCLS);
      };
    } catch {
      // CLS observer not supported
    }
  }, []);

  useEffect(() => {
    // Observer for Interaction to Next Paint (INP)
    try {
      const inpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];

        const metric: WebVital = {
          name: 'INP',
          value: (lastEntry as PerformanceEntry).duration,
          delta: 0,
          id: `inp-${Date.now()}`,
          rating: getMetricRating('INP', (lastEntry as PerformanceEntry).duration),
        };

        reportWebVital(metric);
      });

      inpObserver.observe({ type: 'event', buffered: true });

      return () => inpObserver.disconnect();
    } catch {
      // INP observer not supported
    }
  }, []);

  useEffect(() => {
    // Measure First Input Delay (FID) using web-vitals pattern
    const onFirstInputEntry = (entry: PerformanceEventTiming) => {
      const metric: WebVital = {
        name: 'FID',
        value: entry.processingEnd - entry.startTime,
        delta: entry.processingEnd - entry.startTime,
        id: `fid-${Date.now()}`,
        rating: getMetricRating('FID', entry.processingEnd - entry.startTime),
      };

      reportWebVital(metric);
    };

    try {
      const po = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          onFirstInputEntry(entry as PerformanceEventTiming);
        }
      });

      po.observe({ type: 'first-input', buffered: true });
      return () => po.disconnect();
    } catch {
      // FID not supported
    }
  }, []);

  useEffect(() => {
    // Measure First Contentful Paint (FCP) and Time to First Byte (TTFB)
    const perfEntries = performance.getEntries();

    const fcpEntry = perfEntries.find((entry) => entry.name === 'first-contentful-paint');
    const navEntry = performance.getEntriesByType('navigation')[0];

    if (fcpEntry) {
      const metric: WebVital = {
        name: 'FCP',
        value: fcpEntry.startTime,
        delta: 0,
        id: `fcp-${Date.now()}`,
        rating: getMetricRating('FCP', fcpEntry.startTime),
      };

      reportWebVital(metric);
    }

    if (navEntry) {
      const ttfb =
        (navEntry as PerformanceNavigationTiming).responseStart -
          (navEntry as PerformanceNavigationTiming).requestStart || 0;

      if (ttfb > 0) {
        const metric: WebVital = {
          name: 'TTFB',
          value: ttfb,
          delta: 0,
          id: `ttfb-${Date.now()}`,
          rating: getMetricRating('TTFB', ttfb),
        };

        reportWebVital(metric);
      }
    }
  }, []);
}
