import ResponsesTable from "./ResponsesTable";
import { extractBackingFixtureFromRef } from "../../lib/openapi/utils";
import { H3 } from "../Markdown";
import EnumTable from "./openapi/EnumTable";

const extractSchemaFromContent = (content: any): string | undefined => {
  if (content) {
    const schema = content["application/json"].schema;
    if (schema) {
      return schema["$ref"].split("/").pop();
    }
  }
};

export default function PathTable({ content }: any) {
  const responses = Object.keys(content).map((key) => ({
    Status: key,
    description: content[key].description,
    fixture: extractSchemaFromContent(content[key].content),
  }));
  const responseWithDistinctErrorType = responses.find((r) =>
    r.fixture?.startsWith("ErrorMessage_")
  );
  if (responseWithDistinctErrorType) {
    return (
      <>
        <ResponsesTable content={responses} />
        <H3>Error codes</H3>
        <span>
          <EnumTable
            enum={
              extractBackingFixtureFromRef(
                responseWithDistinctErrorType.fixture
              ).value
            }
          />
        </span>
      </>
    );
  }
  return <ResponsesTable content={responses} />;
}
