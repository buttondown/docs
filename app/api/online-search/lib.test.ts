import dotenv from "dotenv";
import { expect, test } from "vitest";
import { searchWithEmbeddings } from "./lib";

dotenv.config();

test("Search with embeddings", async () => {
  const results = await searchWithEmbeddings("billing");
  expect(results.length).toBeGreaterThan(1);

  expect(
    results.every((result) => {
      const slug = result.slug;
      if (results.filter((r) => r.slug === slug).length === 1) {
        return true;
      }
      return false;
    })
  ).toBeTruthy();
});

// When searching something like "Substack", many results will come up.
// The first result will probably just be the title of the "Substack" doc, which
// doesn't have a longer description. When we encounter this, we should find the
// next result of the `substack` slug, and fill in that description, to add a
// bit more context.
test("Results have description", async () => {
  const results = await searchWithEmbeddings("Substack");

  const result = results.find((r) => r.slug === "substack");

  expect(result?.display.description).toBeTruthy();
});
