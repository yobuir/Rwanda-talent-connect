import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server"; 

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Redirect unauthenticated users
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

 

  // Allow request to proceed and attach user data
  const res = NextResponse.next(); 

  return res;
}

// Specify protected routes
export const config = {
  matcher: ["/protected/:path*"],
};
