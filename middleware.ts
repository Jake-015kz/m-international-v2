import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/routing";
import { NextRequest, NextResponse } from "next/server";

const nextIntlMiddleware = createMiddleware(routing);

export const config = {
  matcher: ["/", "/(ru|en|kk)/:path*", "/(ru|en|kk)"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect root "/" to default locale "/ru/"
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/ru/", request.url), 307);
  }

  // Redirect "/ru" (without trailing slash) to "/ru/"
  const localeMatch = pathname.match(/^\/(ru|en|kk)$/);
  if (localeMatch) {
    return NextResponse.redirect(new URL(`${localeMatch[0]}/`, request.url), 307);
  }

  return nextIntlMiddleware(request);
}
