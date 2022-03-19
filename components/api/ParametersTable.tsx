import { CheckCircleIcon } from "@heroicons/react/outline";

import { H3 } from "../Markdown";
import Table, { Row } from "../Table";
import remark from "remark";
import remarkHtml from 'remark-html'


function MonospacedSpan(s: string) {
  return <span className="font-mono">{s}</span>;
}

function RawHTML(s: string) {
  return <div dangerouslySetInnerHTML={{__html: s}} />;
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

type Props = {
  content: Array<Row>;
}

const renderMarkdown = (markdown: string): string => {
    return remark().use(remarkHtml).processSync(markdown).toString();
}

export default function ParametersTable({ content }: Props) {
  return (
    <>
      <H3>Parameters</H3>
      <Table
        columns={[
          {
            title: "parameter",
            component: MonospacedSpan,
          },
          {
            title: "type",
            component: MonospacedSpan,
          },
          { title: "description", component: RawHTML },
          {
            title: "optional",
            alignment: "right",
            component: CheckMark,
          },
        ]}
        content={content.map((row) => ({ ...row, description: renderMarkdown(row.description) }))}
      />
    </>
  );
}
