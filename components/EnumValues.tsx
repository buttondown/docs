import { marked } from "marked";
import OpenAPIEnums from "../lib/openapi/enums.json";
import OpenAPI from "../public/openapi.json";

type EnumSchema = {
  type?: string;
  enum: string[];
};

type EnumDescription = {
  name: string;
  description?: string;
};

const SCHEMAS = OpenAPI.components.schemas as Record<
  string,
  Partial<EnumSchema>
>;

const DESCRIPTIONS = OpenAPIEnums as Record<
  string,
  Record<string, EnumDescription>
>;

// Enums with more than this many values are long enough that showing them all
// buries the rest of the schema, so they start collapsed.
const COLLAPSE_THRESHOLD = 6;

export const enumNameForRef = (ref: string | null | undefined) => {
  const name = ref?.split("/").pop();
  if (!name) return null;
  return SCHEMAS[name]?.enum ? name : null;
};

export const underlyingTypeForEnum = (name: string) =>
  SCHEMAS[name]?.type ?? "string";

export default function EnumValues({ name }: { name: string }) {
  const values = SCHEMAS[name]?.enum ?? [];
  const descriptions: Record<string, EnumDescription> =
    DESCRIPTIONS[name] ?? {};

  if (values.length === 0) {
    return null;
  }

  return (
    <details
      className="not-prose mt-4"
      open={values.length <= COLLAPSE_THRESHOLD}
    >
      <summary className="text-sm text-gray-500 cursor-pointer select-none marker:text-gray-400">
        values
      </summary>
      <ul className="mt-1 ml-1">
        {values.map((value) => (
          <li
            key={value}
            id={`${name}-${value}`}
            className="relative pl-4 py-1 scroll-mt-24 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gray-300 last:before:bottom-auto last:before:h-3.5 after:absolute after:left-0 after:top-3.5 after:w-2.5 after:h-px after:bg-gray-300"
          >
            <span className="font-mono text-sm text-gray-900">{value}</span>
            {descriptions[value]?.description !== undefined && (
              <div
                className="text-sm text-gray-500 leading-snug [&_p]:my-0 [&_a]:underline [&_code]:font-mono"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: descriptions are ours, and may contain links.
                dangerouslySetInnerHTML={{
                  __html: marked(descriptions[value].description ?? ""),
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </details>
  );
}
