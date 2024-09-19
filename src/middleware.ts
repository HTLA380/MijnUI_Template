import { NextRequest, NextResponse } from "next/server";

// TODO: Implement Authentication

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home/dashboard", request.url));
  }
  return NextResponse.next();
}
