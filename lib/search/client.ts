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
