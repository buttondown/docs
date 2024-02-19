const withMdxFm = require("next-mdx-frontmatter")({
  extension: /\.mdx$/,
});

const config = {
  ...withMdxFm({
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

    webpack: (config, { isServer }) => {
      if (isServer) {
        require("./scripts/generate-sitemap");
      }

      return config;
    },
  }),
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/behind-the-scenes/funding",
        destination: "https://buttondown.email/open-source",
        permanent: true,
      },
    ];
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

module.exports = config;
