import REDIRECTS from "./redirects.mjs";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  redirects: async () => {
    return REDIRECTS;
  },
  outputFileTracingIncludes: {
    "/[slug]": ["./public/code/**/*", "./content/**/*"],
  },
};

export default nextConfig;
