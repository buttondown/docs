import OpenAPI from "../../lib/openapi/openapi.json";
import { Method, Operation, Route } from "../../lib/openapi/types";
import { extractOperation, extractRefFromType } from "../../lib/openapi/utils";
import Endpoint from "./Endpoint";
import ParametersTable, { Parameter } from "./ParametersTable";
import PathTable from "./PathTable";

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

const extractParameters = <R extends Route>(
  operation: Operation<R, Method<R>>
): Parameter[] => {
  const queryParameters = operation.parameters
    .filter((parameter) => parameter.in !== "path")
    .map((parameter) => {
      const type =
        "type" in parameter.schema
          ? parameter.schema.type
          : parameter.schema.$ref
          ? extractRefFromType(parameter.schema.$ref)
          : null;
      return {
        parameter: parameter.name,
        type: type || "unknown",
        description: parameter.description,
        optional: !parameter.required,
      };
    });
  const parameters = extractRef(operation);
  const ref = parameters !== undefined ? extractRefFromType(parameters) : null;
  const schema = ref !== null ? OpenAPI.components.schemas[ref] : null;
  if (schema === null) {
    return queryParameters;
  }
  if ("properties" in schema) {
    return [
      ...Object.keys(schema.properties).map((parameter: any) => {
        const qualifiedParameter = (schema.properties as any)[parameter] as {
          type: string;
          description: string;
        };
        return {
          parameter,
          type: qualifiedParameter.type,
          description: qualifiedParameter.description,
          optional:
            "required" in schema
              ? !(schema.required as string[]).includes(parameter)
              : true,
        };
      }),
      ...queryParameters,
    ];
  }
  return queryParameters;
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
        const parameters = extractParameters(operation);
        return (
          <div key={method}>
            <Endpoint title={operation.summary} method={method} path={path} />
            {parameters.length > 0 && <ParametersTable content={parameters} />}
            <PathTable content={operation.responses} />
          </div>
        );
      })}
    </>
  );
}
