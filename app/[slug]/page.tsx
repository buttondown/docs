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
import keystaticConfig, { localBaseURL } from "@/keystatic.config";
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
import oasToSnippet from "@readme/oas-to-snippet";
import type { Language } from "@readme/oas-to-snippet/languages";
import { marked } from "marked";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Lang } from "shiki";
import CustomizableContent from "./customizable-content";
import Heading from "./heading";
import Iframe from "./iframe";
import ImageWithLightbox from "./image-with-lightbox";
import LiveCodeBlock from "./live-code-block";
import { circularOas, plainOas } from "./oas";
import Video from "./video";

const USERNAME_KEY = "buttondown_newsletter_username";

type Props = {
  params: {
    slug: string;
  };
};

async function pageFromSlug(slug: string) {
  const reader = createReader(localBaseURL, keystaticConfig);
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
      canonical: `https://docs.buttondown.com/${slug}`,
    },
    openGraph: {
      title: `${page.title} | ${TITLE}`,
      description: page.description,
      url: `https://docs.buttondown.com/${slug}`,
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
      "@id": `https://docs.buttondown.com/${page.slug}`,
    },
    headline: page.title,
    description: page.description,
    author: {
      "@type": "Organization",
      name: "Buttondown",
      url: "https://buttondown.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Buttondown",
      logo: {
        "@type": "ImageObject",
        url: "https://buttondown.com/static/images/icons/icon@400.png",
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
    const circularOp = circularOas.operation(
      page.endpoint,
      // biome-ignore lint/suspicious/noExplicitAny: method has to be get/post/put/delete
      page.method.toLowerCase() as any,
    );
    const plainOp = plainOas.operation(
      page.endpoint,
      // biome-ignore lint/suspicious/noExplicitAny: method has to be get/post/put/delete
      page.method.toLowerCase() as any,
    );
    const endpoint = page.endpoint as "/comments";
    const method =
      page.method as keyof (typeof OpenAPI.paths)[typeof endpoint] as "get";
    const operation = OpenAPI.paths[endpoint][method] as Operation<
      typeof endpoint,
      Method<typeof endpoint>
    >;
    const responses = extractResponses(endpoint, method);

    // biome-ignore lint/suspicious/noExplicitAny: we are generating a best-attempt request body
    let body: { [key: string]: any } | undefined = undefined;
    if (circularOp.hasRequiredRequestBody() && circularOp.hasRequestBody()) {
      const media = circularOp.getRequestBody("application/json");
      if (media && "schema" in media && media.schema) {
        if ("properties" in media.schema && media.schema.properties) {
          body = {};
          for (const key in media.schema.properties) {
            const spec = media.schema.properties[key];
            if ("in" in spec && spec.in && spec.in === "query") continue;
            if ("example" in spec && spec.example) {
              body[key] = spec.example;
            }
          }
        }
      }
    }
    const header = {
      Authorization: "Token $BUTTONDOWN_API_KEY",
    };

    const hasPathParams =
      plainOp.getParameters().filter((p) => p.in === "path").length > 0;

    const generateSnippet = (lang: Language) => {
      // oas-snippet freaks out when using circular schemas because it tries to JSON.stringify, so we use "plain" versions
      let { code } = oasToSnippet(
        plainOas,
        plainOp,
        { body, header },
        {},
        lang,
      );
      if (!code) throw new Error(`Couldn't generate code snippet for ${lang}`);

      // hack: wrap path params in braces
      for (const param of plainOp.getParameters()) {
        if (param.in !== "path") continue;
        code = code.replace(
          new RegExp(`(/)(${param.name})([/"'])`),
          `$1{${param.name}}$3`,
        );
      }

      return code;
    };

    const snippets = {
      python: generateSnippet("python"),
      ruby: generateSnippet("ruby"),
      javascript: generateSnippet("javascript"),
      curl: generateSnippet("shell"),
    };

    return (
      <Layout slug={slug} title={page.title}>
        <DocumentRenderer
          document={await page.content()}
          componentBlocks={{
            noticeWarn: (props) => {
              return (
                <Notice type="warning">
                  <div
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: It's fine
                    dangerouslySetInnerHTML={{ __html: marked(props.text) }}
                    className="-my-2"
                  />
                </Notice>
              );
            },
          }}
        />
        <h2 className="mb-1">Sample requests</h2>
        <p>
          These sample requests are autogenerated by the OpenAPI spec.
          {hasPathParams && (
            <>
              {" "}
              This endpoint requires one or more parameters in the URL: those
              are offset in curly-braces.
            </>
          )}
        </p>
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
            {
              name: "cURL",
              code: snippets.curl,
              language: "shell",
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
            <p>
              Consult the{" "}
              <Link href="/api-filtering">Filtering documentation</Link> for
              more information on how to filter and sort your requests.
            </p>
            {extractParameters(operation).map((parameter) => (
              <Parameter
                key={parameter.parameter}
                type={parameter.type}
                name={parameter.parameter}
                description={parameter.description}
                required={parameter.optional === false}
              />
            ))}
          </>
        )}

        {operation.requestBody && (
          <>
            <hr />
            <h2 className="mb-1">Body parameters</h2>
            <p>All parameters are optional unless explicitly specified.</p>
            {extractParameters(operation).map((parameter) => (
              <Parameter
                key={parameter.parameter}
                type={parameter.type}
                name={parameter.parameter}
                description={parameter.description}
                required={parameter.optional === false}
                example={parameter.example}
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

    const enumDescriptions = OpenAPIEnums[pageEnum];

    if (enumDescriptions === undefined) {
      throw new Error(
        `No enum descriptions found for ${page.enum}. Did you forget to:\n1. Add them to \`shared/enums.json\`?\n2. Run \`just propagate-shared-files\`?`,
      );
    }

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
            heading: Heading,
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
            const price = PRICES.find((price) =>
              price.features.includes(props.feature),
            );
            return (
              <Notice type="info">
                This feature requires a{" "}
                <a
                  href={`https://buttondown.com/pricing?count=${(price?.subscriber_count || 1) - 1}`}
                  target="_blank"
                  className="text-inherit font-normal whitespace-nowrap"
                  rel="noreferrer"
                >
                  {price?.name}&nbsp;plan.
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
          automation: (props) => (
            <a
              href={props.url}
              className="text-inherit no-underline after:!hidden"
            >
              <div className="border border-gray-300 bg-gray-50 p-4 px-8 text-center hover:scale-105 transition-all cursor-pointer relative overflow-hidden hover:border-green-600 hover:bg-green-100">
                <div className="absolute right-0 top-0 h-12 w-12">
                  <div className="absolute transform rotate-45 bg-gradient-to-tr from-green-500 to-green-600 text-center text-white font-semibold py-1 right-[-50px] top-[25px] w-[170px] text-xs uppercase">
                    Click to use
                  </div>
                </div>
                <div className="font-bold">{props.name}</div>
                <div className="text-sm">{props.description}</div>
                <div className="flex mt-8 items-center text-sm">
                  <div className="bg-gray-700 text-white px-5 py-1 rounded-full">
                    {props.trigger}
                  </div>
                  <div className="border-t border-t-gray-300 flex-1" />
                  <div className="bg-gray-300 text-xs rounded-full px-2 py-1 uppercase -mx-2">
                    then
                  </div>
                  <div className="border-t border-t-gray-300 flex-1" />
                  <div className="bg-blue-600 text-white px-5 py-1 rounded-full">
                    {props.action}
                  </div>
                </div>
              </div>
            </a>
          ),
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
  const reader = createReader(localBaseURL, keystaticConfig);
  const slugs = await reader.collections.pages.list();

  return slugs.map((slug) => ({ slug }));
}
