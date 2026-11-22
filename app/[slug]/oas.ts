import {
  createOas,
  type OpenAPISchema,
  type SnippetDefinition,
} from "@/lib/openapi/snippets";
import OpenAPI from "@/public/openapi.json";

export type { SnippetDefinition };

export const { plainOas, generateSnippets, generateSnippetsWithSpecifiedBody } =
  createOas(OpenAPI as unknown as OpenAPISchema);
