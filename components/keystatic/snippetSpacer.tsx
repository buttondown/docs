import {
  type ObjectField,
  type PreviewProps,
  component,
  fields,
} from "@keystatic/core";

const schema = {};

function Preview() {
  return <div>This is a spacer</div>;
}

export const snippetSpacer = component({
  label: "Spacer between two snippets",
  schema,
  preview: Preview,
});
