import { expect, test } from "vitest";
import { searchWithoutEmbeddings } from "./lib";

test("Basic offline search", async () => {
  const results = await searchWithoutEmbeddings("malformed");
  expect(results.length).toBeGreaterThan(1);
});

test("Offline search with no results", async () => {
  const results = await searchWithoutEmbeddings("asldkfjalsdkfj");
  expect(results.length).toBe(0);
});

test("Offline search should prioritize title matches", async () => {
  const results = await searchWithoutEmbeddings("purple");
  expect(results.length).toBeGreaterThan(1);
  expect(results[0].slug).toBe("why-is-my-email-purple");
});
