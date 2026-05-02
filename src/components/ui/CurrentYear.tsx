'use client';

import { useState, useEffect } from 'react';

/**
 * CurrentYear Component
 * A client component that renders the current year to avoid Next.js prerendering errors
 * in Server Components that use new Date().
 */
export function CurrentYear() {
  const [year, setYear] = useState<number | string>('2025');

  useEffect(() => {
    // Ensuring the year is updated on mount to match client-side time if needed,
    // though for copyright a simple mount-time calculation is usually sufficient.
    setYear(new Date().getFullYear());
  }, []);

  return <>{year}</>;
}
