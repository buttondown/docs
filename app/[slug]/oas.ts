import OpenAPI from "@/lib/openapi/openapi.json";
import Oas from "oas";
import OASNormalize from "oas-normalize";

async function getOas() {
  const oas = new OASNormalize(structuredClone(OpenAPI));
  // biome-ignore lint/suspicious/noExplicitAny: types for OpenAPI schemas are broken
  const circularOas = Oas.init((await oas.deref()) as any);
  const plainOas = Oas.init(structuredClone(OpenAPI));
  return { circularOas, plainOas };
}

const { circularOas, plainOas } = await getOas();
export { circularOas, plainOas };
