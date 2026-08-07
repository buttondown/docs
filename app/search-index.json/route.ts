import { buildContentArray } from "@/lib/search/server";

export const dynamic = "force-static";

// The full search corpus, prerendered once at build time. Search fetches it
// lazily; passing it as a prop from Layout serialized ~700 KB of flight data
// into every page's HTML and prerender fallback.
export function GET() {
  return Response.json(buildContentArray());
}
