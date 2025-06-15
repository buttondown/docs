import {
  type ObjectField,
  type PreviewProps,
  component,
  fields,
} from "@keystatic/core";

const schema = {
  src: fields.url({ label: "URL" }),
};

function Preview(props: PreviewProps<ObjectField<typeof schema>>) {
  const src = props.fields.src.value;
  if (!src) {
    return null;
  }
  return (
    <iframe
      src={src}
      style={{ height: 200, width: (200 * 16) / 9 }}
    ></iframe>
  );
}

export const iframe = component({
  label: "iframe",
  schema,
  preview: Preview,
});
