// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://42cec06a25fe1da9e05706b845c96e0b@o97520.ingest.us.sentry.io/4507018876026880",
  tracesSampleRate: 1,
  debug: process.env.NODE_ENV !== "production",
  enabled: process.env.NODE_ENV === "production",
});

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}
