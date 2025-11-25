import { withSentryConfig } from "@sentry/nextjs";
import REDIRECTS from "./redirects.mjs";

const nextConfig = {
  redirects: async () => {
    return REDIRECTS;
  },
};

export default process.env.NODE_ENV === "production"
  ? withSentryConfig(
      nextConfig,
      {
        // Suppresses source map uploading logs during build
        silent: true,
        org: "buttondown-email",
        project: "docs",
      },
      {
        // For all available options, see:
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

        // Upload a larger set of source maps for prettier stack traces (increases build time)
        widenClientFileUpload: true,

        // Transpiles SDK to be compatible with IE11 (increases bundle size)
        transpileClientSDK: true,

        // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers. (increases server load)
        // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
        // side errors will fail.
        tunnelRoute: "/monitoring",

        // Hides source maps from generated client bundles
        hideSourceMaps: true,

        // Automatically tree-shake Sentry logger statements to reduce bundle size
        disableLogger: true,

        // Enables automatic instrumentation of Vercel Cron Monitors.
        // See the following for more information:
        // https://docs.sentry.io/product/crons/
        // https://vercel.com/docs/cron-jobs
        automaticVercelMonitors: true,
      }
    )
  : nextConfig;
