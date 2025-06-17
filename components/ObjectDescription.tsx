import SEARCH from "../autogen/index.json";
import Code from "../components/code";
import type OpenAPIEnums from "../lib/openapi/enums.json";
import OpenAPIFixtures from "../lib/openapi/fixtures.json";
import type {
  Method,
  Object as OpenAPIObject,
  Operation,
  RequestBody,
  Route,
} from "../lib/openapi/types";
import OpenAPI from "../public/openapi.json";
import Markdown from "./Markdown";
import Parameter, { type TypeProp } from "./Parameter";

export type OpenAPIProperty = {
  title: string;
  type: string;
  description?: string;
  format?: string;
  items?: {
    type: string;
    format: string;
  };
};

export const urlForSchema = (fullyQualifiedSchema: string) => {
  if (!fullyQualifiedSchema) return undefined;
  const schema = fullyQualifiedSchema.split("/").pop();
  return SEARCH.find((s) => s.title === schema || s.schema === schema);
};

export default function ObjectDescription({ name }: { name: OpenAPIObject }) {
  const schema = OpenAPI.components.schemas[name];

  const fixtures = OpenAPIFixtures[name];

  if (!fixtures) {
    throw new Error(
      `No fixtures found for ${name}. Did you forget to add them to \`app/assets/autogen/fixtures.json\`?`
    );
  }

  return (
    <div className="space-y-8">
      <Markdown>{schema.description}</Markdown>

      {/* Fixtures */}
      <div className="not-prose">
        <Code
          blocks={fixtures.map((fixture) => ({
            name: fixture.description,
            code: JSON.stringify(fixture.object, null, 4),
            language: "json",
          }))}
        />
      </div>

      <h2>Fields</h2>
      {Object.entries(schema.properties).map(([property, _info]) => {
        const info = _info as OpenAPIProperty;
        const name = property;
        const description = info.description;

        let $ref: string | null = null;
        if ("$ref" in info) {
          $ref = info.$ref as string;
        } else if ("allOf" in info) {
          $ref = (info.allOf as { $ref: string }[])[0].$ref;
        } else if ("anyOf" in info) {
          $ref = (info.anyOf as { $ref: string }[])[0].$ref;
        }

        const type: TypeProp = $ref
          ? {
              type: "ref",
              url: urlForSchema($ref)?.url || "",
              name: urlForSchema($ref)?.schema || "",
            }
          : {
              type: "string",
              value: info.type,
            };

        return (
          <Parameter
            key={name}
            name={name}
            description={description}
            type={type}
          />
        );
      })}
    </div>
  );
}

const extractRef = <R extends Route>(
  operation: Operation<R, Method<R>>
): string | undefined => {
  const body = operation.requestBody;
  if (body === undefined) {
    return undefined;
  }
  if ("application/json" in body.content) {
    return body.content["application/json"].schema.$ref;
  }
  if ("multipart/form-data" in body.content) {
    return body.content["multipart/form-data"].schema.$ref;
  }
  return undefined;
};

