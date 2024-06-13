import { promises as fs } from "node:fs";
import SEARCH from "@/autogen/index.json";
import PRICES from "@/autogen/prices.json";
import Notice from "@/components/Notice";
import ObjectDescription, {
  extractParameters,
  extractSchemaFromContent,
  fixtureForRef,
} from "@/components/ObjectDescription";
import Parameter from "@/components/Parameter";
import Code from "@/components/code";
import Layout from "@/components/layout";
import keystaticConfig, { contentBaseUrl } from "@/keystatic.config";
import { TITLE } from "@/lib/constants";
import OpenAPIEnums from "@/lib/openapi/enums.json";
import OpenAPI from "@/lib/openapi/openapi.json";
import type {
  Method,
  Object as OpenAPIObject,
  Operation,
} from "@/lib/openapi/types";
import { type Entry, createReader } from "@keystatic/core/reader";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { marked } from "marked";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import type { Lang } from "shiki";
import CustomizableContent from "./customizable-content";
import Iframe from "./iframe";
import ImageWithLightbox from "./image-with-lightbox";
import LiveCodeBlock from "./live-code-block";
import Video from "./video";

const USERNAME_KEY = "buttondown_newsletter_username";

type Props = {
  params: {
    slug: string;
  };
};

function slugify(text: string): string {
  return (text || "")
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

async function pageFromSlug(slug: string) {
  const reader = createReader(contentBaseUrl, keystaticConfig);
  const page = await reader.collections.pages.read(slug);
  const relatedPages =
    page === null
      ? []
      : await Promise.all(
          page.relatedPages.map(async (s: string | null) => {
            if (!s) {
              return null;
            }
            const subpage = await reader.collections.pages.read(s);
            return {
              slug: s,
              title: subpage?.title,
            };
          }),
        );

  if (!page) {
    notFound();
  }

  return {
    ...page,
    relatedPages: relatedPages.filter((p) => p !== null) as Array<{
      slug: string;
      title: string | null;
    }>,
  };
}

const extractResponses = <Endpoint extends "/comments", Method extends "get">(
  endpoint: Endpoint,
  method: Method,
) => {
  const endpointData = OpenAPI.paths[endpoint];
  const operation = endpointData[method];
  return Object.entries(operation.responses).map(([key, value]) => ({
    status: key,
    description: value.description,
    // biome-ignore lint/suspicious/noExplicitAny: trust me bro
    fixture: extractSchemaFromContent((value as any).content),
  }));
};

export async function generateMetadata({ params: { slug } }: Props) {
  const page = await pageFromSlug(slug);

  return {
    title: `${page.title} | ${TITLE}`,
    alternates: {
      canonical: `https://docs.buttondown.email/${slug}`,
    },
    openGraph: {
      title: `${page.title} | ${TITLE}`,
      description: page.description,
      url: `https://docs.buttondown.email/${slug}`,
      type: "website",
      locale: "en_US",
      siteName: TITLE,
    },
  };
}

type Page = Omit<
  Entry<(typeof keystaticConfig)["collections"]["pages"]>,
  "relatedPages"
> & {
  slug: string;
  relatedPages: Array<{ slug: string; title: string | null }>;
};

const generateJSONLDMetadata = (page: Page) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://docs.buttondown.email/${page.slug}`,
    },
    headline: page.title,
    description: page.description,
    author: {
      "@type": "Organization",
      name: "Buttondown",
      url: "https://buttondown.email",
    },
    publisher: {
      "@type": "Organization",
      name: "Buttondown",
      logo: {
        "@type": "ImageObject",
        url: "https://buttondown.email/static/images/icons/icon@400.png",
      },
    },
    datePublished: page.date,
  };
};

