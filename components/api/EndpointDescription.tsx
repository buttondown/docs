import Endpoint from "./Endpoint";
import ParametersTable from "./ParametersTable";
import PathTable from "./PathTable";
import OpenAPI from "../../lib/openapi.json";
import { extractRefFromType } from "../../lib/openapi-utils";

type Path = keyof typeof OpenAPI.paths;
type Operation = {
  summary: string;
  parameters: any[];
  responses: any;
  requestBody?: {
    content: {
      "application/json": {
        schema: {
          $ref: string;
        };
      };
    };
  };
};

export default function EndpointDescription({ path }: { path: Path }) {
  const informationForPath = OpenAPI.paths[path];
  const methods = Object.keys(
    informationForPath
  ) as (keyof typeof informationForPath)[];

  return (
    <>
      {methods.map((method) => {
        const operation = informationForPath[method] as Operation;
        const parameters =
          operation.requestBody?.content["application/json"].schema.$ref;

        const ref =
          parameters !== undefined ? extractRefFromType(parameters) : null;
        const schema = ref !== null ? OpenAPI.components.schemas[ref] : null;
        return (
          <div key={method}>
            <Endpoint title={operation.summary} method={method} path={path} />
            {parameters && schema && "properties" in schema && (
              <ParametersTable
                content={Object.keys(schema.properties).map(
                  (parameter: any) => {
                    const qualifiedParameter = (schema.properties as any)[
                      parameter
                    ] as {
                      type: string;
                      description: string;
                    };
                    return {
                      parameter,
                      type: qualifiedParameter.type,
                      description: qualifiedParameter.description,
                    };
                  }
                )}
              />
            )}
            <PathTable content={operation.responses} />
          </div>
        );
      })}
    </>
  );
}