const extractRefFromType = (
  type: string
): keyof typeof OpenAPI.components.schemas | null => {
  // If #/components/schemas/ is present, extract the name of the schema
  const match = type.match(/#\/components\/schemas\/(.*)/);
  if (match) {
    const ref = match[1];
    return ref as keyof typeof OpenAPI.components.schemas;
  }
  return null;
};

export const extractSchemaFromContent = (
  content: RequestBody["content"]
): keyof typeof OpenAPI.components.schemas | undefined => {
  if (content) {
    if ("application/json" in content) {
      const schema = content["application/json"].schema;
      if (schema) {
        const potentialRef = schema.$ref.split("/").pop();
        if (potentialRef) {
          return potentialRef as keyof typeof OpenAPI.components.schemas;
        }
      }
    }
  }
};

const extractBackingFixtureFromRef = (ref: string): BackingFixture => {
  // Pages are wrapped like so: "$FOOPage".
  // We want to extract 'FOO'.
  if (ref.endsWith("Page")) {
    const pageName = ref.slice(0, -4);
    return {
      type: "Page",
      value: pageName as keyof typeof OpenAPIFixtures,
    };
  }

  // Error messages are wrapped like so: "ErrorMessage_FOO_".
  // We want to extract 'FOO'.
  if (ref.startsWith("ErrorMessage_")) {
    const errorMessageName = ref.split("_")[1];
    return {
      type: "ErrorMessage",
      value: errorMessageName as keyof typeof OpenAPIEnums,
    };
  }

  return {
    type: "Object",
    value: ref as keyof typeof OpenAPIFixtures,
  };
};

export const fixtureForRef = (ref: string) => {
  const fixtureInformation = extractBackingFixtureFromRef(ref);
  if (fixtureInformation.type === "Page") {
    if (!OpenAPIFixtures[fixtureInformation.value]) {
      throw new Error(
        `No fixtures found for ${fixtureInformation.value}. Did you forget to add them to \`app/assets/autogen/fixtures.json\`?`
      );
    }

    const pageRef = OpenAPIFixtures[fixtureInformation.value][0].object;
    return {
      results: [pageRef],
      count: 1,
    };
  }
  if (fixtureInformation.type === "ErrorMessage") {
    return OpenAPIFixtures.ErrorMessage[0].object;
  }
  return OpenAPIFixtures[fixtureInformation.value][0].object;
};

type ParameterType = {
  parameter: string;
  type: TypeProp;
  description: string;
  optional: boolean;
  values?: string[];
  example?: string | string[] | object;
};

type BackingFixture =
  | {
      type: "ErrorMessage";
      value: keyof typeof OpenAPIEnums;
    }
  | {
      type: "Page";
      value: keyof typeof OpenAPIFixtures;
    }
  | {
      type: "Object";
      value: keyof typeof OpenAPIFixtures;
    };

export const extractParameters = <R extends Route>(
  operation: Operation<R, Method<R>>
): ParameterType[] => {
  const queryParameters = operation.parameters
    .filter((parameter) => parameter.in !== "path")
    .filter((parameter) => parameter.in !== "header")
    .map((parameter) => {
      const type =
        "type" in parameter.schema && "items" in parameter.schema
          ? parameter.schema.items?.$ref
            ? extractRefFromType(parameter.schema.items.$ref)
            : parameter.schema.type
          : "$ref" in parameter.schema
          ? extractRefFromType(parameter.schema.$ref)
          : null;

      const typeProp: TypeProp =
        "type" in parameter.schema &&
        "items" in parameter.schema &&
        parameter.schema.items?.$ref
          ? {
              type: "ref[]",
              url: urlForSchema(parameter.schema.items.$ref)?.url || "",
              name: urlForSchema(parameter.schema.items.$ref)?.schema || "",
            }
          : {
              type: "string",
              value: type || "string",
            };

      return {
        parameter: parameter.name,
        type: typeProp,
        description: parameter.description || "",
        // @ts-ignore
        values: parameter.schema.allOf?.[0]?.enum || [],
        optional: !parameter.required,
      };
    });
  const parameters = extractRef(operation);
  const ref = parameters !== undefined ? extractRefFromType(parameters) : null;
  return [...parametersForRef(ref), ...queryParameters];
};

const parametersForRef = (
  ref: keyof (typeof OpenAPI)["components"]["schemas"] | null
): ParameterType[] => {
  const schema = ref !== null ? OpenAPI.components.schemas[ref] : null;
  if (schema === null) {
    return [];
  }
  if ("properties" in schema) {
    return [
      ...Object.keys(schema.properties).map((parameter) => {
        // biome-ignore lint/suspicious/noExplicitAny: this file is screwed.
        const qualifiedParameter = (schema.properties as any)[parameter] as
          | {
              type: "array";
              items: {
                $ref: string;
              };
              description: undefined;
              example?: string[];
            }
          | {
              type: "string";
              description: string;
              $ref: undefined;
              example?: string;
            }
          | {
              $ref: string;
              description: undefined;
              type: undefined;
            }
          | {
              default: "string";
              allOf: [{ $ref: string }];
              description: undefined;
              type: undefined;
              example?: object;
              $ref: undefined;
            }
          | {
              anyOf: [{ $ref: string }];
              description: undefined;
              type: undefined;
              example?: object;
              $ref: undefined;
            };

        const type: TypeProp = qualifiedParameter.type
          ? qualifiedParameter.type === "array" &&
            "$ref" in qualifiedParameter.items
            ? {
                type: "ref[]",
                url: urlForSchema(qualifiedParameter.items.$ref)?.url || "",
                name: urlForSchema(qualifiedParameter.items.$ref)?.schema || "",
              }
            : {
                type: "string",
                value: qualifiedParameter.type,
              }
          : "allOf" in qualifiedParameter
          ? {
              type: "ref",
              url: urlForSchema(qualifiedParameter.allOf[0].$ref)?.url || "",
              name:
                urlForSchema(qualifiedParameter.allOf[0].$ref)?.schema || "",
            }
          : "anyOf" in qualifiedParameter
          ? {
              type: "ref",
              url: urlForSchema(qualifiedParameter.anyOf[0].$ref)?.url || "",
              name:
                urlForSchema(qualifiedParameter.anyOf[0].$ref)?.schema || "",
            }
          : {
              type: "ref",
              url: urlForSchema(qualifiedParameter.$ref as string)?.url || "",
              name:
                urlForSchema(qualifiedParameter.$ref as string)?.schema || "",
            };

        return {
          parameter,
          type,
          description: qualifiedParameter.description || "",
          optional:
            "required" in schema
              ? !(schema.required as string[]).includes(parameter)
              : true,
          example:
            "example" in qualifiedParameter
              ? qualifiedParameter.example
              : undefined,
        };
      }),
    ];
  }
  return [];
};
