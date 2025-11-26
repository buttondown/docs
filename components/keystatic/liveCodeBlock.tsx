import {
	component,
	fields,
	type ObjectField,
	type PreviewProps,
} from "@keystatic/core";

const IN_PRODUCTION = process.env.NODE_ENV === "production";
const APPLICATION_DIRECTORY = IN_PRODUCTION ? "docs" : ".";
const generatePath = (path: string) => {
	return `${APPLICATION_DIRECTORY}/${path}`;
};

const schema = {
	filename: fields.pathReference({
		label: "Filename",
		pattern: generatePath("public/**/*.html"),
		validation: {
			isRequired: false,
		},
	}),
};

function Preview(props: PreviewProps<ObjectField<typeof schema>>) {
	return (
		<div>
			<pre>{props.fields.filename.value}</pre>
		</div>
	);
}

export const liveCodeBlock = component({
	label: "Live Code Block",
	schema,
	preview: Preview,
});
