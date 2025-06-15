import {
  type ObjectField,
  type PreviewProps,
  component,
  fields,
} from "@keystatic/core";

const schema = {
  loggedIn: fields.text({
    label: "If user logged in",
    multiline: true,
  }),
  anonymous: fields.text({
    label: "If anonymous",
    multiline: true,
  }),
};

function Preview() {
  return <div>This is a renderable component.</div>;
}

export const customizableContent = component({
  label: "Customizable Content",
  schema,
  preview: Preview,
});
