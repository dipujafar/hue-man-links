import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes } from "./lib/authRoutes";

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;

  const isLoggedIn = req.cookies.get("hue-man-access-token")?.value;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // If logged-in user visits auth pages → redirect home
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If not logged in and visiting protected pages → redirect login
  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/family-user/:path*",
    "/baby-sitter/:path*",
    "/message",
    "/request",
    "/settings",
    "/personalInformation",
    "/book-babysitter-request",
    "/book-sitter",
    "/book-request",
    "/all-job-posts",
    "/notifications",
  ],
};
