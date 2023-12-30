import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value || "";

  if (path === "/Admin/Login/CreateItem"&& !token) {
    // Redirect to login if user tries to access CreateItem without a token
    return NextResponse.redirect(new URL("/Admin/Login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/Admin/Login/CreateItem",
    "/Profile",
    "/Admin/Login",
    "/signup",
    "/verifyemail",
  ],
};
