// https://www.rfc-editor.org/rfc/rfc9116 — Expires is set at build time (one
// year out) and refreshed on every deploy, so it never goes stale.
export const dynamic = "force-static";

export function GET() {
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .replace(/\.\d{3}Z$/, "Z");

  const body = [
    "Contact: mailto:support@buttondown.com",
    `Expires: ${expires}`,
    "Preferred-Languages: en",
    "Canonical: https://docs.buttondown.com/.well-known/security.txt",
    "Policy: https://buttondown.com/blog/security",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
