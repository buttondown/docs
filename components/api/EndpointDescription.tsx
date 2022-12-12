import Endpoint from "./Endpoint";
import ParametersTable from "./ParametersTable";
import PathTable from "./PathTable";
import OpenAPI from "../../lib/openapi/openapi.json";
import { Method, Route, Operation } from "../../lib/openapi/types";
import { extractRefFromType, extractOperation } from "../../lib/openapi/utils";

const extractRef = <R extends Route>(
  operation: Operation<R, Method<R>>
): string | undefined => {
  const body = operation.requestBody;
  if (body === undefined) {
    return undefined;
  }
  if ("application/json" in body.content) {
    return body.content["application/json"].schema.$ref;
  }
  if ("multipart/form-data" in body.content) {
    return body.content["multipart/form-data"].schema.$ref;
  }
  return undefined;
};

export default function EndpointDescription<R extends Route>({
  path,
}: {
  path: R;
}) {
  const informationForPath = OpenAPI.paths[path];
  const methods = Object.keys(informationForPath) as Method<R>[];

  return (
    <>
      {methods.map((method) => {
        const operation = extractOperation(path, method);
        const parameters = extractRef(operation);
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
