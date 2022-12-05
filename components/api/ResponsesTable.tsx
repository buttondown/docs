import classNames from "../../lib/classNames";
import { Code, H3 } from "../Markdown";
import Table, { Row } from "../Table";
import OpenAPIFixtures from "../../lib/fixtures.json";

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

const fixtureForRef = (ref: string) => {
  // Pages are wrapped like so: "Page_FOO_".
  // We want to extract 'FOO'.
  if (ref.startsWith("Page_")) {
    const pageName = ref.split("_")[1];
    const pageRef = OpenAPIFixtures[pageName];
    return {
      results: [pageRef],
      count: 1,
    };
  }
  return OpenAPIFixtures[ref] || ref;
};

function SampleResponse(text: any) {
  const relevantText = text["Sample Response"]["$ref"]
    ? fixtureForRef(text["Sample Response"]["$ref"].split("/").pop())
    : text["Sample Response"];
  return <Code language="json">{JSON.stringify(relevantText, null, 4)}</Code>;
}

type Response = {
  Status: string;
  description: string;
  "Sample Response": string;
};

type Props = {
  content: Array<Response>;
};

export default function ResponsesTable({ content }: Props) {
  return (
    <>
      <H3>Responses</H3>
      <Table
        columns={[
          {
            title: "Status",
            component: (c: Response) => ResponseCodeBadge(c.Status),
          },
          { title: "Description", key: "description" },
          { title: "Sample Response", component: SampleResponse },
        ]}
        content={content}
      />
    </>
  );
}
