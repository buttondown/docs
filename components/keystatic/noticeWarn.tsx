import {
	component,
	fields,
	type ObjectField,
	type PreviewProps,
} from "@keystatic/core";

const schema = {
	text: fields.text({ label: "Notice Warning", multiline: true }),
};

function Preview(props: PreviewProps<ObjectField<typeof schema>>) {
	const text = props.fields.text.value;
	if (!text) {
		return null;
	}
	return <div>{text}</div>;
}

export const noticeWarn = component({
	label: "Notice Warning",
	schema,
	preview: Preview,
});
