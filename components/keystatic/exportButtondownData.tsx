import { component } from "@keystatic/core";

const schema = {};

function Preview() {
  return <div>With Buttondown, exporting your data is easy.</div>;
}

export const exportButtondownData = component({
  label: "Export data snippet",
  schema,
  preview: Preview,
});
