/* This file is a test suite for the documentation. It checks for broken links, missing glossary terms, and other issues.
   Before adding to this file, please consider whether the test should be in a different file, closer with the behavior under test. */
import dotenv from "dotenv";
import fs from "fs";
import matter from "gray-matter";
import { expect, test } from "vitest";
import { OpenAPIProperty, urlForSchema } from "./components/ObjectDescription";
import NAVIGATION from "./content/navigation.json";
import OpenAPI from "./public/openapi.json";
import REDIRECTS from "./redirects.mjs";

dotenv.config();

const MARKDOC_DIRECTORY = "content/pages";

const VALID_APPLICATION_ROUTES = [
  ...JSON.parse(
    fs.readFileSync("./autogen/author_facing_routes.json", "utf-8")
  ),

  // Marketing stuff.
  "pricing",
  "support",
  "features/smtp-endpoint",
  "features/analytics",
  "features/teams",
  "features/integrations",
  "features/integrations/soundcloud",
  "features/integrations/youtube",
  "features/integrations/memberful",
  "features/integrations/transistor",
  "features/integrations/spotify",
  "features/integrations/vimeo",
  "features/concierge-migration",
  "comparison-guides/esps",
  "blog/lead-magnets",
  "blog/netlify",
  "legal/privacy",
  "legal/cookies",
  "legal/terms",
  "changelog/2025-02-06",

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
  "glossary-cors.mdoc",
  "glossary-rate-sheet.mdoc",
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
    content.match(/\(https:\/\/buttondown.com\/(.*?)\)/g) || []
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

const VALID_INTERNAL_LINKS_THAT_ARE_NOT_BACKED_BY_MDOC = ["/rss/api-changelog"];

const isInternalURLValid = (url: string) => {
  return (
    VALID_INTERNAL_LINKS_THAT_ARE_NOT_BACKED_BY_MDOC.includes(url) ||
    fs.existsSync(`${MARKDOC_DIRECTORY}/${url}.mdoc`)
  );
};

test("All redirect destinations are valid", () => {
  REDIRECTS.forEach(({ source, destination }) => {
    // We only care about relative links.
    if (destination.startsWith("http")) {
      return;
    }

    expect(
      isInternalURLValid(destination),
      `Redirect from "${source}" to "${destination}" does not exist.`
    ).toBeTruthy();
  });
});

// Make sure all mdoc files with internal links are valid.
Object.entries(FILENAME_TO_INTERNAL_LINKS).forEach(
  ([filename, internalLinks]) => {
    test("Check internal links in " + filename, () => {
      internalLinks.forEach((outboundPath) => {
        expect(
          isInternalURLValid(mungeInternalLinks(outboundPath)),
          `Internal link to "${outboundPath}" in "${filename}" does not exist.`
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
        `Reference to ${
          // @ts-ignore
          (ref as OpenAPIProperty).$ref
        } in ${filename} does not have a URL in the schema. Maybe try running \`just docs/build-indexes\`?`
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

// Make sure that the navigation doesn't reference any pages that don't exist.
Object.values(NAVIGATION).forEach((section) => {
  section.forEach((subsection) => {
    subsection.items.forEach((item) => {
      if (item.discriminant === "page") {
        test(`${item.value} exists`, () => {
          expect(
            fs.existsSync(`content/pages/${item.value}.mdoc`)
          ).toBeTruthy();
        });
      }
    });
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

const IMAGE_SUFFIXES = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".webp",
  ".mp4",
];
const IMAGE_DIRECTORY = "public/images";

const ALL_IMAGES = fs
  .readdirSync(IMAGE_DIRECTORY, {
    recursive: true,
    encoding: "utf-8",
  })
  .filter((filename) =>
    IMAGE_SUFFIXES.some((suffix) => filename.endsWith(suffix))
  );

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
    const references = Object.entries(FILENAME_TO_RAW_CONTENT).filter(
      ([_, content]) => content.includes(filename)
    );
    expect(references.length).toBeGreaterThan(0);
  });
});

// Make sure all API endpoints are referenced by at least one page.
// Ideally, we'd use the `operationID` to reference the page, but for boring
// tech debt reasons we don't actually use that within the codebase so we base it
// off of the path & the method.
const API_ENDPOINTS = Object.entries(OpenAPI.paths).flatMap(([path, method]) =>
  Object.keys(method).map((operation) => {
    return {
      path, // e.g. "/exports"
      operation, // e.g. "post"
    };
  })
);

const FILENAME_TO_FRONTMATTER = Object.entries(FILENAME_TO_RAW_CONTENT).reduce(
  (acc, [filename, content]) => {
    acc[filename] = matter(content).data;
    return acc;
  },
  {} as { [filename: string]: any }
);

// We should try not to add any new un-documented API endpoints,
// and in fact burn down this list over time.
const UNDOCUMENTED_API_ENDPOINTS = [
  {
    path: "/prices",
    operation: "get",
  },
  {
    path: "/exports",
    operation: "get",
  },
  {
    path: "/ping",
    operation: "get",
  },
  {
    path: "/tags/{id}/analytics",
    operation: "get",
  },
  {
    path: "/subscribers/{id_or_email}/clients",
    operation: "get",
  },
  {
    path: "/subscribers/{id_or_email}/referrals",
    operation: "get",
  },
  {
    path: "/subscribers/{id_or_email}/automations",
    operation: "get",
  },
  {
    path: "/subscribers/{id_or_email}/stripe-subscriptions",
    operation: "get",
  },
  {
    path: "/external_feeds/{id}",
    operation: "get",
  },
  {
    path: "/external_feeds/{id}/items",
    operation: "post",
  },
  {
    path: "/external_feeds/{id}/items",
    operation: "get",
  },
  {
    path: "/automations",
    operation: "get",
  },
  {
    path: "/automations",
    operation: "post",
  },
  {
    path: "/automations/{id}/subscribers",
    operation: "get",
  },
  {
    path: "/automations/{id}",
    operation: "get",
  },
  {
    path: "/automations/{id}",
    operation: "patch",
  },
  {
    path: "/automations/{id}",
    operation: "delete",
  },
  {
    path: "/automations/{id}/invoke",
    operation: "post",
  },
  {
    path: "/automations/{id}/analytics",
    operation: "get",
  },
  {
    path: "/users",
    operation: "post",
  },
  {
    path: "/users",
    operation: "get",
  },
  {
    path: "/users/{id}",
    operation: "get",
  },
  {
    path: "/users/{id}",
    operation: "delete",
  },
  {
    path: "/users/{id}",
    operation: "patch",
  },
  {
    path: "/prices",
    operation: "post",
  },
  {
    path: "/surveys/{id}",
    operation: "get",
  },
  {
    path: "/api_requests/{id}",
    operation: "get",
  },
  {
    path: "/api_requests",
    operation: "get",
  },
  {
    path: "/advertising_units",
    operation: "get",
  },
  {
    path: "/advertising_units",
    operation: "post",
  },
  {
    path: "/advertising_units/{id}",
    operation: "patch",
  },
  {
    path: "/advertising_units/{id}",
    operation: "delete",
  },
  {
    path: "/webhooks/{id}",
    operation: "get",
  },
  {
    path: "/survey_responses",
    operation: "post",
  },
  {
    path: "/events/{id}",
    operation: "get",
  },
];

API_ENDPOINTS.filter(
  (endpoint) =>
    !UNDOCUMENTED_API_ENDPOINTS.map((e) => JSON.stringify(e)).includes(
      JSON.stringify(endpoint)
    )
).forEach((endpoint) => {
  test(JSON.stringify(endpoint) + " is referenced by at least one page", () => {
    const relevantPage = Object.entries(FILENAME_TO_FRONTMATTER).find(
      ([filename, frontmatter]) =>
        frontmatter.endpoint === endpoint.path &&
        frontmatter.method === endpoint.operation
    );
    expect(relevantPage).toBeDefined();
  });
});
