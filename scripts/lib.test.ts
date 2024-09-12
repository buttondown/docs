import dotenv from "dotenv";
import { expect, test } from "vitest";
import { removeMarkdown } from "./lib";

dotenv.config();

test("Remove markdown", async () => {
  expect(removeMarkdown("## Hello, world!")).toBe("Hello, world!");

  expect(removeMarkdown("One __two__ **three** _four_ *five*")).toBe(
    "One two three four five",
  );

  expect(removeMarkdown("![](/image)").trim()).toBe("");

  expect(removeMarkdown("Here is [link](https://example.com) hi!")).toBe(
    "Here is link hi!",
  );

  expect(
    removeMarkdown(`| Input    | Example        | Description                                             |
|----------|----------------|--------------------------------------------------------|
| YYYY     | 2014           | 4 or 2 digit year                                      |
| YYYY     | 2014           | 4 or 2 digit year                                      |`),
  ).toEqual(
    "YYYY\n\n2014\n\n4 or 2 digit year\n\n\n\nYYYY\n\n2014\n\n4 or 2 digit year",
  );
});
