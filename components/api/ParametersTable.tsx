import { CheckCircleIcon } from "@heroicons/react/outline";

import { H3 } from "../Markdown";
import Table, { Row } from "../Table";
import MonospacedSpan from "../MonospacedSpan";
import MarkdownString from "../MarkdownString";

function CheckMark(s: boolean) {
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

export type Parameter = {
  parameter: string;
  type: string;
  description: string;
  optional: boolean;
};

type Props = {
  content: Array<Parameter>;
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
            component: (c: Parameter) =>
              MarkdownString({ text: c.description }),
          },
          {
            title: "optional",
            alignment: "right",
            component: (c: Parameter) => CheckMark(c.optional),
          },
        ]}
        content={content.map((row) => ({
          ...row,
        }))}
      />
    </>
  );
}
