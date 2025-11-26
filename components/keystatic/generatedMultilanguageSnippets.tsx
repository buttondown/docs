import {
	component,
	fields,
	type ObjectField,
	type PreviewProps,
} from "@keystatic/core";

const schema = {
	method: fields.text({ label: "HTTP Method" }),
	endpoint: fields.text({ label: "HTTP endpoint" }),
	body: fields.text({
		label: "JSON body",
		validation: { isRequired: false },
	}),
	headers: fields.text({
		label: "Headers (as JSON object)",
		validation: { isRequired: false },
	}),
	query: fields.text({
		label: "Query parameters (as JSON object)",
		validation: { isRequired: false },
	}),
};

function Preview(props: PreviewProps<ObjectField<typeof schema>>) {
	return (
		<code>{`We can't generate code snippets inside Keystatic, but imagine example code for ${props.fields.method.value.toUpperCase()} ${props.fields.endpoint.value} here.`}</code>
	);
}

export const generatedMultilanguageSnippets = component({
	label: "Generated API Multilanguage Code Snippets",
	schema,
	preview: Preview,
});
