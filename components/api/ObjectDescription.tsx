import { Code, H4, P } from "../Markdown";
import Table from "../Table";
import { extractRefFromType } from "../../lib/openapi/utils";
import EnumTable from "./openapi/EnumTable";
import OpenAPI from "../../lib/openapi/openapi.json";
import OpenAPIEnums from "../../lib/openapi/enums.json";
import OpenAPIFixtures from "../../lib/openapi/fixtures.json";
import EndpointDescription from "./EndpointDescription";
import {
  Enum,
  Object as OpenAPIObject,
  Route,
  ObjectDescription as OpenAPIObjectDescription,
  Fixture,
} from "../../lib/openapi/types";
import MonospacedSpan from "../MonospacedSpan";

type Props = {
  name: OpenAPIObject;
  enums: Array<Enum>;
  endpoints: Array<Route>;
};

type Field = {
  field: string;
  type: string;
  description: string;
};

const getFixtures = (name: keyof typeof OpenAPIFixtures): Fixture[] => {
  const fixture = OpenAPIFixtures[name];
  return fixture;
};

export default function ObjectDescription({ name, enums, endpoints }: Props) {
  const schema = OpenAPI.components.schemas[name] as OpenAPIObjectDescription;
  // @ts-ignore
  const fields = Object.entries(schema.properties).map(([key, property]) => {
    return {
      field: key,
      // @ts-ignore
      type: property.type || property["$ref"],
      // @ts-ignore
      description: property.description,
    };
  });

  const fixtures = getFixtures(name);

  return (
    <div className="space-y-32">
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
      </div>

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

      {enums.map((e) => {
        return (
          <div key={e}>
            <a id={e} />
            <H4>
              {OpenAPI.components.schemas[e].title} ({MonospacedSpan(e)})
            </H4>
            <p>{OpenAPI.components.schemas[e].description}</p>
            <br />
            <EnumTable enum={e} />
          </div>
        );
      })}

      {endpoints.map((e) => {
        return (
          <div key={e} className="space-y-32">
            <EndpointDescription path={e} />
          </div>
        );
      })}
    </div>
  );
}
