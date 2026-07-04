import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

import { decrypt } from '@/lib/auth/session';

const protectedRoutes = ['/admin/secure'];
const authRoutes = ['/admin/login'];

export async function proxy(req: NextRequest) {
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
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
