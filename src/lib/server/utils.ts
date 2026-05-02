/**
 * Escapes characters for HTML to prevent XSS.
 */
export function escapeHtml(str?: string | null): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Formats a timestamp into a readable ISO string with safe escaping.
 */
export function getTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Normalizes headers and extracts IP/User-Agent.
 */
export function getRequestMetadata(request: Request) {
  const headers = Object.fromEntries(request.headers.entries());
  const ip = (headers['x-forwarded-for'] || headers['x-real-ip'] || 'unknown')
    .toString()
    .split(',')[0]
    .trim();
  const userAgent = headers['user-agent'] || 'unknown';
  const referer = headers['referer'] || headers['referrer'] || 'direct';
  
  return { ip, userAgent, referer, headers };
}
