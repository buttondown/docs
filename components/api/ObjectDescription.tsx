import { Code, H4, P } from "../Markdown";
import Table from "../Table";
import { extractRefFromType } from "../../lib/openapi-utils";
import EnumTable from "./EnumTable";
import OpenAPI from "../../lib/openapi.json";
import OpenAPIEnums from "../../lib/enums.json";
import OpenAPIFixtures from "../../lib/fixtures.json";
import EndpointDescription from "./EndpointDescription";

function MonospacedSpan(s: string | JSX.Element) {
  return <span className="font-mono">{s}</span>;
}

type Field = {
  field: string;
  type: string;
  description: string;
};

type KeysOfType<T, V> = keyof {
  [P in keyof T as V extends keyof T[P] ? P : never]: any;
};

type SchemaElementWithProperties = KeysOfType<
  typeof OpenAPI.components.schemas,
  "properties"
> &
  KeysOfType<typeof OpenAPI.components.schemas, "description">;

type Props = {
  name: SchemaElementWithProperties & keyof typeof OpenAPIFixtures;
  fields: Array<Field>;
  enums: Array<
    keyof typeof OpenAPIEnums & keyof typeof OpenAPI.components.schemas
  >;
  endpoints: Array<keyof typeof OpenAPI.paths>;
};

export default function ObjectDescription({ name, enums, endpoints }: Props) {
  const schema = OpenAPI.components.schemas[name];
  const fields = Object.entries(schema.properties).map(([key, property]) => {
    return {
      field: key,
      // @ts-ignore
      type: property.type || property["$ref"],
      // @ts-ignore
      description: property.description,
    };
  });
  const fixtures = OpenAPIFixtures[name];

  return (
    <div>
      <P>{schema.description}</P>
      {fixtures.length > 0 &&
        fixtures.map((fixture) => {
          return (
            <>
              <H4>{fixture.description}</H4>
              <Code language="json">
                {JSON.stringify(fixture.object, null, 4)}
              </Code>
            </>
          );
        })}

      <br />

      <Table
        columns={[
          {
            title: "field",
            component: (c: Field) => MonospacedSpan(c.field),
          },
          {
            title: "type",
            component: (c: Field) =>
              MonospacedSpan(
                extractRefFromType(c.type) ? (
                  <a href={`#${extractRefFromType(c.type)}`}>
                    {extractRefFromType(c.type)}
                  </a>
                ) : (
                  c.type
                )
              ),
          },
          { title: "description" },
        ]}
        content={fields}
      />

      {enums !== undefined &&
        enums.map((e) => {
          return (
            <div key={e}>
              <a id={e} />
              <H4>
                {OpenAPI.components.schemas[e].title} ({MonospacedSpan(e)})
              </H4>
              <p>{OpenAPI.components.schemas[e].description}</p>
              <br />
              <EnumTable e={OpenAPIEnums[e]} />
            </div>
          );
        })}

      {endpoints !== undefined &&
        endpoints.map((e) => {
          return (
            <div key={e}>
              <EndpointDescription path={e} />
            </div>
          );
        })}
    </div>
  );
}
