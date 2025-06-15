import {
  type ObjectField,
  type PreviewProps,
  component,
  fields,
} from "@keystatic/core";

const IN_PRODUCTION = process.env.NODE_ENV === "production";
const APPLICATION_DIRECTORY = IN_PRODUCTION ? "docs" : ".";
const generatePath = (path: string) => {
  return `${APPLICATION_DIRECTORY}/${path}`;
};

const schema = {
  file: fields.file({
    label: "File",
    directory: generatePath("public"),
    publicPath: "/",
  }),
};

function Preview(props: PreviewProps<ObjectField<typeof schema>>) {
  const file = props.fields.file.value;
  if (!file) return null;
  return <p>{file.filename}</p>;
}

export const video = component({
  label: "Video",
  schema,
  preview: Preview,
});
