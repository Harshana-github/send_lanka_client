import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, locales, type Locale } from "@/i18n/config";

/** Picks the best supported language from the browser's Accept-Language header. */
function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().split(";q=");
      return { language: tag.toLowerCase().split("-")[0], quality: quality ? Number(quality) : 1 };
    })
    .sort((a, b) => b.quality - a.quality);

  return ranked.find((entry) => hasLocale(entry.language))?.language as Locale | undefined ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";

  if ((locales as readonly string[]).includes(firstSegment)) return;

  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next.js internals, API routes and any file with an extension (images, icons, robots.txt…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
