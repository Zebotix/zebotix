'use client';

import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import { useEffect } from 'react';

export default function GoogleAnalytics() {
  useGoogleAnalytics();
  return null;
}
