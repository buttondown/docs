import { Code } from "../Markdown";
import Table, { Row } from "../Table";
import OpenAPIEnum from "../../lib/enums.json";

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
};

const extractRefFromType = (type: string) => {
  // If #/components/schemas/ is present, extract the name of the schema
  const match = type.match(/#\/components\/schemas\/(.*)/);
  if (match) {
    const ref = match[1];
    if (OpenAPIEnum[ref] !== undefined) {
      return ref;
    }
  }
  return null;
};

export default function ObjectDescription({ example, fields }: Props) {
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
    </div>
  );
}
