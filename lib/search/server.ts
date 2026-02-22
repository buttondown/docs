import { readdirSync, readFileSync } from "node:fs";
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
  references: string[];
};

export type ContentArray = ContentItem[];

type Navigation = Record<
  string,
  { name: string; items: { discriminant: string; value: string }[] }[]
>;

const readNavigation = (): Navigation => {
  const navigationPath = join(process.cwd(), "content", "navigation.json");
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

const buildReferences = (
  slugToContent: Map<string, string>,
  slugToEnum: Map<string, string>,
): Map<string, string[]> => {
  const openapiPath = join(process.cwd(), "public", "openapi.json");
  const openapi = JSON.parse(readFileSync(openapiPath, "utf-8"));
  const schemas = openapi.components?.schemas ?? {};

  const references = new Map<string, string[]>();
  const allSlugs = [...slugToContent.keys()];

  // Invert the enum map: enum name -> slug
  const enumToSlug = new Map<string, string>();
  for (const [slug, enumName] of slugToEnum) {
    enumToSlug.set(enumName, slug);
  }

  for (const slug of allSlugs) {
    const refs = new Set<string>();
    const frontmatter = matter(slugToContent.get(slug)!).data;
    const title = frontmatter.title as string;

    // Add references from the OpenAPI spec: find schemas whose properties
    // reference this page's title.
    for (const [schemaName, schema] of Object.entries(schemas)) {
      const props = (schema as { properties?: Record<string, { $ref?: string }> })
        .properties;
      if (!props) continue;
      if (
        Object.values(props).some((prop) =>
          (prop.$ref ?? "").includes(title),
        )
      ) {
        const refSlug = enumToSlug.get(schemaName);
        if (refSlug) refs.add(refSlug);
      }
    }

    // Add references from other pages that link to this slug.
    for (const otherSlug of allSlugs) {
      if (otherSlug === slug) continue;
      if (slugToContent.get(otherSlug)!.includes(`/${slug}`)) {
        refs.add(otherSlug);
      }
    }

    references.set(slug, [...refs].sort());
  }

  return references;
};

let cachedContentArray: ContentArray | null = null;

export const buildContentArray = (): ContentArray => {
  if (cachedContentArray) return cachedContentArray;
  const pagesDir = join(process.cwd(), "content", "pages");
  const files = readdirSync(pagesDir).filter((file) => file.endsWith(".mdoc"));
  const navigation = readNavigation();
  const { apiSlugs, generalSlugs, slugToSection } =
    buildSlugsSets(navigation);

  // Pre-read all files for cross-referencing.
  const slugToContent = new Map<string, string>();
  const slugToEnum = new Map<string, string>();
  for (const file of files) {
    const slug = file.replace(/\.mdoc$/, "");
    const fileContent = readFileSync(join(pagesDir, file), "utf-8");
    slugToContent.set(slug, fileContent);
    const { data } = matter(fileContent);
    if (data.enum) {
      slugToEnum.set(slug, data.enum as string);
    }
  }

  const references = buildReferences(slugToContent, slugToEnum);

  const index = files.map((file) => {
    const slug = file.replace(/\.mdoc$/, "");
    const fileContent = slugToContent.get(slug)!;
    const { data, content } = matter(fileContent);

    const categories: ("general" | "api")[] = [];
    if (generalSlugs.has(slug)) {
      categories.push("general");
    }
    if (apiSlugs.has(slug)) {
      categories.push("api");
    }

    const enumValue = data.enum as string | undefined;
    const section = enumValue
      ? "Reference"
      : slugToSection.get(slug) ?? "guides";

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
      schema: (data.schema as string) ?? enumValue ?? null,
      section,
      references: references.get(slug) ?? [],
    };
  });

  cachedContentArray = index;
  return index;
};
