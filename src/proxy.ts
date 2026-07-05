import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

import { decrypt } from '@/lib/auth/session.edge';

const protectedRoutes = ['/admin/secure'];
const authRoutes = ['/admin/login'];

export async function proxy(req: NextRequest) {
  // CSRF Protection for state-changing methods
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    const origin = req.headers.get('origin');
    const referer = req.headers.get('referer');
    const host = req.headers.get('host');

    let isValid = false;

    if (origin) {
      try {
        const originHost = new URL(origin).host;
        if (originHost === host) isValid = true;
      } catch {
        // Ignore invalid URL
      }
    } else if (referer) {
      try {
        const refererHost = new URL(referer).host;
        if (refererHost === host) isValid = true;
      } catch {
        // Ignore invalid URL
      }
    }

    if (!isValid) {
      return new NextResponse(
        JSON.stringify({ error: 'CSRF validation failed: Invalid Origin/Referer' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  const path = req.nextUrl.pathname;
  
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isAuthRoute = authRoutes.includes(path);
  
  const cookie = req.cookies.get('session')?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    const redirectUrl = new URL('/admin/login', req.nextUrl);
    redirectUrl.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthRoute && session?.userId) {
    return NextResponse.redirect(new URL('/admin/secure', req.nextUrl));
  }
  
  if (path === '/admin') {
    if (session?.userId) {
      return NextResponse.redirect(new URL('/admin/secure', req.nextUrl));
    } else {
      return NextResponse.redirect(new URL('/admin/login', req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
