import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import type { FAQItem } from "../../components/faq";
import { removeMarkdown } from "../remove-markdown";

export type ContentItem = {
  title: string;
  body: string;
  slug: string;
  categories: ("general" | "api")[];
  description: string | null;
  schema: string | null;
  section: string;
};

export type ContentArray = ContentItem[];

type Navigation = Record<
  string,
  { name: string; items: { discriminant: string; value: string }[] }[]
>;

// Path resolution: Vercel may use .next as cwd; monorepo may use repo root
const resolvePath = (relative: string) => {
  const cwd = process.cwd();
  const candidates = [
    join(cwd, relative),
    join(cwd, "..", relative),
    join(cwd, "docs", relative),
  ];
  const resolved = candidates.find((p) => existsSync(p));
  return resolved ?? join(cwd, relative);
};

const readNavigation = (): Navigation => {
  const navigationPath = resolvePath("content/navigation.json");
  return JSON.parse(readFileSync(navigationPath, "utf-8"));
};

const buildSlugsSets = (
  navigation: Navigation,
): {
  apiSlugs: Set<string>;
  generalSlugs: Set<string>;
  slugToSection: Map<string, string>;
} => {
  const apiSlugs = new Set<string>();
  for (const section of navigation.api ?? []) {
    for (const item of section.items ?? []) {
      if (item.discriminant === "page") {
        apiSlugs.add(item.value);
      }
    }
  }

  const nonApiCategories = Object.keys(navigation).filter(
    (key) => key !== "api",
  );

  const generalSlugs = new Set<string>();
  for (const category of nonApiCategories) {
    for (const section of navigation[category] ?? []) {
      for (const item of section.items ?? []) {
        if (item.discriminant === "page") {
          generalSlugs.add(item.value);
        }
      }
    }
  }

  const slugToSection = new Map<string, string>();
  for (const [section, subsections] of Object.entries(navigation)) {
    for (const subsection of subsections) {
      for (const item of subsection.items ?? []) {
        if (item.discriminant === "page") {
          slugToSection.set(item.value, section);
        }
      }
    }
  }

  return { apiSlugs, generalSlugs, slugToSection };
};

let cachedContentArray: ContentArray | null = null;

export const buildContentArray = (): ContentArray => {
  if (cachedContentArray) return cachedContentArray;
  const pagesDir = resolvePath("content/pages");
  const files = readdirSync(pagesDir).filter((file) => file.endsWith(".mdoc"));
  const navigation = readNavigation();
  const { apiSlugs, generalSlugs, slugToSection } = buildSlugsSets(navigation);

  const index = files.map((file) => {
    const slug = file.replace(/\.mdoc$/, "");
    const { data, content } = matter(
      readFileSync(join(pagesDir, file), "utf-8"),
    );

    const categories: ("general" | "api")[] = [];
    if (generalSlugs.has(slug)) {
      categories.push("general");
    }
    if (apiSlugs.has(slug)) {
      categories.push("api");
    }

    const section = slugToSection.get(slug) ?? "guides";

    let body = removeMarkdown(content);
    if (data.faqItems) {
      const faqs: FAQItem[] = JSON.parse(data.faqItems as string);
      const faqText = faqs
        .map((faq) => `${faq.question} ${faq.answer}`)
        .join(" ");
      body = `${body} ${faqText}`;
    }

    return {
      title: data.title as string,
      body,
      slug,
      categories,
      description: (data.description as string) ?? null,
      schema: (data.schema as string) ?? null,
      section,
    };
  });

  cachedContentArray = index;
  return index;
};
