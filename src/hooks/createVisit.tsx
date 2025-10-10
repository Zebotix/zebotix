'use client';

import { useEffect } from 'react';

export default function CreateVisit() {
  useEffect(() => {
    async function logVisit() {
      const response = await fetch('/api/visits', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Failed to log visit');
      }
    }
    logVisit();
  }, []);

  return null;
}