export default async function DocsPage({ params: { slug } }: Props) {
  const page = await pageFromSlug(slug);

  if (page.schema) {
    const schema = page.schema as OpenAPIObject;
    return (
      <Layout slug={slug} title={page.title}>
        <ObjectDescription name={schema} />
      </Layout>
    );
  }

  if (page.method && page.endpoint) {
    const endpoint = page.endpoint as "/comments";
    const method =
      page.method as keyof (typeof OpenAPI.paths)[typeof endpoint] as "get";
    const operation = OpenAPI.paths[endpoint][method] as Operation<
      typeof endpoint,
      Method<typeof endpoint>
    >;
    const responses = extractResponses(endpoint, method);

    const snippets = {
      python: (await fs.readFile("public/code/api/base.py", "utf-8"))
        .replace('ENDPOINT = "/emails"', `ENDPOINT = "${endpoint}"`)
        .replace('METHOD = "GET"', `METHOD = "${method.toUpperCase()}"`)
        .replace("{id_or_email}", "telemachus@buttondown.email"),
      ruby: (await fs.readFile("public/code/api/base.rb", "utf-8"))
        .replace('endpoint = "/emails"', `endpoint = "${endpoint}"`)
        .replace('method = "GET"', `method = "${method.toUpperCase()}"`)
        .replace("{id_or_email}", "telemachus@buttondown.email"),
      javascript: (await fs.readFile("public/code/api/base.ts", "utf-8"))
        .replace('const ENDPOINT = "/emails"', `const ENDPOINT = "${endpoint}"`)
        .replace(
          'const METHOD = "GET"',
          `const METHOD = "${method.toUpperCase()}"`,
        )
        .replace("{id_or_email}", "telemachus@buttondown.email"),
    };

    return (
      <Layout slug={slug} title={page.title}>
        <DocumentRenderer document={await page.content()} />
        <h2 className="mb-1">Sample requests</h2>
        <p>These sample requests are autogenerated by the OpenAPI spec.</p>
        <Code
          blocks={[
            {
              name: "Python",
              code: snippets.python,
              language: "python",
            },
            {
              name: "Ruby",
              code: snippets.ruby,
              language: "ruby",
            },
            {
              name: "JavaScript",
              code: snippets.javascript,
              language: "javascript",
            },
          ]}
        />
        <hr />
        <h2 className="mb-1">Sample responses</h2>
        <p>
          The IDs and values referenced in these responses are fake; please only
          rely on these responses for overall structure.
        </p>
        <Code
          blocks={responses.map((response) => ({
            name: `${response.description} (${response.status})`,
            code: response.fixture
              ? JSON.stringify(fixtureForRef(response.fixture), null, 4)
              : "{}",
            language: "json",
          }))}
        />

        {operation.parameters.length > 1 && (
          <>
            <hr />
            <h2 className="mb-1">Path parameters</h2>
            {operation.parameters?.map((parameter) => (
              <Parameter
                key={parameter.name}
                type={{
                  type: "string",
                  value: parameter.schema.type || "string",
                }}
                name={parameter.name}
                description={parameter.description}
                required={parameter.required === true}
              />
            ))}
          </>
        )}

        <hr />

        {operation.requestBody && (
          <>
            <h2 className="mb-1">Body parameters</h2>
            <p>All parameters are optional unless explicitly specified.</p>
            {extractParameters(operation).map((parameter) => (
              <Parameter
                key={parameter.parameter}
                type={parameter.type}
                name={parameter.parameter}
                required={parameter.optional === false}
              />
            ))}
          </>
        )}
      </Layout>
    );
  }

  if (page.enum) {
    const pageEnum = page.enum as keyof typeof OpenAPIEnums;

    const metadata = SEARCH.find((s) => s.url === slug);
    const hasReferences =
      metadata?.references && metadata?.references.length > 0;

    return (
      <Layout slug={slug} title={page.title}>
        <p>{OpenAPI.components.schemas[pageEnum].description}</p>
        <hr />
        {Object.entries(OpenAPIEnums[pageEnum]).map(([name, spec]) => (
          <Parameter
            id={name}
            key={name}
            name={spec.name}
            type={{ value: name, type: "string" }}
            description={spec.description}
          />
        ))}
        <hr />
        {hasReferences && (
          <>
            <h3>Referenced by</h3>
            {SEARCH.find((s) => s.url === slug)?.references.map((reference) => (
              <Link
                key={reference}
                href={SEARCH.find((s) => s.url === reference)?.url || ""}
                className="block"
              >
                {SEARCH.find((s) => s.url === reference)?.title}
              </Link>
            ))}
          </>
        )}
      </Layout>
    );
  }

  return (
    <Layout slug={slug} title={page.title}>
      <DocumentRenderer
        document={await page.content()}
        renderers={{
          block: {
            heading: ({ level, children }) => {
              const Heading = `h${level}` as keyof JSX.IntrinsicElements;
              const slug = slugify(
                // @ts-ignore
                children ? (children[0] as ReactNode).props.node.text : "",
              );
              return <Heading id={slug}>{children}</Heading>;
            },
            image: ImageWithLightbox,
            code: ({ children, language }) => (
              <Code
                blocks={[
                  {
                    language: (language as Lang) ?? "text",
                    code: children,
                  },
                ]}
              />
            ),
          },
        }}
        componentBlocks={{
          multilanguageSnippets: (props) => {
            return (
              <div className="not-prose">
                <Code
                  blocks={
                    [
                      {
                        name: "Python",
                        code: props.python,
                        language: "python",
                      },
                      {
                        name: "Ruby",
                        code: props.ruby,
                        language: "ruby",
                      },
                      {
                        name: "cURL",
                        code: props.curl,
                        language: "bash",
                      },
                      {
                        name: "JavaScript",
                        code: props.javascript,
                        language: "javascript",
                      },
                    ].filter(
                      (block) =>
                        block.code !== undefined && block.code.trim() !== "",
                    ) as {
                      name: string;
                      code: string;
                      language: Lang;
                    }[]
                  }
                />
              </div>
            );
          },
          customizableContent: (props) => (
            <CustomizableContent
              loggedInHtml={marked(props.loggedIn)}
              anonymousHtml={marked(props.anonymous)}
            />
          ),
          paidFeature: (props) => {
            return (
              <Notice type="info">
                This feature requires a{" "}
                <a
                  href="https://buttondown.email/pricing"
                  target="_blank"
                  className="text-inherit font-normal whitespace-nowrap"
                  rel="noreferrer"
                >
                  {
                    PRICES.find((price) =>
                      price.features.includes(props.feature),
                    )?.name
                  }{" "}
                  plan.
                </a>
              </Notice>
            );
          },
          supportSnippet: () => {
            return (
              <div>
                <h3>Reach out to your friends at Buttondown</h3>
                <p>
                  As always, we’re happy to answer any questions you may have
                  via{" "}
                  <a href="mailto:support@buttondown.email">
                    support@buttondown.email.
                  </a>
                </p>
              </div>
            );
          },
          exportButtondownData: () => {
            return (
              <div>
                <h3>By the way</h3>
                <p>
                  With Buttondown, it&#39;s easy to{" "}
                  <a href="/data-exports">export</a> your subscribers, surveys,
                  emails, and other data whenever you wish—no strings attached!
                </p>
                <img
                  src="/images/exporting.png"
                  alt='A screenshot of the "export data" button.'
                  title=""
                  className="cursor-zoom-in"
                />
              </div>
            );
          },
          noticeInfo: (props) => {
            return <Notice type="info">{props.text}</Notice>;
          },
          noticeWarn: (props) => {
            return <Notice type="warning">{props.text}</Notice>;
          },
          snippetSpacer: () => {
            return <br />;
          },
          renderable: (props) => {
            return (
              <div className="not-prose">
                <Code
                  blocks={[
                    {
                      name: "Before",
                      code: props.html,
                      language: "html",
                    },
                    {
                      name: "After",
                      code: props.html,
                      language: "html",
                    },
                  ]}
                />
              </div>
            );
          },
          preview: (props) => {
            return (
              <div className="border border-gray-200 text-center p-8 mt-4 bg-gray-100">
                <div className="shadow-sm border border-gray-300 divide-y divide-gray-300">
                  <div className="bg-white p-4 text-sm text-left border-b-0 overflow-x-scroll">
                    <div className="font-mono whitespace-pre">
                      {props.before}
                    </div>
                  </div>
                  <div
                    className="text-gray-800 bg-white p-4 text-left"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: It's fine
                    dangerouslySetInnerHTML={{ __html: props.after }}
                  />
                </div>
              </div>
            );
          },
          iframe: (props) => <Iframe src={props.src} />,
          video: (props) => <Video src={props.file} />,
          liveCodeBlock: (props) => <LiveCodeBlock path={props.filename} />,
        }}
      />

      {page.relatedPages.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mt-8">Related</h2>
          <ul className="mt-4">
            {page.relatedPages.map((relatedPage) => {
              if (!relatedPage) {
                return null;
              }

              return (
                <li key={relatedPage.slug}>
                  <a
                    href={`/${relatedPage.slug}`}
                    className="text-blue-600 underline"
                  >
                    {relatedPage.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: It's fine
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateJSONLDMetadata({
              ...page,
              slug,
            }),
          ),
        }}
      />
    </Layout>
  );
}

export async function generateStaticParams() {
  const reader = createReader(contentBaseUrl, keystaticConfig);
  const slugs = await reader.collections.pages.list();

  return slugs.map((slug) => ({ slug }));
}
