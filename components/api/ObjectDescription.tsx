import { Code } from "../Markdown";
import Table, { Row } from "../Table";

function MonospacedSpan(s: string) {
  return <span className="font-mono">{s}</span>;
}

type Props = {
  example: string;
  fields: Array<Row>;
}

export default function ObjectDescription({ example, fields }: Props) {
  return (
    <div>
      <Code language="json">{example}</Code>

      <br />

      <Table
        columns={[
          {
            title: "field",
            component: MonospacedSpan,
          },
          {
            title: "type",
            component: MonospacedSpan,
          },
          { title: "description" },
        ]}
        content={fields}
      />
    </div>
  );
}
