import OpenAPI from "@/lib/openapi/openapi.json";
import oasToSnippet from "@readme/oas-to-snippet";
import { Language } from "@readme/oas-to-snippet/languages";
import Oas from "oas";
import OASNormalize from "oas-normalize";

export const plainOas = Oas.init(structuredClone(OpenAPI));

export async function getOas() {
  const oas = new OASNormalize(structuredClone(OpenAPI));
  // biome-ignore lint/suspicious/noExplicitAny: types for OpenAPI schemas are broken
  const circularOas = Oas.init((await oas.deref()) as any);
  return { circularOas };
}

export async function generateSnippets({
  endpoint,
  method,
}: {
  endpoint: string;
  method: string;
}) {
  const { circularOas } = await getOas();
  const circularOp = circularOas.operation(
    endpoint,
    // biome-ignore lint/suspicious/noExplicitAny: method has to be get/post/put/delete
    method.toLowerCase() as any,
  );

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

  return generateSnippetsWithSpecifiedBody({
    endpoint,
    method,
    body: body ?? {},
  });
}

export type SnippetDefinition = {
  endpoint: string;
  method: string;
  body?: { [key: string]: any };
  headers?: { [key: string]: string };
  query?: { [key: string]: string };
};

export function generateSnippetsWithSpecifiedBody({
  endpoint,
  method,
  body,
  headers,
  query,
}: SnippetDefinition) {
  const plainOp = plainOas.operation(
    endpoint,
    // biome-ignore lint/suspicious/noExplicitAny: method has to be get/post/put/delete
    method.toLowerCase() as any,
  );

  const header = {
    Authorization: "Token $BUTTONDOWN_API_KEY",
    ...headers,
  };

  const generateSnippet = (lang: Language) => {
    // oas-snippet freaks out when using circular schemas because it tries to JSON.stringify, so we use "plain" versions
    let { code } = oasToSnippet(
      plainOas,
      plainOp,
      { body, header, query },
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
  return snippets;
}
