import { NextResponse } from "next/server";
import { authRoutes } from "./lib/authRoutes";

export default function middleware(req: any) {
  const { nextUrl } = req;

  const isLoggedIn = req.cookies.get("hue-man-access-token")?.value;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // If user exists redirect to `/home`
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If user not found, redirect to `/login`
  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }
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
  ],
};
