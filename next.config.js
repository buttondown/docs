const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
});

module.exports = {
  ...withMDX({
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  }),
  reactStrictMode: true,
};
