import { component } from "@keystatic/core";

const schema = {};

function Preview() {
  return (
    <div>
      As always, we are happy to answer any questions you may have via
      support@buttondown.com.
    </div>
  );
}

export const supportSnippet = component({
  label: "Need Support",
  schema,
  preview: Preview,
});
