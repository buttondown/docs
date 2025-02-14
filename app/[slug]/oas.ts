import OpenAPI from "@/lib/openapi/openapi.json";
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

  const combinedHeaders: { [key: string]: string } = {
    Authorization: "Token $BUTTONDOWN_API_KEY",
    ...headers,
  };

  // Helper to stringify objects nicely
  const stringifyObject = (obj: any, extraIndent = 0) =>
    JSON.stringify(obj, null, 2)
      .split("\n")
      .map((line) => " ".repeat(extraIndent) + line)
      .join("\n");

  function patchEndpointParams(fn: (name: string) => string) {
    let patchedEndpoint = endpoint;
    for (const param of plainOp.getParameters()) {
      if (param.in !== "path") continue;
      patchedEndpoint = patchedEndpoint.replace(
        new RegExp(`\\{(${param.name})\\}`, "g"),
        fn(param.name),
      );
    }
    return patchedEndpoint;
  }

  // Define a base URL (adjust as needed)
  const baseUrl = OpenAPI.servers[0].url;

  // Generate Python snippet
  const pythonSnippet = `
import requests

url = "${baseUrl}${patchEndpointParams((name) => `{${name}}`)}"
headers = ${stringifyObject(combinedHeaders)}${Object.keys(query || {}).length > 0 ? `\nparams = ${stringifyObject(query)}` : ""}${Object.keys(body || {}).length > 0 ? `\ndata = ${stringifyObject(body)}` : ""}

response = requests.request("${method.toUpperCase()}", url, headers=headers${Object.keys(query || {}).length > 0 ? ", params=params" : ""}${Object.keys(body || {}).length > 0 ? ", json=data" : ""})
print(response.text)
`.trim();

  const rubySnippet = `
require 'net/http'
require 'json'

uri = URI("${baseUrl}${patchEndpointParams((name) => `#{${name}}`)}")
uri.query = URI.encode_www_form(${stringifyObject(query || {})}) unless ${stringifyObject(query || {})}.empty?

request = Net::HTTP::${method.charAt(0).toUpperCase() + method.slice(1).toLowerCase()}.new(uri)
${Object.keys(combinedHeaders)
  .map((key) => `request["${key}"] = "${combinedHeaders[key]}"`)
  .join(
    "\n",
  )}${["POST", "PUT", "PATCH"].includes(method.toUpperCase()) ? `\nrequest.body = ${stringifyObject(body || {})}` : ""}

response = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == "https") do |http|
  http.request(request)
end

puts response.body
`.trim();

  // Generate JavaScript snippet
  const jsSnippet = `
const url = new URL(\`${baseUrl}${patchEndpointParams((name) => `\${${name}}`)}\`);
${
  Object.keys(query || {}).length > 0
    ? `const params = ${stringifyObject(query || {})};
Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
`
    : ""
}const options = {
  method: "${method.toUpperCase()}",
  headers: ${stringifyObject(combinedHeaders, 2).trim()},${
    method.toUpperCase() === "GET" || method.toUpperCase() === "HEAD"
      ? ""
      : `
  body: JSON.stringify(${stringifyObject(body || {}, 2).trim()}),`
  }
};

fetch(url.toString(), options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
`.trim();
  // Generate Curl snippet
  const queryString =
    Object.keys(query || {}).length > 0
      ? "?" +
        Object.entries(query || {})
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
          .join("&")
      : "";
  const curlBody =
    method.toUpperCase() === "GET" || method.toUpperCase() === "HEAD"
      ? ""
      : ` \\\n  -d '${stringifyObject(body || {}, 2).trim()}'`;
  const additionalCurlHeaders = Object.entries(combinedHeaders)
    .map(([k, v]) => `-H "${k}: ${v}"`)
    .join(" ");
  const curlSnippet = `
curl ${method !== "get" ? "-X " + method.toUpperCase() + " " : ""}\\
  "${baseUrl}${patchEndpointParams((name) => `\${${name}}`)}${queryString}" \\
  ${additionalCurlHeaders}${curlBody}
`.trim();

  return {
    python: pythonSnippet,
    ruby: rubySnippet,
    javascript: jsSnippet,
    curl: curlSnippet,
  };
}
