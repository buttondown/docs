import {
  type ObjectField,
  type PreviewProps,
  component,
  fields,
} from "@keystatic/core";

const schema = {
  initialContent: fields.text({
    label: "Initial Content",
    description: "Optional initial markdown content to load in the editor",
    multiline: true,
    validation: {
      isRequired: false,
    },
  }),
  height: fields.text({
    label: "Height",
    description: "Height of the embedded playground (e.g., '600px', '80vh')",
    defaultValue: "600px",
  }),
  title: fields.text({
    label: "Title",
    description: "Title to display above the playground",
    defaultValue: "Buttondown Playground",
  }),
  editorMode: fields.select({
    label: "Editor Mode",
    description: "Mode of the editor",
    options: [
      { label: "Plaintext", value: "plaintext" },
      { label: "Fancy", value: "fancy" },
    ],
    defaultValue: "fancy",
  }),
};

function Preview(props: PreviewProps<ObjectField<typeof schema>>) {
  return (
    <div className="border p-4 rounded-sm">
      <div className="text-sm text-gray-600 mb-2">
        Playground Embed: {props.fields.title.value}
      </div>
      <div className="text-xs text-gray-500">
        Height: {props.fields.height.value}
      </div>
    </div>
  );
}

export const playgroundEmbed = component({
  label: "Playground Embed",
  schema,
  preview: Preview,
});
