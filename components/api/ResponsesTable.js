import Table from "../Table";
import { Code, H3 } from "../Markdown";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ResponseCodeBadge(text) {
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

function SampleResponse(text) {
  return <Code>{JSON.stringify(text, null, 4)}</Code>;
}

export default function ResponsesTable({ content }) {
  return (
    <>
      <H3>Responses</H3>
      <Table
        columns={[
          {
            title: "Status",
            component: ResponseCodeBadge,
          },
          { title: "Description" },
          { title: "Sample Response", component: SampleResponse },
        ]}
        content={content}
      />
    </>
  );
}
