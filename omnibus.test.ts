/* This file is a test suite for the documentation. It checks for broken links, missing glossary terms, and other issues.
   Before adding to this file, please consider whether the test should be in a different file, closer with the behavior under test. */
import dotenv from "dotenv";
import fs from "fs";
import { expect, test } from "vitest";
import { OpenAPIProperty, urlForSchema } from "./components/ObjectDescription";
import NAVIGATION from "./content/navigation.json";
import OpenAPI from "./lib/openapi/openapi.json";
import REDIRECTS from "./redirects.mjs";

dotenv.config();

const MARKDOC_DIRECTORY = "content/pages";

const VALID_APPLICATION_ROUTES = [
  "",
  "analytics",
  "analytics/<str:id>",
  "automations",
  "automations/new",
  "automations/<uuid:pk>",
  "automations/<uuid:pk>/delete",
  "automations/<uuid:pk>.body",
  "comments",
  "comments/<uuid:pk>",
  "emails",
  "emails/analytics/<uuid:pks>",
  "emails/imports/new",
  "emails/new",
  "emails/visibilities/<uuid:pks>",
  "emails/<uuid:pk>",
  "emails/<uuid:pk>/completed",
  "emails/<uuid:pk>/drafting",
  "emails/<uuid:pk>/finalization",
  "emails/<uuid:pk>/history",
  "emails/<uuid:pk>/metadata",
  "emails/<uuid:pk>/recipients",
  "emails/<uuid:pk>/schedule",
  "emails/<uuid:pk>/tags",
  "events",
  "events/<uuid:pk>",
  "events/replay/<uuid:pks>",
  "feeds",
  "feeds/new",
  "feeds/<uuid:pk>/",
  "feeds/<uuid:pk>/delete",
  "login",
  "mentions",
  "register",
  "requests",
  "requests/<uuid:pk>",
  "requests/api-key/",
  "requests/api-key/regenerate",
  "search",
  "settings",
  "settings/basics",
  "settings/basics.description",
  "settings/billing",
  "settings/billing",
  "settings/billing/pricing",
  "settings/danger-zone",
  "settings/danger-zone/add-newsletter",
  "settings/danger-zone/delete-account",
  "settings/danger-zone/delete-newsletter",
  "settings/design",
  "settings/design.email.footer",
  "settings/design.email.header",
  "settings/design.web.footer",
  "settings/design.web.header",
  "settings/domains",
  "settings/domains.hosting",
  "settings/domains.sending",
  "settings/embedding",
  "settings/integrations",
  "settings/integrations/<str:pk>",
  "settings/notifications",
  "settings/paid-subscriptions",
  "settings/paid-subscriptions/disconnect",
  "settings/paid-subscriptions/new",
  "settings/profile",
  "settings/referrals",
  "settings/security",
  "settings/security/<uuid:pk>/delete",
  "settings/security/new",
  "settings/sponsorships",
  "settings/subscribing",
  "settings/subscribing/inputs/new",
  "settings/subscribing/unsubscription-reasons/new",
  "settings/subscribing.confirmation",
  "settings/subscribing.gift",
  "settings/subscribing.premium_welcome",
  "settings/subscribing.reminder",
  "settings/subscribing.welcome",
  "settings/subscriptions",
  "settings/team",
  "settings/team/<uuid:pk>/",
  "settings/team/<uuid:pk>/delete/",
  "settings/team/new",
  "settings/tracking",
  "sponsorships",
  "sponsorships/<uuid:pk>",
  "sponsorships/new",
  "subscribers",
  "subscribers/<uuid:pk>",
  "subscribers/imports/<uuid:pk>",
  "subscribers/imports/new",
  "subscribers/new",
  "surveys",
  "surveys/<uuid:pk>",
  "surveys/<uuid:pks>/delete",
  "surveys/<uuid:pks>/status",
  "surveys/new",
  "tags",
  "tags/new",
  "tags/<uuid:pk>",
  "unsubscription-from-lifecycle-emails-success",
  "webhooks",
  "webhooks/<uuid:pk>",
  "webhooks/new",
  "register",

  // Marketing stuff.
  "pricing",
  "features/smtp-endpoint",
  "features/analytics",
  "features/integrations",
  "features/integrations/soundcloud",
  "features/integrations/youtube",
  "features/concierge-migration",
  "comparison-guides/esps",
  "blog/lead-magnets",
  "legal/privacy",
  "legal/cookies",

  // Specific pages.
  "el-classico/archive/who-was-telemachus-anyway/",
  "the-modern/archive/the-modern-template/",
  "cryptography-dispatches",
  "occasional-puzzles?tag=utm_source:buttondown_website",
  "<yourusername>/referral/{{ subscriber.referral_code }}",
];

