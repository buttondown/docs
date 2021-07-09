import Table from "../Table";
import { Code } from "../Markdown";

export default function ObjectDescription({ example, fields }) {
  return (
    <div>
      <Code>{example}</Code>

      <br />

      <Table
        columns={[
          {
            title: "field",
            component: (s) => <span className="font-mono">{s}</span>,
          },
          {
            title: "type",
            component: (s) => <span className="font-mono">{s}</span>,
          },
          { title: "description" },
        ]}
        content={fields}
      />
    </div>
  );
}
