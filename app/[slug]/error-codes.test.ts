import { describe, expect, it } from "bun:test";
import { extractErrorCodes } from "./error-codes";

describe("extractErrorCodes", () => {
  it("lists the error codes of a response whose schema has a code enum", () => {
    const responses = extractErrorCodes(
      "/forms" as "/comments",
      "post" as "get",
    );
    const badRequest = responses.find((response) => response.status === "400");

    expect(badRequest?.errorCodes?.map((errorCode) => errorCode.code)).toEqual([
      "slug_already_exists",
      "tag_not_found",
    ]);
  });
});
