import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = ['/', '/Login', '/Registration'];

function getTokenFromCookies(request: NextRequest) {
  return request.cookies.get('token')?.value;
}

async function verifyJWT(token: string) {
  const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
  return await jwtVerify(token, secret);
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = getTokenFromCookies(request);

  if (PUBLIC_PATHS.includes(path)) {
    if (!token) {
      return NextResponse.next(); // allow access to public routes if not logged in
    }

    try {
      const { payload } = await verifyJWT(token);
      const role = payload.role;

      // Redirect logged-in users away from public pages
      if (role === 'host') {
        return NextResponse.redirect(new URL('/Host', request.url));
      } else if (role === 'parker') {
        return NextResponse.redirect(new URL('/Parker', request.url));
      }
    } catch (err) {
      return NextResponse.next(); // token is invalid, allow public access
    }
  }

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const { payload } = await verifyJWT(token);
    const role = payload.role;

    // Prevent cross-role access
    if (role === 'host' && path.startsWith('/Parker')) {
      return NextResponse.redirect(new URL('/Host', request.url));
    }

    if (role === 'parker' && path.startsWith('/Host')) {
      return NextResponse.redirect(new URL('/Parker', request.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/', '/Login', '/Registration', '/Host/:path*', '/Parker/:path*'],
};
