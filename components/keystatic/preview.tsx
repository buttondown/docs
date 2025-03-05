import {
  type ObjectField,
  type PreviewProps,
  component,
  fields,
} from "@keystatic/core";

const schema = {
  before: fields.text({ label: "Before", multiline: true }),
  after: fields.text({ label: "After", multiline: true }),
};

function Preview(props: PreviewProps<ObjectField<typeof schema>>) {
  return <div>{props.fields.before.value}</div>;
}

export const preview = component({
  label: "Preview",
  schema,
  preview: Preview,
});
