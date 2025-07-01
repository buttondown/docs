import {
  component,
  fields,
} from "@keystatic/core";
import PRICES from "@/autogen/prices.json";

const schema = {
  feature: fields.select({
    label: "Feature",
    description: "The feature that this snippet is about.",
    options: PRICES[4].features.map((feature) => {
      return { value: feature, label: feature };
    }),
    defaultValue: "scheduling",
  }),
};

function Preview() {
  return <div>This is a paid feature.</div>;
}

export const paidFeature = component({
  label: "Paid feature",
  schema,
  preview: Preview,
});
