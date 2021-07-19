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
  return mdxText;
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

const contents = Array.from(recursivelyCompilePosts(PAGES_DIRECTORY));

const serializeContent = (content) => JSON.stringify(content, null, 2);

fs.writeFile(OUTPUT_FILENAME, serializeContent(contents), function (err) {
  if (err) return console.error(err);
  console.log("Compiled search results");
});
