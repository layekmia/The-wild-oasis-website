// import { NextResponse } from "next/server";

// export function middleware(request){
//     console.log(request);

//     return NextResponse.redirect(new URL('/api/auth/signin', request.url))
// }

// import {auth} from '@/app/_lib/auth';
// export const middleware = auth; //This line makes your auth function the official Next.js Middleware.

// export const config = {
//     matcher: ['/account'],
// } // Only run this middleware for routes that start with /account

import { auth } from "@/app/_lib/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isLoginPage = nextUrl.pathname.startsWith("/login");

  // ✅ Redirect logged-in users away from /login
  if (isLoggedIn && isLoginPage) {
    return Response.redirect(new URL("/account", nextUrl.origin));
  }

  // ✅ Protect /account pages from unauthenticated users
  if (!isLoggedIn && nextUrl.pathname.startsWith("/account")) {
    return Response.redirect(new URL("/login", nextUrl.origin));
  }
});

export const config = {
  matcher: ["/login", "/account/:path*"], // run for both login & account pages
};

