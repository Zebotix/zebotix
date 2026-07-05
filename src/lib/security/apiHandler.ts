import { NextResponse } from 'next/server';


import { globalRateLimiter, authRateLimiter, getClientIp } from './rateLimit';
import { getSession } from '../auth/session';

import type { ZodSchema } from 'zod';

export type SecurityOptions<T> = {
  requireAuth?: boolean;
  rateLimit?: 'global' | 'auth' | 'upload' | 'none';
  schema?: ZodSchema<T>;
  requireAdmin?: boolean;
};

/**
 * A wrapper for Next.js Route Handlers to enforce consistent security policies,
 * including Rate Limiting, Authentication, RBAC, Input Validation, and safe error handling.
 */
export function withSecurity<T = unknown>(
  handler: (req: Request, validatedData?: T) => Promise<NextResponse> | NextResponse,
  options: SecurityOptions<T> = {}
) {
  return async (req: Request): Promise<NextResponse> => {
    try {
      // 1. Rate Limiting
      if (options.rateLimit && options.rateLimit !== 'none') {
        const ip = getClientIp(req);
        try {
          if (options.rateLimit === 'auth') {
            await authRateLimiter.consume(ip);
          } else if (options.rateLimit === 'global') {
            await globalRateLimiter.consume(ip);
          }
        } catch {
          return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }
      }

      // 2. Authentication & RBAC
      if (options.requireAuth || options.requireAdmin) {
        const session = await getSession();
        if (!session) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        // In a real app with Prisma, you'd fetch the user's role here, 
        // or embed it securely in the JWT. Assuming it's in the JWT for now.
        if (options.requireAdmin && session.role !== 'admin') {
          return NextResponse.json({ error: 'Forbidden: Requires admin privileges' }, { status: 403 });
        }
      }

      // 3. Input Validation (Zod)
      let validatedData: T | undefined;
      if (options.schema) {
        let body;
        try {
          body = await req.json();
        } catch {
          return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
        }

        const parseResult = options.schema.safeParse(body);
        if (!parseResult.success) {
          return NextResponse.json(
            { error: 'Validation failed', details: parseResult.error.flatten() },
            { status: 400 }
          );
        }
        validatedData = parseResult.data;
      }

      // Execute actual handler
      return await handler(req, validatedData);
    } catch (error) {
      // 4. Safe Error Handling (Don't leak stack traces)
      console.error('Unhandled API Error:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  };
}
