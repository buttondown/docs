import remark from "remark";
import mdx from "remark-mdx";

const fs = require("fs");
const path = require("path");
const graymatter = require("gray-matter");

const OUTPUT_FILENAME = "public/search-results.json";
const PAGES_DIRECTORY = "pages/";

const mungeFilepathIntoRoute = (filepath) => {
  return filepath
    .replace(".mdx", "")
    .replace("/index", "/")
    .replace("pages/", "/");
};

const cleanMDX = (mdxText) => {
  let text = "";
  remark()
    .use(mdx)
    .use(() => (tree) => {
      tree.children
        .filter((child) => child.type === "text" || child.type === "paragraph")
        .map((child) => {
          text += `${child.children.map((c) => c.value)}\n`;
        });
    })
    .processSync(mdxText);
  return text;
};

const recursivelyCompilePosts = function* (root) {
  const filenames = fs.readdirSync(root);
  for (let filename of filenames) {
    const fullyQualifiedFilename = path.join(root, filename);
    if (fs.lstatSync(fullyQualifiedFilename).isDirectory()) {
      yield* recursivelyCompilePosts(fullyQualifiedFilename);
    }

    if (fullyQualifiedFilename.endsWith(".mdx")) {
      const mdxText = fs.readFileSync(fullyQualifiedFilename, "utf8");
      const metadata = graymatter(mdxText).data;
      const plainText = cleanMDX(mdxText);
      yield {
        path: mungeFilepathIntoRoute(fullyQualifiedFilename),
        text: plainText,
        ...metadata,
      };
    }
  }
};

export default function compileSearchResults() {
  return;
}

const results = Array.from(recursivelyCompilePosts(PAGES_DIRECTORY));
const serializeContent = (content) => JSON.stringify(content, null, 2);
fs.writeFile(OUTPUT_FILENAME, serializeContent(results), function (err) {
  if (err) return console.error(err);
  console.log("Compiled search results");
});
