import { Code } from "../Markdown";
import Table, { Row } from "../Table";

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
            component: (c: Field) => MonospacedSpan(c.type),
          },
          { title: "description" },
        ]}
        content={fields}
      />
    </div>
  );
}
