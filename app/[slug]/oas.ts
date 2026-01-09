import OpenAPI from "@/public/openapi.json";

// Types for OpenAPI 3.0 schema
type OpenAPISchema = typeof OpenAPI;
type HttpMethod = "get" | "post" | "put" | "patch" | "delete" | "head" | "options";

interface Parameter {
	in: "path" | "query" | "header" | "cookie";
	name: string;
	required?: boolean;
	schema?: SchemaObject;
}

interface SchemaObject {
	type?: string;
	format?: string;
	properties?: Record<string, SchemaObject>;
	required?: string[];
	$ref?: string;
	example?: unknown;
	in?: string;
}

interface MediaTypeObject {
	schema?: SchemaObject;
}

interface RequestBodyObject {
	content?: Record<string, MediaTypeObject>;
	required?: boolean;
}

interface OperationObject {
	parameters?: Parameter[];
	requestBody?: RequestBodyObject;
}

// Recursively dereference all $ref in the schema
function dereferenceSchema(schema: OpenAPISchema): OpenAPISchema {
	const seen = new WeakSet();

	function resolveRef(ref: string): SchemaObject | undefined {
		// Handle refs like "#/components/schemas/Foo"
		const parts = ref.replace(/^#\//, "").split("/");
		// biome-ignore lint/suspicious/noExplicitAny: navigating dynamic schema structure
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let current: any = schema;
		for (const part of parts) {
			if (current && typeof current === "object" && part in current) {
				current = current[part];
			} else {
				return undefined;
			}
		}
		return current as SchemaObject;
	}

	// biome-ignore lint/suspicious/noExplicitAny: deep cloning arbitrary objects
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function deref(obj: any): any {
		if (obj === null || typeof obj !== "object") {
			return obj;
		}

		if (seen.has(obj)) {
			return obj; // Handle circular refs by returning as-is
		}

		if (Array.isArray(obj)) {
			return obj.map(deref);
		}

		seen.add(obj);

		// If this object has a $ref, resolve it
		if ("$ref" in obj && typeof obj.$ref === "string") {
			const resolved = resolveRef(obj.$ref);
			if (resolved) {
				return deref(resolved);
			}
			return obj;
		}

		// Otherwise, recursively dereference all properties
		// biome-ignore lint/suspicious/noExplicitAny: building new object dynamically
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const result: any = {};
		for (const key of Object.keys(obj)) {
			result[key] = deref(obj[key]);
		}
		return result;
	}

	return deref(structuredClone(schema));
}

// Operation wrapper class
class Operation {
	private op: OperationObject;
	private path: string;
	private method: HttpMethod;

	constructor(op: OperationObject, path: string, method: HttpMethod) {
		this.op = op;
		this.path = path;
		this.method = method;
	}

	hasRequestBody(): boolean {
		return !!this.op.requestBody;
	}

	hasRequiredRequestBody(): boolean {
		return !!this.op.requestBody?.required;
	}

	getRequestBodyMediaTypes(): string[] {
		if (!this.op.requestBody?.content) {
			return [];
		}
		return Object.keys(this.op.requestBody.content);
	}

	getRequestBody(mediaType?: string): MediaTypeObject | undefined {
		if (!this.op.requestBody?.content) {
			return undefined;
		}
		if (mediaType) {
			return this.op.requestBody.content[mediaType];
		}
		const types = this.getRequestBodyMediaTypes();
		return types.length > 0 ? this.op.requestBody.content[types[0]] : undefined;
	}

	getParameters(): Parameter[] {
		return this.op.parameters || [];
	}
}

// OAS wrapper class
class OasWrapper {
	private schema: OpenAPISchema;

	constructor(schema: OpenAPISchema) {
		this.schema = schema;
	}

	operation(path: string, method: HttpMethod): Operation {
		const pathObj = this.schema.paths[path as keyof typeof this.schema.paths];
		if (!pathObj) {
			throw new Error(`Path not found: ${path}`);
		}
		const methodObj = pathObj[method as keyof typeof pathObj];
		if (!methodObj) {
			throw new Error(`Method ${method} not found for path ${path}`);
		}
		return new Operation(methodObj as OperationObject, path, method);
	}
}

// Create OAS instances
export const plainOas = new OasWrapper(structuredClone(OpenAPI));

async function getOas() {
	const dereferencedSchema = dereferenceSchema(OpenAPI);
	const circularOas = new OasWrapper(dereferencedSchema);
	return { circularOas };
}

const IMAGE_EXAMPLE = "https://placehold.co/600x400";

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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		method.toLowerCase() as any,
	);

	// biome-ignore lint/suspicious/noExplicitAny: we are generating a best-attempt request body
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let body: { [key: string]: any } | undefined;
	if (circularOp.hasRequiredRequestBody() && circularOp.hasRequestBody()) {
		const mediaTypes = circularOp.getRequestBodyMediaTypes();
		const mediaType = mediaTypes.length > 0 ? mediaTypes[0] : undefined;
		const media = circularOp.getRequestBody(mediaType);
		if (media && "schema" in media && media.schema) {
			if ("properties" in media.schema && media.schema.properties) {
				body = {};
				for (const key in media.schema.properties) {
					const spec = media.schema.properties[key];
					if ("in" in spec && spec.in && spec.in === "query") continue;
					if (
						typeof spec === "object" &&
						spec !== null &&
						"type" in spec &&
						spec.type === "string" &&
						spec.format === "binary"
					) {
						body[key] = IMAGE_EXAMPLE;
					} else if ("example" in spec && spec.example) {
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		method.toLowerCase() as any,
	);

	const bodyMediaTypes = plainOp.getRequestBodyMediaTypes();
	const bodyMediaType =
		bodyMediaTypes.length > 0 ? bodyMediaTypes[0] : undefined;
	const isFormData = bodyMediaType === "multipart/form-data";

	const combinedHeaders: { [key: string]: string } = {
		Authorization: "Token $BUTTONDOWN_API_KEY",
		...headers,
	};

	// Helper to stringify objects nicely
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
headers = ${stringifyObject(combinedHeaders)}${
		Object.keys(query || {}).length > 0
			? `\nparams = ${stringifyObject(query)}`
			: ""
	}${
		isFormData
			? `\nfiles = {${Object.entries(body || {})
					.map(([key, value]) =>
						value === IMAGE_EXAMPLE
							? `\n    "${key}": open("path/to/your/image.jpg", "rb")`
							: `\n    "${key}": ${JSON.stringify(value)}`,
					)
					.join(",")}
}`
			: Object.keys(body || {}).length > 0
				? `\ndata = ${stringifyObject(body)}`
				: ""
	}

response = requests.request("${method.toUpperCase()}", url, headers=headers${
		Object.keys(query || {}).length > 0 ? ", params=params" : ""
	}${
		isFormData
			? ", files=files"
			: Object.keys(body || {}).length > 0
				? ", json=data"
				: ""
	})
print(response.text)
`.trim();

	const rubySnippet = `
require 'net/http'
require 'json'

uri = URI("${baseUrl}${patchEndpointParams((name) => `#{${name}}`)}")
uri.query = URI.encode_www_form(${stringifyObject(
		query || {},
	)}) unless ${stringifyObject(query || {})}.empty?

request = Net::HTTP::${
		method.charAt(0).toUpperCase() + method.slice(1).toLowerCase()
	}.new(uri)
${Object.keys(combinedHeaders)
	.map((key) => `request["${key}"] = "${combinedHeaders[key]}"`)
	.join("\n")}${
	isFormData
		? `\n\nform_data = {${Object.entries(body || {})
				.map(([key, value]) =>
					value === IMAGE_EXAMPLE
						? `\n  "${key}" => File.open("path/to/your/image.jpg", "rb")`
						: `\n  "${key}" => ${JSON.stringify(value)}`,
				)
				.join(",")}
}\nrequest.set_form(form_data, 'multipart/form-data')`
		: ["POST", "PUT", "PATCH"].includes(method.toUpperCase())
			? `\nrequest.body = ${stringifyObject(body || {})}`
			: ""
}

response = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == "https") do |http|
  http.request(request)
end

puts response.body
`.trim();

	// Generate JavaScript snippet
	const jsSnippet = `
const url = new URL(\`${baseUrl}${patchEndpointParams(
		(name) => `\${${name}}`,
	)}\`);
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
			: isFormData
				? `
  body: (() => {
    const formData = new FormData();
    ${Object.entries(body || {})
			.map(([key, value]) =>
				value === IMAGE_EXAMPLE
					? `// Assuming you're in a browser environment\n    // For Node.js, you'd use the 'fs' module and FormData from 'form-data'\n    formData.append("${key}", document.querySelector('input[type="file"]').files[0]);`
					: `formData.append("${key}", ${
							typeof value === "string" ? `"${value}"` : value
						});`,
			)
			.join("\n    ")}
    return formData;
  })(),`
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
			: isFormData
				? Object.entries(body || {})
						.map(([key, value]) =>
							value === IMAGE_EXAMPLE
								? ` \\\n  -F "${key}=@path/to/your/image.jpg"`
								: ` \\\n  -F "${key}=${value}"`,
						)
						.join("")
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
