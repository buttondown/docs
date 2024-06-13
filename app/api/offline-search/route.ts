import { type NextRequest, NextResponse } from "next/server";
import { type Result, searchWithoutEmbeddings } from "./lib";

export async function GET(request: NextRequest) {
  const query = new URLSearchParams(request.url.split("?")[1]).get("query");

  if (!query) {
    return NextResponse.json({ message: "No query provided" }, { status: 400 });
  }

  if (query.length > 1000) {
    return NextResponse.json({ message: "Query too long" }, { status: 400 });
  }

  const results: Result[] = await searchWithoutEmbeddings(query);

  return NextResponse.json(results.slice(0, 15));
}
