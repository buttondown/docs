const fs = require("fs");
const path = require("path");

const PAGES_DIRECTORY = "pages/";

const mungeFilepathIntoRoute = (filepath) => {
  return filepath
    .replace(".mdx", "")
    .replace("/index", "/")
    .replace("pages/", "/");
};

function addPage(page) {
  const path = page.replace("pages", "").replace(".js", "").replace(".mdx", "");
  const route = path === "/index" ? "" : path;

  return `  <url>
    <loc>${`https://docs.buttondown.email${route}`}</loc>
    <changefreq>hourly</changefreq>
  </url>`;
}

const findPosts = function* (root) {
  const filenames = fs.readdirSync(root);
  for (let filename of filenames) {
    const fullyQualifiedFilename = path.join(root, filename);
    if (fs.lstatSync(fullyQualifiedFilename).isDirectory()) {
      yield* findPosts(fullyQualifiedFilename);
    }

    if (fullyQualifiedFilename.endsWith(".mdx")) {
      yield mungeFilepathIntoRoute(fullyQualifiedFilename);
    }
  }
};

function generateSitemap() {
  const pages = Array.from(findPosts(PAGES_DIRECTORY));
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(addPage).join("\n")}
  </urlset>`;
  fs.writeFileSync("public/sitemap.xml", sitemap);
}

generateSitemap();
