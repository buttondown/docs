import OpenAPIFixtures from "../../lib/openapi/fixtures.json";
import OpenAPI from "../../lib/openapi/openapi.json";
import {
  Enum,
  Fixture,
  Object as OpenAPIObject,
  ObjectDescription as OpenAPIObjectDescription,
  Route,
} from "../../lib/openapi/types";
import { extractRefFromType } from "../../lib/openapi/utils";
import { Code, H1, H4 } from "../Markdown";
import MarkdownString from "../MarkdownString";
import MonospacedSpan from "../MonospacedSpan";
import Table from "../Table";
import TableOfContents from "../TableOfContents";
import EndpointDescription from "./EndpointDescription";
import EnumTable from "./openapi/EnumTable";

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
    <>
      <div className="relative">
        <div className="space-y-32">
          <div>
            <H1>{schema.title}</H1>
            <MarkdownString text={schema.description} />
            {fixtures.length > 0 &&
              fixtures.map((fixture) => {
                return (
                  <div key={fixture.description}>
                    <H4>{fixture.description}</H4>
                    <Code language="json">
                      {JSON.stringify(fixture.object, null, 4)}
                    </Code>
                  </div>
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
      </div>
      <TableOfContents
        anchors={[
          { text: "The object", depth: 0, url: "#" },
          enums.length > 0 ? { text: "Enums", depth: 0 } : null,
          ...enums.map((e) => {
            return {
              text: e,
              depth: 1,
              url: `#${e}`,
            };
          }),
          endpoints.length > 0 ? { text: "Endpoints", depth: 0 } : null,
          ...endpoints.map((e) => {
            return {
              text: e,
              depth: 1,
              url: `#${e}`,
            };
          }),
        ]
          .filter((s) => s !== null)
          .map((s) => s as { text: string; depth: number; url?: string })}
      />
    </>
  );
}
