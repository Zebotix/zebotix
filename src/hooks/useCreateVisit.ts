'use client';

import { useEffect } from 'react';

export function useCreateVisit() {
  useEffect(() => {
    const logVisit = async () => {
      try {
        const response = await fetch('/api/visits', {
          method: 'POST',
        });

        if (!response.ok) {
          console.error('Failed to log visit:', response.statusText);
        }
      } catch (err) {
        console.error('Error logging visit:', err);
      }
    };

    logVisit();
  }, []);
}
