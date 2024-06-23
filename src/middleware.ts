import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Retrieve the token if the user is authenticated
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If token exists, allow the request to proceed
  if (token) {
    return NextResponse.next();
  }

  // If no token and the request is to a protected route, redirect to home page
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/properties/add") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/properties/saved") ||
    pathname.startsWith("/messages")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Otherwise, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};
