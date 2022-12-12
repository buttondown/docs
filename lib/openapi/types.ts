import OpenAPI from "./openapi.json";
import OpenAPIEnums from "./enums.json";
import OpenAPIFixtures from "./fixtures.json";

type KeysOfType<T, V> = keyof {
  [P in keyof T as V extends keyof T[P] ? P : never]: any;
};

export type Route = keyof typeof OpenAPI.paths;
export type Method<R extends Route> = keyof typeof OpenAPI.paths[R] & string;
export type Operation<
  R extends Route,
  M extends Method<R>
> = typeof OpenAPI.paths[R][M];
export type Enum = keyof typeof OpenAPI.components.schemas &
  keyof typeof OpenAPIEnums;
export type Object = KeysOfType<
  typeof OpenAPI.components.schemas,
  "properties"
> &
  KeysOfType<typeof OpenAPI.components.schemas, "description">;
