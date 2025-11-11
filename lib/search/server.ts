import matter from "gray-matter";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { removeMarkdown } from "../remove-markdown";

export type ContentArray = { title: string; body: string; slug: string }[];

export const buildContentArray = (): ContentArray => {
  const pagesDir = join(process.cwd(), "content", "pages");
  const files = readdirSync(pagesDir).filter((file) => file.endsWith(".mdoc"));

  const index = files.map((file) => {
    const filePath = join(pagesDir, file);
    const fileContent = readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      title: data.title as string,
      body: removeMarkdown(content),
      slug: file.replace(/\.mdoc$/, ""),
    };
  });

  return index;
};
