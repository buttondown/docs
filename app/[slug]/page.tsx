import { createReader } from "@keystatic/core/reader";
import { marked } from "marked";
import Link from "next/link";
import { notFound } from "next/navigation";
import Code from "@/components/code";
import Document from "@/components/Document";
import Layout from "@/components/layout";
import ObjectDescription, {
  extractParameters,
  extractSchemaFromContent,
  fixtureForRef,
} from "@/components/ObjectDescription";
import Parameter from "@/components/Parameter";
import keystaticConfig, { localBaseURL } from "@/keystatic.config";
import { DESCRIPTION, TITLE } from "@/lib/constants";
import { buildContentArray } from "@/lib/search/server";
import { generateJSONLDMetadata } from "@/lib/jsonld";
import {
  default as ErrorCodeEnums,
  default as OpenAPIEnums,
} from "@/lib/openapi/enums.json";
import type {
  Method,
  Object as OpenAPIObject,
  Operation,
} from "@/lib/openapi/types";
import OpenAPI from "@/public/openapi.json";
import { CodeSnippets } from "./CodeSnippets";
import { generateSnippets, plainOas } from "./oas";

type Props = {
  params: Promise<{
    slug: string;
  }>;
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
            return {
              slug: s,
              title: (await reader.collections.pages.read(s))?.title,
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

type ErrorResponse = {
  status: string;
  description: string;
  errorCodes?: Array<{
    code: string;
    name: string;
    description: string;
  }>;
};

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fixture: extractSchemaFromContent((value as any).content),
  }));
};

const extractErrorCodes = <Endpoint extends "/comments", Method extends "get">(
  endpoint: Endpoint,
  method: Method,
) => {
  const endpointData = OpenAPI.paths[endpoint];
  const operation = endpointData[method];
  const errorResponses: Array<ErrorResponse> = [];

  Object.entries(operation.responses)
    .filter(([status]) => {
      return parseInt(status) >= 400;
    })
    .forEach(([status, response]) => {
      // biome-ignore lint/suspicious/noExplicitAny: OpenAPI response type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const responseAny = response as any;
      const errorResponse: ErrorResponse = {
        status,
        description: responseAny.description,
      };

      // Check if this response has error codes
      if (responseAny.content?.["application/json"]?.schema?.$ref) {
        const ref = responseAny.content["application/json"].schema.$ref;
        // Extract the schema name from the ref
        const schemaName = ref.split("/").pop();

        // Check if this is an error message with error codes
        if (
          schemaName &&
          schemaName.includes("ErrorMessage_") &&
          schemaName.includes("ErrorCode")
        ) {
          // Get the error code enum name from the schema
          // biome-ignore lint/suspicious/noExplicitAny: OpenAPI schema type
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const errorMessageSchema = (OpenAPI.components.schemas as any)[
            schemaName
          ];
          if (errorMessageSchema?.properties?.code?.$ref) {
            const errorCodeEnumRef = errorMessageSchema.properties.code.$ref;
            const errorCodeEnumName = errorCodeEnumRef.split("/").pop();

            // Get the actual error codes from the enum
            // biome-ignore lint/suspicious/noExplicitAny: OpenAPI schema type
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const errorCodeEnum = (OpenAPI.components.schemas as any)[
              errorCodeEnumName
            ];
            if (errorCodeEnum?.enum) {
              errorResponse.errorCodes = errorCodeEnum.enum.map(
                (code: string) => {
                  // Get description from the enums.json file
                  // biome-ignore lint/suspicious/noExplicitAny: Enum data type
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const enumData = (ErrorCodeEnums as any)[errorCodeEnumName];
                  const codeData = enumData?.[code];
                  return {
                    code,
                    name:
                      codeData?.name ||
                      code
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase()),
                    description: codeData?.description || "",
                  };
                },
              );
            }
          }
        }
      }

      errorResponses.push(errorResponse);
    });

  return errorResponses;
};

export async function generateMetadata(props: Props) {
  const { slug } = await props.params;

  const page = await pageFromSlug(slug);

  const pageDescription = page.description || DESCRIPTION;

  return {
    title: `${page.title} | ${TITLE}`,
    description: pageDescription,
    metadataBase: new URL("https://docs.buttondown.com"),
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      title: `${page.title} | ${TITLE}`,
      description: pageDescription,
      url: `/${slug}`,
      type: "website",
      locale: "en_US",
      siteName: TITLE,
    },
  };
}

