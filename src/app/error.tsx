'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error Component for app-level errors
 * Handles errors within the app layout scope
 */
export default function ErrorPage({ error, reset }: Readonly<ErrorProps>) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className='min-h-[60vh] flex items-center justify-center px-4'>
      <div className='max-w-md w-full space-y-6 text-center'>
        <div className='space-y-2'>
          <h2 className='text-2xl font-bold text-white'>Something went wrong!</h2>
          <p className='text-gray-400'>
            We encountered an error while processing your request. Please try again or contact
            support.
          </p>
        </div>

        {/* Error Details in Development */}
        {process.env.NODE_ENV === 'development' && (
          <div className='bg-red-500/5 border border-red-500/20 rounded-lg p-3 text-left'>
            <p className='text-xs font-mono text-red-400 wrap-break-word'>{error.message}</p>
          </div>
        )}

        {/* Recovery Options */}
        <div className='flex gap-3 flex-col sm:flex-row pt-2'>
          <Button
            onClick={() => reset()}
            variant='outline'
            className='flex-1'
            aria-label='Retry the operation'
          >
            Try again
          </Button>
          <Button
            onClick={() => (window.location.href = '/')}
            variant='ghost'
            className='flex-1'
            aria-label='Go back to homepage'
          >
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
