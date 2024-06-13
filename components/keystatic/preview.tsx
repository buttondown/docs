import {
  type ObjectField,
  type PreviewProps,
  component,
  fields,
} from "@keystatic/core";

export const schema = {
  before: fields.text({ label: "Before", multiline: true }),
  after: fields.text({ label: "After", multiline: true }),
};

export function Preview(props: PreviewProps<ObjectField<typeof schema>>) {
  return <div>{props.fields.before.value}</div>;
}

export const preview = component({
  label: "Preview",
  schema,
  preview: Preview,
});
