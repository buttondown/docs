import type { Index, IndexEntry } from "@/scripts/compile_vectors";
import vectors from "../../../autogen/vectors.json";

export type Result = Omit<IndexEntry, "embedding">;

const createSubtitle = (slug: string) => {
  if (slug.startsWith("api-changelog")) {
    return "API Changelog";
  }
  if (slug.startsWith("glossary-")) {
    return "Glossary";
  }
  return "";
};

export async function searchWithoutEmbeddings(
  query: string,
): Promise<Result[]> {
  const results: Result[] = [
    ...(vectors as Index)
      .filter((entry) =>
        entry.display.title.toLowerCase().includes(query.toLowerCase()),
      )
      .map((entry) => ({
        slug: entry.slug,
        text: entry.text,
        display: {
          title: entry.display.title,
          subtitle: createSubtitle(entry.slug) || entry.display.description,
          description: entry.display.description,
        },
      })),
    ...(vectors as Index)
      .filter((entry) => entry.text.toLowerCase().includes(query.toLowerCase()))
      .map((entry) => ({
        slug: entry.slug,
        text: entry.text,
        display: {
          title: entry.display.title,
          subtitle: createSubtitle(entry.slug),
          description: entry.display.description,
        },
      })),
  ].sort((a, b) => {
    // Weight matches on the title higher than matches on the description.
    const titleMatchA = a.display.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const titleMatchB = b.display.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const descriptionMatchA =
      a.display.description?.toLowerCase().includes(query.toLowerCase()) ||
      false;
    const descriptionMatchB =
      b.display.description?.toLowerCase().includes(query.toLowerCase()) ||
      false;
    return (
      (titleMatchB ? 2 : descriptionMatchB ? 1 : 0) -
      (titleMatchA ? 2 : descriptionMatchA ? 1 : 0)
    );
  });

  const uniqueResults = [];
  const seenSlugs = new Set();

  for (const result of results) {
    if (seenSlugs.has(result.slug)) {
      continue;
    }

    seenSlugs.add(result.slug);
    uniqueResults.push(result);
  }

  return uniqueResults;
}
