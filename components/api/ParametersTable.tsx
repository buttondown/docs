import { CheckCircleIcon } from "@heroicons/react/outline";

import { H3 } from "../Markdown";
import Table, { Row } from "../Table";

function MonospacedSpan(s: string) {
  return <span className="font-mono">{s}</span>;
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
          { title: "description" },
          {
            title: "optional",
            alignment: "right",
            component: CheckMark,
          },
        ]}
        content={content}
      />
    </>
  );
}
