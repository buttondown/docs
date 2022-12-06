import { Code, H4 } from "../Markdown";
import Table from "../Table";
import { extractRefFromType } from "../../lib/openapi-utils";
import EnumTable from "./EnumTable";
import OpenAPI from "../../lib/openapi.json";
import OpenAPIEnums from "../../lib/enums";
import EndpointDescription from "./EndpointDescription";

function MonospacedSpan(s: string) {
  return <span className="font-mono">{s}</span>;
}

type Field = {
  field: string;
  type: string;
  description: string;
};

type Props = {
  example: string;
  fields: Array<Field>;
  enums: Array<string>;
  endpoints: Array<string>;
};

export default function ObjectDescription({
  example,
  fields,
  enums,
  endpoints,
}: Props) {
  return (
    <div>
      <Code language="json">{example}</Code>

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
              <a name={e} />
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
