import {
  type ObjectField,
  type PreviewProps,
  component,
  fields,
} from "@keystatic/core";

const schema = {
  text: fields.text({ label: "Notice Text", multiline: true }),
};

function Preview(props: PreviewProps<ObjectField<typeof schema>>) {
  const text = props.fields.text.value;
  if (!text) {
    return null;
  }
  return <div>{text}</div>;
}

export const noticeInfo = component({
  label: "Notice Info",
  schema,
  preview: Preview,
});
