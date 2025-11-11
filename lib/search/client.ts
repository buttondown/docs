import { create, insertMultiple } from "@orama/orama";
import { ContentArray } from "./server";

export const buildSearchIndex = (contentArray: ContentArray) => {
  const db = create({
    schema: {
      title: "string",
      body: "string",
    },
  });

  insertMultiple(db, contentArray);

  return db;
};
