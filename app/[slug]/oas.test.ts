import { describe, it, expect } from "vitest";
import { generateSnippetsWithSpecifiedBody } from "./oas";

describe("generateSnippetsWithSpecifiedBody", () => {
  it("generates consistent code snippets for a simple GET request with query params", () => {
    const snippets = generateSnippetsWithSpecifiedBody({
      endpoint: "/subscribers",
      method: "get",
      query: { referrer_url: "https://example.com" },
    });

    expect(snippets).toMatchSnapshot();
  });

  it("generates consistent code snippets for a POST request with body and headers", () => {
    const snippets = generateSnippetsWithSpecifiedBody({
      endpoint: "/subscribers",
      method: "post",
      body: {
        email_address: "john@example.com",
        tags: ["newsletter-1", "newsletter-2"],
      },
      headers: {
        "X-Buttondown-Collision-Behavior": "overwrite",
      },
    });

    expect(snippets).toMatchSnapshot();
  });
});
