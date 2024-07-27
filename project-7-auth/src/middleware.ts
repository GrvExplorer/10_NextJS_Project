import authConfig from "@/auth.config";
import { apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const currentPath = req.nextUrl.pathname;
  const isApiAuthPrefix = apiAuthPrefix.includes(currentPath)
  const isAuthRoutes = authRoutes.includes(currentPath)
  const isPublicRoutes = publicRoutes.includes(currentPath)
  
  console.log("🚀 ~ file: middleware.ts:10 ~ auth ~ isLoggedIn:", isLoggedIn)
  if (isApiAuthPrefix) return NextResponse.next();

  if (isAuthRoutes && isLoggedIn)
    return NextResponse.redirect(
      new URL(process.env.NEXT_PUBLIC_SIGN_IN_REDIRECT_URL || "/", req.nextUrl)
    );

  if (isPublicRoutes) return NextResponse.next();

  if (!isLoggedIn && !isAuthRoutes)
    return NextResponse.redirect(
      new URL(process.env.NEXT_PUBLIC_SIGN_IN_URL || "/sign-in", req.nextUrl)
    );

});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
