import classNames from "../../lib/classNames";
import { Code, H3 } from "../Markdown";
import Table, { Row } from "../Table";

function ResponseCodeBadge(text: string) {
  return (
    <span
      className={classNames(
        text.includes("4")
          ? "bg-red-100 text-red-800"
          : text.includes("2")
          ? "bg-green-100 text-green-800"
          : "bg-gray-100 text-gray-800",
        "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
      )}
    >
      {text}
    </span>
  );
}

function SampleResponse(text: any) {
  return <Code language="json">{JSON.stringify(text, null, 4)}</Code>;
}

type Props = {
  content: Array<Row>;
};

export default function ResponsesTable({ content }: Props) {
  return (
    <>
      <H3>Responses</H3>
      <Table
        columns={[
          {
            title: "Status",
            component: ResponseCodeBadge,
          },
          { title: "Description", key: "description" },
          { title: "Sample Response", component: SampleResponse },
        ]}
        content={content}
      />
    </>
  );
}
