import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { getLoggedUser } from "./utils/auth/getLoggedUser";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Redirect unauthenticated users
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Fetch user data
  const { user, isVerified, hasRole, error } = await getLoggedUser(token.backendToken);

  if(!user){
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  // Redirect if email not verified
  if (!isVerified) {
    return NextResponse.redirect(new URL("/auth/verify-email", req.url));
  }

  // Redirect if no role is assigned
  if (!hasRole) {
    return NextResponse.redirect(new URL("/welcome", req.url));
  }

  // Allow request to proceed and attach user data
  const res = NextResponse.next();
  res.headers.set("X-User-Id", user._id);
  res.headers.set("X-User-Role", user.role);
  res.headers.set("X-User-Status", user.status);
  res.headers.set("X-User-Name", user.fullName);
  res.headers.set("X-User-IsProfilePublished", user.isProfilePublished.toString());

  return res;
}

// Specify protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/protected/:path*"],
};
