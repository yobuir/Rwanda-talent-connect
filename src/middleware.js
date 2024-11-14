
import { NextResponse } from 'next/server'; 
import useAuthStore from './store/authStore';
export function middleware(request) {
    
 const authStore = useAuthStore.getState();

  const isLoggedIn = useAuthStore.token !== null;
  const isVerified = useAuthStore.isEmailVerified !== false; 
  const hasRole = useAuthStore.hasRole !== false;
  const url = request.nextUrl.clone();
  
  console.log(hasRole)
  
  if (!isLoggedIn) {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  if (!isVerified) {     
    url.pathname = '/auth/verify-email';
    return NextResponse.redirect(url);
  }

  if(!hasRole){
    url.pathname = '/welcome';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/protected/:path*'],
};
