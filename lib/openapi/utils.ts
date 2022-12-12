import OpenAPI from "./openapi.json";
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

export const extractBackingFixtureFromRef = (
  ref: string
): {
  type?: "Page" | "ErrorMessage";
  value: string;
} => {
  // Pages are wrapped like so: "Page_FOO_".
  // We want to extract 'FOO'.
  if (ref.startsWith("Page_")) {
    const pageName = ref.split("_")[1];
    return {
      type: "Page",
      value: pageName,
    };
  }

  // Error messages are wrapped like so: "ErrorMessage_FOO_".
  // We want to extract 'FOO'.
  if (ref.startsWith("ErrorMessage_")) {
    const errorMessageName = ref.split("_")[1];
    return {
      type: "ErrorMessage",
      value: errorMessageName,
    };
  }

  return {
    value: ref,
  };
};

export const extractOperation = <R extends Route>(
  route: R,
  method: Method<R>
): Operation<R, Method<R>> => {
  return OpenAPI.paths[route][method];
};

export const extractRouteInformation = <R extends Route, M extends Method<R>>(
  route: R,
  method: M
) => {
  const operation = extractOperation(route, method);
  return operation.summary;
};
