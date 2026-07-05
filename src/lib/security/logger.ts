type LogLevel = 'info' | 'warn' | 'error' | 'security';

interface LogContext {
  userId?: string;
  ipAddress?: string;
  action?: string;
  [key: string]: unknown;
}

const SENSITIVE_KEYS = ['password', 'token', 'secret', 'session', 'cookie', 'authorization'];

/**
 * Strips sensitive data from logs before outputting them.
 */
function sanitizeData(data: unknown): unknown {
  if (typeof data !== 'object' || data === null) return data;
  if (Array.isArray(data)) return data.map(sanitizeData);

  const sanitized = { ...(data as Record<string, unknown>) };
  for (const key of Object.keys(sanitized)) {
    if (SENSITIVE_KEYS.some(sensitiveKey => key.toLowerCase().includes(sensitiveKey))) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof sanitized[key] === 'object') {
      sanitized[key] = sanitizeData(sanitized[key]);
    }
  }
  return sanitized;
}

export const logger = {
  log: (level: LogLevel, message: string, context?: LogContext) => {
    const timestamp = new Date().toISOString();
    const safeContext = context ? sanitizeData(context) : undefined;
    
    const logEntry = JSON.stringify({
      timestamp,
      level,
      message,
      ...(safeContext ? { context: safeContext } : {}),
    });

    if (level === 'error' || level === 'security') {
      console.error(logEntry);
    } else if (level === 'warn') {
      // eslint-disable-next-line no-console
      console.warn(logEntry);
    } else {
      // eslint-disable-next-line no-console
      console.log(logEntry);
    }
  },
  
  info: (message: string, context?: LogContext) => logger.log('info', message, context),
  warn: (message: string, context?: LogContext) => logger.log('warn', message, context),
  error: (message: string, context?: LogContext) => logger.log('error', message, context),
  security: (message: string, context?: LogContext) => logger.log('security', message, context),
};
