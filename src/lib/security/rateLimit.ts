import { RateLimiterRedis } from 'rate-limiter-flexible';

import redis from '../db/redis';

// Note: Ensure Redis is running, otherwise rate limiter will fail open or closed depending on configuration.
// By default, rate-limiter-flexible uses Redis if provided, but we can set it up to not crash the app if Redis is down.

export const globalRateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: 'rl_global',
  points: 100, // 100 requests
  duration: 60, // per 60 seconds
});

export const authRateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: 'rl_auth',
  points: 5, // 5 requests
  duration: 60 * 15, // per 15 minutes
});

export const uploadRateLimiter = new RateLimiterRedis({
  storeClient: redis,
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
