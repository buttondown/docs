// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://42cec06a25fe1da9e05706b845c96e0b@o97520.ingest.us.sentry.io/4507018876026880",
  tracesSampleRate: 1,
  debug: process.env.NODE_ENV !== "production",
  enabled: process.env.NODE_ENV === "production",
  ignoreErrors: [
    // Safari is incorrectly failing to parse some JSON+LD metadata. This is a known issue in Safari:
    // https://github.com/getsentry/sentry/issues/61469
    // Here's an example of such an issue:
    // https://buttondown-email.sentry.io/issues/5420885923/
    '"telephone"',
  ],
});
