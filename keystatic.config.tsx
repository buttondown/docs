import { collection, config, fields, singleton } from "@keystatic/core";
import { automation } from "@/components/keystatic/automation";
import { faq } from "@/components/keystatic/faq";
import { fileExplorer } from "@/components/keystatic/fileExplorer";
import { generatedMultilanguageSnippets } from "@/components/keystatic/generatedMultilanguageSnippets";
import { iframe } from "@/components/keystatic/iframe";
import { liveCodeBlock } from "@/components/keystatic/liveCodeBlock";
import { noticeInfo } from "@/components/keystatic/noticeInfo";
import { noticeWarn } from "@/components/keystatic/noticeWarn";
import { paidFeature } from "@/components/keystatic/paidFeature";
import { playgroundEmbed } from "@/components/keystatic/playgroundEmbed";
import { preview } from "@/components/keystatic/preview";
import { supportSnippet } from "@/components/keystatic/supportSnippet";
import { video } from "@/components/keystatic/video";
import {
	NAVIGATION_GROUP_LABELS,
	NAVIGATION_GROUPS,
} from "@/components/layout/lib";

const navigationGroupSchema = (label: string) =>
	fields.array(
		fields.object({
			name: fields.text({ label: "Name" }),
			items: fields.blocks(
				{
					page: {
						label: "Page",
						schema: fields.relationship({ label: "Page", collection: "pages" }),
						itemLabel: (props) => props?.value ?? "",
					},
					divider: {
						label: "Divider",
						schema: fields.text({ label: "Divider" }),
						itemLabel: (props) => `Divider: ${props?.value}`,
					},
					hidden_page: {
						label: "Hidden Page",
						schema: fields.relationship({ label: "Page", collection: "pages" }),
						itemLabel: (props) => props?.value ?? "",
					},
				},
				{ label: "Navigation" },
			),
		}),
		{
			label,
			itemLabel: (props) =>
				`${props.fields.name.value} (${props.fields.items.elements.length})`,
		},
	);

// NON-OBVIOUS LOGIC ALERT!
// When deploying a Keystatic application within the monorepo to Vercel, we deploy
// the entire monorepo, _not_ just this directory — which means that the process _serving_ the
// application is in the root directory of the monorepo, not this directory. As a result, this process
// should be run from the root directory of the monorepo even when local — this helps ensure that the
// behavior is similar to production.
const IN_PRODUCTION = process.env.NODE_ENV === "production";
const APPLICATION_DIRECTORY = IN_PRODUCTION ? "docs" : ".";
export const localBaseURL = IN_PRODUCTION ? "../" : "./";
const generatePath = (path: string) => {
	return `${APPLICATION_DIRECTORY}/${path}`;
};

export default config({
	storage: IN_PRODUCTION
		? {
				kind: "github",
				repo: {
					owner: "buttondown",
					name: "monorepo",
				},
			}
		: {
				kind: "local",
			},
	singletons: {
		navigation: singleton({
			label: "Navigation",
			path: generatePath("content/navigation"),
			format: { data: "json" },
			schema: NAVIGATION_GROUPS.reduce(
				(acc, group) => {
					acc[group] = navigationGroupSchema(NAVIGATION_GROUP_LABELS[group]);
					return acc;
				},
				{} as Record<string, any>,
			),
		}),
	},
	collections: {
		pages: collection({
			label: "Pages",
			slugField: "title",
			path: generatePath("content/pages/*") as `${string}/*`,
			format: { contentField: "content" },
			entryLayout: "content",
			schema: {
				title: fields.slug({ name: { label: "Title" } }),
				navigationTitle: fields.text({
					label: "Navigation Title",
				}),
				description: fields.text({
					label: "Description",
					multiline: true,
				}),
				faqItems: fields.text({
					label: "FAQ Items (JSON)",
					description:
						'JSON array of FAQ items. Example: [{"question":"Q?","answer":"A"}]',
					multiline: true,
				}),
				schema: fields.text({
					label: "Schema",
				}),
				enum: fields.text({
					label: "Enum",
				}),
				date: fields.date({
					label: "Date",
				}),
				endpoint: fields.text({
					label: "Endpoint",
				}),
				method: fields.text({
					label: "Method",
				}),
				content: fields.document({
					label: "Content",
					formatting: true,
					dividers: true,
					links: true,
					images: {
						directory: generatePath("public"),
						publicPath: "/",
					},
					tables: true,
					componentBlocks: {
						automation,
						faq,
						video,
						iframe,
						preview,
						generatedMultilanguageSnippets,
						paidFeature,
						supportSnippet,
						liveCodeBlock,
						playgroundEmbed,
						noticeInfo,
						noticeWarn,
						fileExplorer,
					},
				}),
				relatedPages: fields.array(
					fields.relationship({ label: "Page", collection: "pages" }),
					{ label: "Related Pages", itemLabel: (props) => props.value ?? "" },
				),
			},
		}),
	},
});
