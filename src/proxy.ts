import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const publicPaths = ["/login", "/register"];

  const path = request.nextUrl.pathname;

  if (path === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (publicPaths.includes(path)) {
    return NextResponse.next();
  } else {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
