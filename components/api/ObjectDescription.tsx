import Table from "../Table";
import { Code } from "../Markdown";

function MonospacedSpan(s) {
  return <span className="font-mono">{s}</span>;
}

export default function ObjectDescription({ example, fields }) {
  return (
    <div>
      <Code language="plaintext">{example}</Code>

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
