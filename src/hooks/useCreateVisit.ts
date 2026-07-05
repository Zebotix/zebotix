'use client';

import { useEffect } from 'react';

import { logVisitAction } from '@/app/actions/visits';

export function useCreateVisit() {
  useEffect(() => {
    const logVisit = async () => {
      try {
        const pathName = window.location.pathname;
        const queryParams = Object.fromEntries(new URLSearchParams(window.location.search));
        
        const response = await logVisitAction(pathName, queryParams);

        if (!response.success) {
          console.error('Failed to log visit:', response.error);
        }
      } catch (err) {
        console.error('Error logging visit:', err);
      }
    };

    logVisit().catch(() => undefined);
  }, []);
}
