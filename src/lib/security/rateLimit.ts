import { RateLimiterMemory } from 'rate-limiter-flexible';

export const globalRateLimiter = new RateLimiterMemory({
  keyPrefix: 'rl_global',
  points: 100, // 100 requests
  duration: 60, // per 60 seconds
});

export const authRateLimiter = new RateLimiterMemory({
  keyPrefix: 'rl_auth',
  points: 5, // 5 requests
  duration: 60 * 15, // per 15 minutes
});

export const uploadRateLimiter = new RateLimiterMemory({
  keyPrefix: 'rl_upload',
  points: 10, // 10 requests
  duration: 60 * 60, // per hour
});

/**
 * Helper to get client IP
 */
export function getClientIp(req: Request): string {
  return req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
}

