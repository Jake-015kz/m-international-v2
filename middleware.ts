import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/routing";
import { NextRequest, NextResponse } from "next/server";

const nextIntlMiddleware = createMiddleware(routing);

export const config = {
  // Exclude _next/static, _next/image, API routes, and static files
  matcher: [
    "/((?!_next/static|_next/image|api/|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|svg|gif|ico|css|js|woff|woff2|ttf|eot)).*)",
  ],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip if pathname already has a valid locale prefix (e.g. /ru/, /en/, /kk/)
  const hasLocalePrefix = routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // If already has locale prefix, let next-intl handle it (no manual redirect)
  if (hasLocalePrefix) {
    return nextIntlMiddleware(request);
  }

  // For all other paths, let next-intl handle locale detection and redirect
  return nextIntlMiddleware(request);
}
