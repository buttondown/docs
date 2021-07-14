import { CheckCircleIcon } from "@heroicons/react/outline";

import { H3 } from "../Markdown";
import Table from "../Table";

function MonospacedSpan(s) {
  return <span className="font-mono">{s}</span>;
}

function CheckMark(s) {
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

export default function ParametersTable({ content }) {
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
