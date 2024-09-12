import dotenv from "dotenv";
import * as fs from "fs";
import matter from "gray-matter";
import OpenAI from "openai";
import index from "../autogen/index.json";
import navigation from "../content/navigation.json";
import OpenAPIEnums from "../lib/openapi/enums.json";
import { removeMarkdown } from "./lib";

export type IndexEntry = {
  slug: string;
  text: string;
  embedding: number[];
  display: {
    title: string;
    subtitle?: string;
    description?: string;
  };
};

export type Index = IndexEntry[];

(async () => {
  dotenv.config();

  const openai = new OpenAI();

  const INDEX_JSON_PATH = "autogen/vectors.json";

  const filenames = fs.readdirSync("content/pages");

  const existingIndex: Index = fs.existsSync(INDEX_JSON_PATH)
    ? JSON.parse(fs.readFileSync(INDEX_JSON_PATH, "utf-8"))
    : [];

  const searchIndex: Index = [];

  // Returns title and possibly subtitle (if title is ambiguous)
  const titleForSlug = (slug: string): { title: string; subtitle?: string } => {
    const page = index.find((page) => page.url === slug);

    if (!page) {
      throw new Error(`No page found for slug ${slug}`);
    }

    const pagesWithSameTitle = index.filter((p) => p.title === page.title);

    if (pagesWithSameTitle.length > 1) {
      let folderName = "";
      for (const folders of Object.values(navigation)) {
        for (const folder of folders) {
          const containsSlug = folder.items.some(
            (item) => item.discriminant === "page" && item.value === slug,
          );
          if (containsSlug) {
            folderName = folder.name;
            break;
          }
        }
      }
      return { title: page.title, subtitle: folderName };
    }

    return { title: page.title };
  };

  for (const filename of filenames) {
    if (fs.lstatSync(`content/pages/${filename}`).isFile()) {
      const { data, content } = matter(
        fs.readFileSync(`content/pages/${filename}`, "utf-8"),
      );

      const slug = filename.replace(/\.mdoc$/, "");

      searchIndex.push({
        slug,
        text: data.title,
        embedding: [],
        display: titleForSlug(slug),
      });

      if (data.enum) {
        const openAPIEnum =
          OpenAPIEnums[data.enum as keyof typeof OpenAPIEnums];
        Object.entries(openAPIEnum).forEach(([key, value]) => {
          searchIndex.push({
            slug: `${slug}#${key}`,
            text: value.description
              ? `${value.name}: ${value.description}`
              : value.name,
            embedding: [],
            display: {
              title: value.name,
              description: data.title,
            },
          });
        });
      }

      const paragraphs = content
        // Remove code blocks
        .replace(/```.*?```/gs, "")
        // Remove markdoc tags
        .replace(/{%.+?%}/gms, "")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 30);

      const blocks = paragraphs.flatMap((paragraph) =>
        removeMarkdown(paragraph).split("\n"),
      );

      blocks.forEach((textWithoutMarkdown) => {
        if (textWithoutMarkdown === "") {
          return;
        }

        searchIndex.push({
          slug,
          text: textWithoutMarkdown,
          embedding: [],
          display: {
            ...titleForSlug(slug),
            description: textWithoutMarkdown,
          },
        });
      });
    }
  }

  let totalTokens = 0;

  for (const entry of searchIndex) {
    const existingEntry = existingIndex.find((e) => e.text === entry.text);

    if (existingEntry && existingEntry.embedding) {
      entry.embedding = existingEntry.embedding;
      console.log(`Reusing embedding from ${existingEntry.slug}`);
    } else {
      const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        // 256 is short and fine, per https://openai.com/blog/new-embedding-models-and-api-updates
        dimensions: 256,
        input: entry.text,
      });

      entry.embedding = response.data[0].embedding;

      console.log(`Embedded text from ${entry.slug}`);

      totalTokens += response.usage.total_tokens;
    }
  }

  const PRICE_PER_TOKEN = 0.02 / 1_000_000;
  console.log(`This run cost $${totalTokens * PRICE_PER_TOKEN}`);

  fs.writeFileSync(
    INDEX_JSON_PATH,
    JSON.stringify(searchIndex, null, 2),
    "utf-8",
  );
})();
