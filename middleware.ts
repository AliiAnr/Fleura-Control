/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { getPayloadFromToken } from "./service/jwt";


export function middleware(request: NextRequest) {
  const access_token = request.cookies.get("access_token")?.value || "";
  const pathname = request.nextUrl.pathname;

  // Jika tidak ada token dan bukan halaman login, redirect ke login
  if (!access_token && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Jika ada token, cek expired dan role jika ke /users
  if (access_token) {
    try {
      const payload = getPayloadFromToken(access_token);
      if (!payload.exp || Date.now() >= payload.exp * 1000) {
        // Token expired
        return NextResponse.redirect(new URL("/login", request.url));
      }
      
    } catch (e) {
      // Token tidak valid
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/products/:path*",
    "/sales/:path*",
    "/stores/:path*",
    "/users/:path*",
  ],
};
