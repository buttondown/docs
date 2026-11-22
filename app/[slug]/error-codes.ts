import ErrorCodeEnums from "@/lib/openapi/enums.json";
import OpenAPI from "@/public/openapi.json";

type ErrorResponse = {
  status: string;
  description: string;
  errorCodes?: Array<{
    code: string;
    name: string;
    description: string;
  }>;
};

export const extractErrorCodes = <
  Endpoint extends "/comments",
  Method extends "get",
>(
  endpoint: Endpoint,
  method: Method,
) => {
  const endpointData = OpenAPI.paths[endpoint];
  const operation = endpointData[method];
  const errorResponses: Array<ErrorResponse> = [];

  Object.entries(operation.responses)
    .filter(([status]) => {
      return parseInt(status) >= 400;
    })
    .forEach(([status, response]) => {
      // biome-ignore lint/suspicious/noExplicitAny: OpenAPI response type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const responseAny = response as any;
      const errorResponse: ErrorResponse = {
        status,
        description: responseAny.description,
      };

      // Check if this response has error codes
      if (responseAny.content?.["application/json"]?.schema?.$ref) {
        const ref = responseAny.content["application/json"].schema.$ref;
        // Extract the schema name from the ref
        const schemaName = ref.split("/").pop();

        // Check if this is an error message with error codes
        if (schemaName) {
          // Get the error code enum name from the schema
          // biome-ignore lint/suspicious/noExplicitAny: OpenAPI schema type
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const errorMessageSchema = (OpenAPI.components.schemas as any)[
            schemaName
          ];
          const codeSchema = errorMessageSchema?.properties?.code;
          const errorCodeEnumRef =
            codeSchema?.$ref ?? codeSchema?.allOf?.[0]?.$ref;
          if (errorCodeEnumRef) {
            const errorCodeEnumName = errorCodeEnumRef.split("/").pop();

            // Get the actual error codes from the enum
            // biome-ignore lint/suspicious/noExplicitAny: OpenAPI schema type
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const errorCodeEnum = (OpenAPI.components.schemas as any)[
              errorCodeEnumName
            ];
            if (errorCodeEnum?.enum) {
              errorResponse.errorCodes = errorCodeEnum.enum.map(
                (code: string) => {
                  // Get description from the enums.json file
                  // biome-ignore lint/suspicious/noExplicitAny: Enum data type
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const enumData = (ErrorCodeEnums as any)[errorCodeEnumName];
                  const codeData = enumData?.[code];
                  return {
                    code,
                    name:
                      codeData?.name ||
                      code
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase()),
                    description: codeData?.description || "",
                  };
                },
              );
            }
          }
        }
      }

      errorResponses.push(errorResponse);
    });

  return errorResponses;
};
