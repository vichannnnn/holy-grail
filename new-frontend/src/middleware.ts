import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hideHeaderRoutes = ['/login', '/register', '/forgot-password'];
  const shouldHideHeader = hideHeaderRoutes.some((route) => pathname.startsWith(route));

  const response = NextResponse.next();

  response.headers.set('x-hide-header', shouldHideHeader ? 'true' : 'false');

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
