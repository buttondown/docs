import OpenAPI from "../../lib/openapi/openapi.json";
import { RequestBody } from "../../lib/openapi/types";
import { extractBackingFixtureFromRef } from "../../lib/openapi/utils";
import { H3 } from "../Markdown";
import EnumTable from "./openapi/EnumTable";
import ResponsesTable from "./ResponsesTable";

const extractSchemaFromContent = (
  content: RequestBody["content"]
): keyof typeof OpenAPI.components.schemas | undefined => {
  if (content) {
    if ("application/json" in content) {
      const schema = content["application/json"].schema;
      if (schema) {
        const potentialRef = schema["$ref"].split("/").pop();
        if (potentialRef) {
          return potentialRef as keyof typeof OpenAPI.components.schemas;
        }
      }
    }
  }
};

export default function PathTable({ content }: any) {
  const responses = Object.keys(content).map((key) => ({
    Status: key,
    description: content[key].description,
    fixture: extractSchemaFromContent(content[key].content),
  }));

  const responseErrors = responses
    .map((response) =>
      response.fixture !== undefined
        ? extractBackingFixtureFromRef(response.fixture)
        : undefined
    )
    .map((fixture) => {
      if (fixture === undefined) {
        return undefined;
      }
      if (fixture.type === "ErrorMessage") {
        return fixture.value;
      }
      return undefined;
    });

  const responseError = responseErrors.find((error) => error !== undefined);

  if (responseError) {
    return (
      <>
        <ResponsesTable content={responses} />
        <H3>Error codes</H3>
        <span>
          <EnumTable enum={responseError} />
        </span>
      </>
    );
  }
  return <ResponsesTable content={responses} />;
}
