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

const FILENAME_TO_RAW_CONTENT = fs
  .readdirSync(MARKDOC_DIRECTORY)
  .reduce((acc, filename) => {
    const fullyQualifiedFilename = `${MARKDOC_DIRECTORY}/${filename}`;
    acc[filename] = fs.readFileSync(fullyQualifiedFilename, "utf-8");
    return acc;
  }, {} as { [filename: string]: string });

const FILENAME_TO_INTERNAL_LINKS = Object.entries(
  FILENAME_TO_RAW_CONTENT
).reduce((acc, [filename, content]) => {
  acc[filename] = extractInternalLinks(content);
  return acc;
}, {} as { [filename: string]: string[] });

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

// Make sure that there are no broken video links.
Object.entries(FILENAME_TO_RAW_CONTENT).forEach(([filename, content]) => {
  test(filename + " has only valid video links", () => {
    const matches = content.matchAll(/{% video file="(.*?)" \/%}/g);
    for (const match of matches) {
      const path = match[1];
      expect(fs.existsSync(`public/${path}`)).toBeTruthy();
    }
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
    test(`${ref.$ref} (referenced by ${filename}) has a URL`, () => {
      expect(
        // @ts-ignore
        urlForSchema((ref as OpenAPIProperty).$ref as string)
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
