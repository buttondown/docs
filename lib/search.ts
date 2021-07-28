import lunr, { Index } from "lunr";

import SEARCH_RESULTS from "../public/search-results.json";

export type SearchableItem = {
  path: string;
  description?: string;
  title?: string;
  text: string;
};

const SEARCH_DATA: SearchableItem[] = SEARCH_RESULTS;

const index = lunr(function () {
  this.ref("path");
  this.field("text");
  this.field("title");
  this.metadataWhitelist = ["position"];

  SEARCH_DATA.forEach(function (this: any, doc) {
    this.add(doc);
  }, this);
});

export default function search(value: string): Index.Result[] {
  if (value === "") {
    return [];
  }

  return index.search(value);
}
