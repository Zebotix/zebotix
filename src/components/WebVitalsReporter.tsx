'use client';

import { useReportWebVitals } from '@/hooks';

/**
 * WebVitalsReporter Component
 * This component initializes web vitals reporting for the entire application
 * Place this in your root layout to start tracking performance metrics
 */
export function WebVitalsReporter() {
  useReportWebVitals();
  return null;
}
