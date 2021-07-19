const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
});
const withMdxFm = require("next-mdx-frontmatter")({
  extension: /\.mdx$/,
});

const config = {
  ...withMdxFm({
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  }),
  reactStrictMode: true,
};

module.exports = config;
