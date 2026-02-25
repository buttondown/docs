import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

// Path resolution: Vercel may use .next as cwd; monorepo may use repo root
function resolvePagesDir() {
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, "content", "pages"),
    path.join(cwd, "..", "content", "pages"),
    path.join(cwd, "docs", "content", "pages"),
  ];
  const dir = candidates.find((d) => fs.existsSync(d));
  return dir ?? path.join(cwd, "content", "pages");
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const pagesDir = resolvePagesDir();
  const filePath = path.join(pagesDir, `${slug}.mdoc`);

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
  const pagesDir = resolvePagesDir();
  const files = fs.readdirSync(pagesDir);
  return files
    .filter((f) => f.endsWith(".mdoc"))
    .map((f) => ({ slug: f.replace(".mdoc", "") }));
}
