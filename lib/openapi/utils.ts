import OpenAPI from "./openapi.json";
import OpenAPIEnums from "./enums.json";
import OpenAPIFixtures from "./fixtures.json";
import { Method, Operation, Route } from "./types";

export const extractRefFromType = (
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

export const extractBackingFixtureFromRef = (ref: string): BackingFixture => {
  // Pages are wrapped like so: "Page_FOO_".
  // We want to extract 'FOO'.
  if (ref.startsWith("Page_")) {
    const pageName = ref.split("_")[1];
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

export const extractOperation = <R extends Route>(
  route: R,
  method: Method<R>
): Operation<R, Method<R>> => {
  return OpenAPI.paths[route][method] as Operation<R, Method<R>>;
};

export const extractRouteInformation = <R extends Route, M extends Method<R>>(
  route: R,
  method: M
) => {
  const operation = extractOperation(route, method);
  return operation.summary;
};
