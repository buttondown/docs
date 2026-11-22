import { Highlight } from "@orama/highlight";
import { create, insertMultiple } from "@orama/orama";
import type { ContentArray } from "./server";

export const buildSearchIndex = (contentArray: ContentArray) => {
  const db = create({
    schema: {
      title: "string",
      body: "string",
      categories: "string[]",
    },
  });

  insertMultiple(db, contentArray);

  return db;
};

export { search } from "@orama/orama";

export const highlighter = new Highlight({
  CSSClass: "bg-amber-100",
});
