import type OpenAPI from "@/public/openapi.json";
import type { Variant } from "../../components/Pill";
import type OpenAPIEnums from "./enums.json";
import type OpenAPIFixtures from "./fixtures.json";

type KeysOfType<T, V> = keyof {
  [P in keyof T as V extends keyof T[P] ? P : never]: unknown;
};

// An OpenAPI spec has many `Routes` (e.g. /v1/subscribers).
// Every route has one or more `Methods` (e.g. GET, POST, PUT, DELETE).
// An `Operation` is a combination of a `Route` and a `Method`, with multiple characteristics:
// - `parameters` (e.g. query parameters, path parameters, etc.)
// - `requestBody` (e.g. the body of a POST request)
// - `responses` (e.g. the response body of a GET request)
// - `security` (e.g. the authentication requirements of a request)
// - `summary` (e.g. a short description of the operation)
// Some of those Operations may return `Objects`, which are top-level objects in the OpenAPI spec.
// Those Objects may have `Enums` as properties.
export type Route = keyof typeof OpenAPI.paths;
export type Method<R extends Route> = keyof (typeof OpenAPI.paths)[R] & string;
export type Content = {
  schema: {
    $ref: string;
  };
};
export type RequestBody = {
  content:
    | {
        "application/json": Content;
      }
    | {
        "multipart/form-data": Content;
      };
};

export type Parameter = {
  in: "path" | "query" | "header";
  name: string;
  schema:
    | {
        title: string;
        type: string;
        description?: string;
      }
    | {
        $ref: string;
      }
    | {
        type: "array";
        items: {
          $ref: string;
        };
      };
  required: boolean;
  description: string;
};
export type Operation<
  R extends Route,
  M extends Method<R>,
> = (typeof OpenAPI.paths)[R][M] & {
  operationId: string;
  summary: string;
  requestBody: RequestBody;
  parameters: Parameter[];
  responses: {
    [key in string]: {
      description: string;
      content: {
        "application/json": Content;
      };
    };
  };
};
export type Enum = keyof typeof OpenAPI.components.schemas &
  keyof typeof OpenAPIEnums;
export type EnumDescription = {
  description: string;
  name: string;
  variant: Variant;
};
export type Object = KeysOfType<
  typeof OpenAPI.components.schemas,
  "properties"
> &
  KeysOfType<typeof OpenAPI.components.schemas, "description"> &
  keyof typeof OpenAPIFixtures;

export type ObjectDescription = Pick<
  (typeof OpenAPI)["components"]["schemas"][Object],
  "description" | "title" | "properties"
>;

export type Fixture = {
  description: string;
  object: Record<string, unknown>;
};
