import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server"; 
import { getLoggedUser } from "./utils/auth/getLoggedUser";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log(token);

  // Redirect unauthenticated users
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const { user, isVerified, hasRole, error } = await getLoggedUser(token.backendToken);

  if (error || !isVerified || !hasRole) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (user.role === 'default') {
    return NextResponse.redirect(new URL("/welcome", req.url));
  }

  const res = NextResponse.next(); 

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/protected/:path*"],
};
