import { CheckCircleIcon } from "@heroicons/react/outline";

import { H3 } from "../Markdown";
import Table, { Row } from "../Table";
import remark from "remark";
import remarkHtml from "remark-html";

function MonospacedSpan(s: string) {
  return <span className="font-mono">{s}</span>;
}

function RawHTML(s: string) {
  return <div dangerouslySetInnerHTML={{ __html: s }} />;
}

function CheckMark(s: string) {
  return (
    s && (
      <CheckCircleIcon
        className={
          "text-gray-400 group-hover:text-gray-300 flex-shrink-0 h-6 w-6"
        }
        aria-hidden="true"
      />
    )
  );
}

type Parameter = {
  parameter: string;
  type: string;
  description: string;
};

type Props = {
  content: Array<Parameter>;
};

const renderMarkdown = (markdown: string): string => {
  return remark().use(remarkHtml).processSync(markdown).toString();
};

export default function ParametersTable({ content }: Props) {
  return (
    <>
      <H3>Parameters</H3>
      <Table
        columns={[
          {
            title: "parameter",
            component: (c: Parameter) => MonospacedSpan(c.parameter),
          },
          {
            title: "type",
            component: (c: Parameter) => MonospacedSpan(c.type),
          },
          {
            title: "description",
            component: (c: Parameter) => RawHTML(c.description),
          },
          {
            title: "optional",
            alignment: "right",
            component: CheckMark,
          },
        ]}
        content={content.map((row) => ({
          ...row,
          description: renderMarkdown(row.description),
        }))}
      />
    </>
  );
}
