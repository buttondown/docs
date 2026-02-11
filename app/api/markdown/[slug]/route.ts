import fs from "fs";
import { NextResponse } from "next/server";

const MARKDOC_DIRECTORY = "content/pages";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;

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

export async function generateStaticParams() {
  const files = fs.readdirSync(MARKDOC_DIRECTORY);
  return files
    .filter((f) => f.endsWith(".mdoc"))
    .map((f) => ({ slug: f.replace(".mdoc", "") }));
}
