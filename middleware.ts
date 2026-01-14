import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const acceptHeader = request.headers.get("accept") || "";

  // Check if the request prefers markdown
  if (acceptHeader.includes("text/markdown")) {
    const pathname = request.nextUrl.pathname;

    // Only handle top-level slug routes (not nested paths like /api/*, /rss/*, etc.)
    // Match paths like /some-page but not /api/something or /rss/feed
    const slugMatch = pathname.match(/^\/([^/]+)$/);

    if (slugMatch) {
      const slug = slugMatch[1];

      // Exclude known non-doc routes
      const excludedPaths = [
        "favicon.ico",
        "robots.txt",
        "sitemap.xml",
        "keystatic",
      ];
      if (!excludedPaths.includes(slug)) {
        // Rewrite to the markdown API route
        const url = request.nextUrl.clone();
        url.pathname = `/api/markdown/${slug}`;
        return NextResponse.rewrite(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  // Only run middleware on paths that could be doc pages
  // Exclude static files, api routes, and other known paths
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/|rss/|keystatic).*)",
  ],
};
