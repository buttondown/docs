import Endpoint from "./Endpoint";
import ParametersTable from "./ParametersTable";
import PathTable from "./PathTable";
import OpenAPI from "../../lib/openapi.json";
import { extractRefFromType } from "../../lib/openapi-utils";

export default function EndpointDescription({ path }: { path: string }) {
  const methods = Object.keys(OpenAPI.paths[path]);
  return methods.map((method) => {
    const operation = OpenAPI.paths[path][method];
    const parameters =
      operation.requestBody?.content["application/json"].schema.$ref;
    const schema =
      parameters !== undefined
        ? OpenAPI.components.schemas[extractRefFromType(parameters)]
        : null;
    return (
      <div key={method}>
        <Endpoint title={operation.summary} method={method} path={path} />
        {parameters && (
          <ParametersTable
            content={Object.keys(schema.properties).map((parameter) => {
              return {
                parameter,
                type: schema.properties[parameter].type,
                description: schema.properties[parameter].description,
              };
            })}
          />
        )}
        <PathTable content={operation.responses} />
      </div>
    );
  });
}
