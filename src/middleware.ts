import { NextResponse, type NextRequest } from 'next/server';
import { isValidSessionCookieValue, SESSION_COOKIE_NAME } from '@/lib/admin-session';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isValid = await isValidSessionCookieValue(cookie);

  if (!isValid) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
