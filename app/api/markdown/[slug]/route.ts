import { createReader } from "@keystatic/core/reader";
import fs from "fs";
import { NextResponse } from "next/server";
import config, { localBaseURL } from "@/keystatic.config";

const MARKDOC_DIRECTORY = "content/pages";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;

  const reader = createReader(localBaseURL, config);
  const page = await reader.collections.pages.read(slug);

  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  const filePath = `${MARKDOC_DIRECTORY}/${slug}.mdoc`;

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");

  return new Response(rawContent, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
