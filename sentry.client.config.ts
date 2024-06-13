// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://42cec06a25fe1da9e05706b845c96e0b@o97520.ingest.us.sentry.io/4507018876026880",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  ignoreErrors: [
    // Safari is incorrectly failing to parse some JSON+LD metadata. This is a known issue in Safari:
    // https://github.com/getsentry/sentry/issues/61469
    // Here's an example of such an issue:
    // https://buttondown-email.sentry.io/issues/5420885923/
    '"telephone"',
  ],
});
