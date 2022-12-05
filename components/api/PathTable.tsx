import ResponsesTable from "./ResponsesTable";

export default function PathTable({ content }: any) {
  return (
    <ResponsesTable
      content={Object.keys(content).map((key) => ({
        Status: key,
        description: content[key].description,
        "Sample Response": content[key].content["application/json"].schema,
      }))}
    />
  );
}
