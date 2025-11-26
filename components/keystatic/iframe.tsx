import {
	component,
	fields,
	type ObjectField,
	type PreviewProps,
} from "@keystatic/core";

const schema = {
	src: fields.url({ label: "URL" }),
	height: fields.number({ label: "Height", defaultValue: 300 }),
	width: fields.select({
		label: "Width",
		defaultValue: "normal",
		options: [
			{ label: "Normal", value: "normal" },
			{ label: "Wide", value: "wide" },
		],
	}),
	variant: fields.select({
		label: "Variant",
		defaultValue: "page",
		options: [
			{ label: "Page", value: "page" },
			{ label: "Email", value: "email" },
			{ label: "Subscriber", value: "subscriber" },
		],
	}),
};

function Preview(props: PreviewProps<ObjectField<typeof schema>>) {
	const src = props.fields.src.value;
	if (!src) {
		return null;
	}
	const height = props.fields.height.value;
	const width = props.fields.width.value;
	return (
		<iframe
			src={src}
			style={{
				height: height ?? 300,
				width: width === "wide" ? "100%" : ((height ?? 300) * 16) / 9,
			}}
		></iframe>
	);
}

export const iframe = component({
	label: "iframe",
	schema,
	preview: Preview,
});
