import {
  type ObjectField,
  type PreviewProps,
  component,
  fields,
} from "@keystatic/core";

const schema = {
  url: fields.url({ label: "URL" }),
  name: fields.text({ label: "Name" }),
  description: fields.text({ label: "Description" }),
  trigger: fields.text({ label: "Trigger" }),
  action: fields.text({ label: "Action" }),
};

function Preview(props: PreviewProps<ObjectField<typeof schema>>) {
  return (
    <div>
      <h2>{props.fields.name.value}</h2>
      <p>{props.fields.description.value}</p>
      <p>
        Trigger: {props.fields.trigger.value} - Action:{" "}
        {props.fields.action.value}
      </p>
    </div>
  );
}

export const automation = component({
  label: "Automation",
  schema,
  preview: Preview,
});
