// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://42cec06a25fe1da9e05706b845c96e0b@o97520.ingest.us.sentry.io/4507018876026880",
  tracesSampleRate: 1,
  enabled: process.env.NODE_ENV === "production",

  ignoreErrors: [
    // Safari is incorrectly failing to parse some JSON+LD metadata. This is a known issue in Safari:
    // https://github.com/getsentry/sentry/issues/61469
    // Here's an example of such an issue:
    // https://buttondown-email.sentry.io/issues/5420885923/
    '"telephone"',
  ],
});
