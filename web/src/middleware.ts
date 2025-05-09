import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
};

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/login');
    const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard');
    const isProfilePage = req.nextUrl.pathname.startsWith('/profile');
    const isApiRoute = req.nextUrl.pathname.startsWith('/api');

    // Redirect authenticated users away from auth pages
    if (isAuth && isAuthPage) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Handle unauthenticated access
    if (!isAuth && (isDashboardPage || isProfilePage)) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Handle forced password change
    if (isAuth && token.mustChangePassword && !isProfilePage && !isApiRoute) {
      return NextResponse.redirect(new URL('/profile/change-password', req.url));
    }

    // Handle incomplete profile
    if (isAuth && !token.phoneNumber && !isProfilePage && !isApiRoute) {
      return NextResponse.redirect(new URL('/profile/update', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
); 