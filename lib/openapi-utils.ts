import OpenAPI from "./openapi.json";

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
