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
    }),
  ).toBeTruthy();
});