// Glossary pages that are linked less than 2x in the docs.
// First try and find pages that could benefit from having a link to the page. But don't force it if it seems unnatural.
// If you've checked through docs, and you're _really_ sure it can't be linked, add to this list.
const KNOWN_GLOSSARY_PAGES_WITHOUT_INTERNAL_LINKS = [
  "glossary-amp.mdoc",
  "glossary-cac.mdoc",
  "glossary-cpm.mdoc",
  "glossary-drip-sequence.mdoc",
  "glossary-gravatar.mdoc",
  "glossary-can-spam.mdoc",
  "glossary-posse.mdoc",
  "glossary-spamassassin.mdoc",
  "glossary-transactional-email.mdoc",
  "glossary-webmentions.mdoc",
  "glossary-latex.mdoc",
  "glossary-omnichannel.mdoc",
];

const CHANGELOG_FILE = `api-changelog.mdoc`;

const mungeInternalLinks = (internalLink: string) => {
  // Remove any hashes, transforming /foo#bar to /foo.
  return internalLink.replace(/#.*$/, "");
};

const extractInternalLinks = (content: string): string[] => {
  // We look for links in two places:
  // 1. Markdown internal links, e.g. [foo](/bar)
  // 2. The `relatedPages` field, which is a list of slugs.
  const internalLinks = content.match(/\[.*?\]\(.*?\)/g);
  const qualifiedInternalLinks =
    (internalLinks
      ?.map((link) => {
        const path = link.match(/\[.*?\]\((.*?)\)/)?.[1].trim();

        if (path?.startsWith("http")) {
          return null;
        }

        if (path?.startsWith("mailto:")) {
          return null;
        }

        if (path?.startsWith("#")) {
          return null;
        }

        if (path?.startsWith("{")) {
          return null;
        }

        // For now, we'll filter out any images or other non-page links under
        // the assumption that they can be caught elsewhere (e.g. the build step.)
        if (
          path &&
          path.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|pdf|css|json)$/)
        ) {
          return null;
        }
        return path;
      })
      .filter((link) => link !== null) as string[]) || [];

  // We also look for related pages. The frontmatter looks like the following:
  // > relatedPages:
  // >   - foo
  // >   - bar-baz
  // > ---
  // And so we should match on `foo` and `bar-baz`.
  const relatedPages = content.match(/relatedPages:\s*(\n\s*- .*)+/g);
  const qualifiedRelatedPages =
    relatedPages
      ?.map((relatedPage) => {
        return (
          relatedPage
            .replace("relatedPages:", "")
            .split("\n")
            .filter((line) => line.trim().length > 0)
            // Remove the `- ` prefix.
            .map((line) => line.replace(/- /, "").trim())
            // Also remove wrapping quotes, if they exist.
            .map((slug) => slug.replace(/'/g, ""))
            // Ignore any empty lists (`[]`)
            .filter((slug) => slug !== "[]")
            .map((slug) => "/" + slug.trim())
        );
      })
      .flat() || [];
  return [...qualifiedInternalLinks, ...qualifiedRelatedPages];
};

const extractApplicationLinks = (content: string): string[] => {
  const links = (
    content.match(/\(https:\/\/buttondown.email\/(.*?)\)/g) || []
  ).map((link) => link.replace("(", "").replace(")", ""));

  return links;
};

const FILENAME_TO_RAW_CONTENT = fs.readdirSync(MARKDOC_DIRECTORY).reduce(
  (acc, filename) => {
    const fullyQualifiedFilename = `${MARKDOC_DIRECTORY}/${filename}`;
    acc[filename] = fs.readFileSync(fullyQualifiedFilename, "utf-8");
    return acc;
  },
  {} as { [filename: string]: string }
);

const FILENAME_TO_INTERNAL_LINKS = Object.entries(
  FILENAME_TO_RAW_CONTENT
).reduce(
  (acc, [filename, content]) => {
    acc[filename] = extractInternalLinks(content);
    return acc;
  },
  {} as { [filename: string]: string[] }
);

const FILENAME_TO_APPLICATION_LINKS = Object.entries(
  FILENAME_TO_RAW_CONTENT
).reduce(
  (acc, [filename, content]) => {
    acc[filename] = extractApplicationLinks(content);
    return acc;
  },
  {} as { [filename: string]: string[] }
);

Object.entries(FILENAME_TO_APPLICATION_LINKS).forEach(([filename, routes]) => {
  if (routes.length === 0) {
    return;
  }

  test(filename + " only has valid application routes", () => {
    routes.forEach((route) => {
      expect(VALID_APPLICATION_ROUTES).toContain(
        route
          .replace("https://buttondown.email/", "")
          .replace("https://buttondown.com/", "")
      );
    });
  });
});

test("All redirect destinations are valid", () => {
  REDIRECTS.forEach(({ source, destination }) => {
    // We only care about relative links.
    if (destination.startsWith("http")) {
      return;
    }

    const presumptiveFilepath = `content/pages${destination}.mdoc`;
    expect(
      fs.existsSync(presumptiveFilepath),
      `Redirect from "${source}" to "${destination}" does not exist.`
    ).toBeTruthy();
  });
});

// Make sure all mdoc files with internal links are valid.
Object.entries(FILENAME_TO_INTERNAL_LINKS).forEach(
  ([filename, internalLinks]) => {
    test("Check internal links in " + filename, () => {
      internalLinks.forEach((outboundPath) => {
        const mungedOutboundPath = mungeInternalLinks(outboundPath);
        const expectedOutboundFilename = `${MARKDOC_DIRECTORY}/${mungedOutboundPath}.mdoc`;
        expect(
          fs.existsSync(expectedOutboundFilename),
          `Internal link to "/${outboundPath}" in "${filename}" does not exist.`
        ).toBeTruthy();
      });
    });

    // Make sure that all glossary terms (which begin with `/glossary-`) are linked to at least twice.
    const isGlossaryTerm = filename.startsWith("glossary-");
    if (
      isGlossaryTerm &&
      !KNOWN_GLOSSARY_PAGES_WITHOUT_INTERNAL_LINKS.includes(filename)
    ) {
      test(filename + " is linked to at least twice", () => {
        const references = Object.entries(FILENAME_TO_INTERNAL_LINKS).filter(
          ([_, links]) => links.includes("/" + filename.replace(".mdoc", ""))
        );
        expect(references.length).toBeGreaterThanOrEqual(2);
      });
    }

    // Make sure that all changelog posts (which begin with `/api-changelog-`) are linked in the main changelog file
    const isChangelogPage = filename.startsWith("api-changelog-");
    if (isChangelogPage) {
      test("Changelog contains link to " + filename, () => {
        const changelogLinks = FILENAME_TO_INTERNAL_LINKS[CHANGELOG_FILE];
        const references = Object.entries(changelogLinks).filter(([_, links]) =>
          links.includes("/" + filename.replace(".mdoc", ""))
        );
        expect(references.length).toBeGreaterThanOrEqual(1);
      });
    }
  }
);

const MAXIMUM_TITLE_LENGTH = 60;

// Make sure that there are no broken video links.
Object.entries(FILENAME_TO_RAW_CONTENT).forEach(([filename, content]) => {
  test(filename + " has only valid video links", () => {
    const matches = content.matchAll(/{% video file="(.*?)" \/%}/g);
    for (const match of matches) {
      const path = match[1];
      expect(fs.existsSync(`public/${path}`)).toBeTruthy();
    }
  });

  test(filename + " has a recommended title length ", () => {
    const title = content.match(/title: (.*)/)?.[1];
    expect(title?.length).toBeLessThanOrEqual(MAXIMUM_TITLE_LENGTH);
  });
});

// Make sure all schemas with $ref in properties have URLs.
Object.entries(FILENAME_TO_RAW_CONTENT).forEach(([filename, content]) => {
  // Check for the `schema` key in front matter.
  const schemaNameLine = content.match(/schema: (.*)/);
  if (!schemaNameLine) {
    return;
  }
  const schemaName = schemaNameLine[1];
  const schema =
    OpenAPI.components.schemas[
      schemaName as keyof typeof OpenAPI.components.schemas
    ];
  // @ts-ignore
  const refs = Object.values(schema.properties).filter(
    (property) => "$ref" in (property as OpenAPIProperty)
  );
  refs.forEach((ref) => {
    // @ts-ignore
    test(`${ref.$ref} (referenced by ${filename}) has a URL in the schema`, () => {
      expect(
        // @ts-ignore
        urlForSchema((ref as OpenAPIProperty).$ref as string),
        // @ts-ignore
        `Reference to ${(ref as OpenAPIProperty).$ref} in ${filename} does not have a URL in the schema. Maybe try running \`just docs-v2/generate-indexes\`?`
      ).toBeTruthy();
    });
  });
});

// Make sure all mdoc files are in the navigation data.
fs.readdirSync(MARKDOC_DIRECTORY).forEach((filename) => {
  const slugs = Object.values(NAVIGATION).flatMap((section) =>
    section.flatMap((subsection) => subsection.items.map((item) => item.value))
  );

  test(filename + " is in the nav", () => {
    expect(slugs.includes(filename.replace(".mdoc", ""))).toBeTruthy();
  });

  test(filename + " only appears once in the nav", () => {
    expect(
      slugs.filter((slug) => slug === filename.replace(".mdoc", "")).length
    ).toBe(1);
  });
});

test("Glossary is sorted correctly", () => {
  const glossary = NAVIGATION.reference.find(
    (section) => section.name === "Glossary"
  );
  const glossaryItems = glossary?.items.map((item) => item.value) || [];
  const sortedGlossaryItems = [...glossaryItems].sort();
  expect(glossaryItems).toEqual(sortedGlossaryItems);
});

const IMAGE_SUFFIXES = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".mp4"];
const IMAGE_DIRECTORY = "public/images";

const ALL_IMAGES = fs
  .readdirSync(IMAGE_DIRECTORY, {
    recursive: true,
    encoding: "utf-8",
  })
  .filter((filename) => IMAGE_SUFFIXES.some((suffix) => filename.endsWith(suffix)));

ALL_IMAGES.forEach((filename) => {
  test(filename + " is under 1MB", () => {
    // Skip the test if it's an `mp4`.
    if (filename.endsWith(".mp4")) {
      return;
    }
    const image = fs.readFileSync(`${IMAGE_DIRECTORY}/${filename}`);
    expect(image.length).toBeLessThan(1024 * 1024);
  });

test(filename + " is referenced by at least one page", () => {
    const references = Object.entries(FILENAME_TO_RAW_CONTENT).filter(([_, content]) => content.includes(filename));
    expect(references.length).toBeGreaterThan(0);
});
});
