import { component, fields } from "@keystatic/core";

const schema = {
  text: fields.text({ label: "Placeholder" }),
};

function Preview() {
  return (
    <div>FAQ section will be rendered automatically from page frontmatter</div>
  );
}

export const faq = component({
  label: "FAQ Section",
  schema,
  preview: Preview,
});