export default async function DocsPage(props: Props) {
  const params = await props.params;

  const { slug } = params;

  const page = await pageFromSlug(slug);

  if (page.schema) {
    const schema = page.schema as OpenAPIObject;
    return (
      <Layout slug={slug} title={page.title}>
        <Document page={{ ...page, slug }} />
        <ObjectDescription name={schema} />
      </Layout>
    );
  }

  if (page.method && page.endpoint) {
    const plainOp = plainOas.operation(
      page.endpoint,
      // biome-ignore lint/suspicious/noExplicitAny: method has to be get/post/put/delete
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    const hasPathParams =
      plainOp.getParameters().filter((p) => p.in === "path").length > 0;

    const snippets = await generateSnippets({
      method: page.method,
      endpoint: page.endpoint,
    });

    return (
      <Layout slug={slug} title={page.title}>
        <Document
          page={{
            ...page,
            slug,
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
        <CodeSnippets snippets={snippets} />
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
                values={parameter.values}
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
                values={parameter.values}
              />
            ))}
          </>
        )}

        {(() => {
          const errorResponses = extractErrorCodes(endpoint, method);
          const responsesWithCodes = errorResponses.filter(
            (r) => r.errorCodes && r.errorCodes.length > 0,
          );

          if (responsesWithCodes.length > 0) {
            return (
              <>
                <hr />
                <h2 className="mb-1">Error codes</h2>
                <p>
                  This endpoint may return the following error codes. See the{" "}
                  <Link href="/api-error-codes">error codes reference</Link> for
                  more details about error handling.
                </p>
                {responsesWithCodes.map((response) => (
                  <div key={response.status} className="mt-4">
                    <table className="mt-2 w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Error Code</th>
                          <th className="text-left py-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {response.errorCodes
                          ?.sort((a, b) => a.code.localeCompare(b.code))
                          .map((errorCode) => (
                            <tr key={errorCode.code} className="border-b">
                              <td className="py-2">
                                <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">
                                  {errorCode.code}
                                </code>
                              </td>
                              <td className="py-2 text-sm">
                                {errorCode.description ||
                                  "No description available"}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </>
            );
          }
          return null;
        })()}
      </Layout>
    );
  }

  if (page.enum) {
    const pageEnum = page.enum as keyof typeof OpenAPIEnums;

    const contentArray = buildContentArray();
    const metadata = contentArray.find((s) => s.slug === slug);
    const hasReferences =
      metadata?.references && metadata?.references.length > 0;

    const enumDescriptions = OpenAPIEnums[pageEnum];

    if (enumDescriptions === undefined) {
      throw new Error(
        `No enum descriptions found for ${page.enum}. Did you forget to:\n1. Add them to \`shared/enums.json\`?\n2. Run \`mise //app:generate-files\`?`,
      );
    }

    return (
      <Layout slug={slug} title={page.title}>
        <Document
          page={{
            ...page,
            slug,
          }}
        />
        <div
          // biome-ignore lint/security/noDangerouslySetInnerHtml: It's fine
          dangerouslySetInnerHTML={{
            __html: marked(OpenAPI.components.schemas[pageEnum].description),
          }}
          className="-my-2"
        />
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
            {metadata?.references.map((reference) => {
              const refPage = contentArray.find((s) => s.slug === reference);
              return (
                <Link
                  key={reference}
                  href={refPage?.slug || ""}
                  className="block"
                >
                  {refPage?.title}
                </Link>
              );
            })}
          </>
        )}
      </Layout>
    );
  }

  return (
    <Layout slug={slug} title={page.title}>
      <Document
        page={{
          ...page,
          slug,
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
      {slug.includes("api-changelog-") && (
        <div>
          <hr />
          <h3>Stay informed</h3>
          <p>
            You can subscribe to this changelog via{" "}
            <a href={`/rss/api-changelog`} target="_blank" rel="noopener">
              RSS
            </a>{" "}
            or{" "}
            <Link href="/api-changelog">
              browse the full list of API changes
            </Link>
            .
          </p>
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
  // Skip prerendering on preview deployments to speed up builds.
  // Pages will be rendered on-demand instead.
  if (process.env.VERCEL_ENV !== "production") {
    return [];
  }

  const reader = createReader(localBaseURL, keystaticConfig);
  const slugs = await reader.collections.pages.list();

  return slugs.map((slug) => ({ slug }));
}
