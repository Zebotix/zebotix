/**
 * Core Web Vitals Monitoring
 * Tracks Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS),
 * and First Input Delay (FID) metrics
 */

export interface WebVital {
  name: string;
  delta: number;
  value: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
  navigationType?: string;
}

/**
 * Sends web vitals data to your analytics service
 * Customize this to send to your preferred analytics provider
 */
export function reportWebVital(metric: WebVital) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    const rounded = {
      ...metric,
      value: Math.round(metric.value),
      delta: Math.round(metric.delta),
    };
    // eslint-disable-next-line no-console
    console.log('[Web Vital]', rounded);
  }

  // Send to analytics (customize based on your provider)
  // Example: Send to Google Analytics
  if (typeof window !== 'undefined' && (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag) {
    const vitals = {
      event_category: 'web_vitals',
      value: Math.round(metric.value),
      event_label: `${metric.name}:${metric.rating}:${metric.id}`,
      non_interaction: true,
    };

    (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag('event', metric.name, vitals);
  }

  // Send to custom endpoint
  // Example: POST to your backend for monitoring
  if (navigator.sendBeacon) {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    });

    // Only send in production
    if (process.env.NODE_ENV === 'production') {
      navigator.sendBeacon('/api/vitals', body);
    }
  }
}

/**
 * Performance metrics thresholds
 * Based on Google's Web Vitals guidelines
 */
export const VITALS_THRESHOLDS = {
  LCP: {
    good: 2500, // 2.5s
    'needs-improvement': 4000, // 4s
  },
  FID: {
    good: 100, // 100ms
    'needs-improvement': 300, // 300ms
  },
  CLS: {
    good: 0.1,
    'needs-improvement': 0.25,
  },
  INP: {
    good: 200, // 200ms
    'needs-improvement': 500, // 500ms
  },
  TTFB: {
    good: 800, // 800ms
    'needs-improvement': 1800, // 1.8s
  },
};

/**
 * Get rating based on metric value and thresholds
 */
export function getMetricRating(
  metricName: string,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = VITALS_THRESHOLDS[metricName as keyof typeof VITALS_THRESHOLDS];

  if (!thresholds) return 'poor';

  if (value <= thresholds.good) return 'good';
  if (value <= thresholds['needs-improvement']) return 'needs-improvement';
  return 'poor';
}

/**
 * Format metric value for display
 */
export function formatMetricValue(name: string, value: number): string {
  switch (name) {
    case 'CLS':
    case 'INP':
    case 'TTFB':
      return `${value.toFixed(2)}`;
    default:
      return `${Math.round(value)}ms`;
  }
}
