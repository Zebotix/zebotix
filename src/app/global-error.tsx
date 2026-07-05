"use client";

import Link from "next/link";
import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global Error Component
 * Catches unhandled errors across the entire application
 * Provides user-friendly error page with recovery options
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log error for monitoring/debugging
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-linear-to-br from-gray-900 via-black to-gray-900">
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full space-y-8 text-center">
            {/* Error Icon */}
            <div className="mx-auto w-20 h-20 bg-red-500/10 rounded-lg flex items-center justify-center">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4v2m0 0v2m0-10V7a1 1 0 011-1h2a1 1 0 011 1v2m0 0V7a1 1 0 011-1h2a1 1 0 011 1v2"
                />
              </svg>
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-white">Oops! Something went wrong</h1>
              <p className="text-gray-400 text-sm">
                We encountered an unexpected error. Our team has been notified and we're working on
                it.
              </p>
            </div>

            {/* Error Details (Development only) */}
            {process.env.NODE_ENV === "development" && error.message && (
              <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4 text-left">
                <p className="text-xs font-mono text-red-400 wrap-break-word">{error.message}</p>
                {error.digest && (
                  <p className="text-xs font-mono text-gray-500 mt-2">Error ID: {error.digest}</p>
                )}
              </div>
            )}

            {/* Error Digest Info */}
            {error.digest && (
              <p className="text-xs text-gray-600">
                Reference ID: <span className="text-gray-500 font-mono">{error.digest}</span>
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 flex-col sm:flex-row pt-4">
              <button
                onClick={() => reset()}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Try again
              </button>
              <Link
                href="/"
                className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors text-center"
              >
                Go home
              </Link>
            </div>

            {/* Additional Help */}
            <div className="pt-6 border-t border-gray-800">
              <p className="text-sm text-gray-400">
                Need help?{" "}
                <Link href="/contact" className="text-blue-400 hover:text-blue-300 font-semibold">
                  Contact support
                </Link>
              </p>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
