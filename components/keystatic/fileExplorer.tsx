import {
  type ObjectField,
  type PreviewProps,
  component,
  fields,
} from "@keystatic/core";

const schema = {
  title: fields.text({
    label: "Title",
    defaultValue: "Directory Structure",
  }),
  structure: fields.select({
    label: "Structure Type",
    options: [
      {
        label: "Buttondown CLI Structure",
        value: "buttondown-cli",
      },
      { label: "Custom Structure", value: "custom" },
    ],
    defaultValue: "buttondown-cli",
  }),
  customData: fields.text({
    label: "Custom Structure (JSON)",
    description:
      "JSON array of file/folder structure when using custom structure",
    multiline: true,
    validation: { isRequired: false },
  }),
};

function Preview(props: PreviewProps<ObjectField<typeof schema>>) {
  return (
    <div className="border border-gray-200 p-4 rounded-lg bg-white shadow-xs">
      <div className="flex items-center mb-3">
        <div className="w-5 h-5 bg-blue-100 rounded-sm flex items-center justify-center mr-2">
          📁
        </div>
        <div className="text-sm font-medium text-gray-900">
          {props.fields.title.value || "Directory Structure"}
        </div>
      </div>
      <div className="text-xs text-gray-500 space-y-1">
        <div>
          Type:{" "}
          {props.fields.structure.value === "buttondown-cli"
            ? "Buttondown CLI Structure"
            : "Custom Structure"}
        </div>
        {props.fields.structure.value === "custom" &&
          props.fields.customData.value && (
            <div className="text-gray-400">
              Custom JSON provided
            </div>
          )}
      </div>
    </div>
  );
}

export const fileExplorer = component({
  label: "File Explorer",
  schema,
  preview: Preview,
});
