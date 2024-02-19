import classNames from "../../lib/classNames";
import OpenAPIFixtures from "../../lib/openapi/fixtures.json";
import { extractBackingFixtureFromRef } from "../../lib/openapi/utils";
import { Code, H3 } from "../Markdown";
import Table from "../Table";

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
  const fixtureInformation = extractBackingFixtureFromRef(ref);
  if (fixtureInformation.type === "Page") {
    const pageRef = OpenAPIFixtures[fixtureInformation.value][0].object;
    return {
      results: [pageRef],
      count: 1,
    };
  } else if (fixtureInformation.type === "ErrorMessage") {
    return OpenAPIFixtures["ErrorMessage"][0].object;
  } else {
    return OpenAPIFixtures[fixtureInformation.value][0].object;
  }
};

function SampleResponse(fixtureName: string) {
  const relevantText = fixtureForRef(fixtureName);
  return <Code language="json">{JSON.stringify(relevantText, null, 4)}</Code>;
}

type Response = {
  Status: string;
  description: string;
  fixture: string | undefined;
};

type Props = {
  content: Array<Response>;
};

const SampleResponseCode = (c: Response) => {
  return c.fixture ? (
    SampleResponse(c.fixture)
  ) : (
    <Code language="json">{"{}"}</Code>
  );
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
          {
            title: "Sample Response",
            component: SampleResponseCode,
          },
        ]}
        content={content}
      />
    </>
  );
}
