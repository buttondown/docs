import { createReader } from "@keystatic/core/reader";
import fs from "fs";
import { marked } from "marked";
import config, { localBaseURL } from "../../../keystatic.config";

const reader = createReader(localBaseURL, config);

export const dynamic = "force-static";

const CHANNEL_METADATA = {
	title: "Buttondown's API changelog",
	description: "Buttondown's API changelog",
	link: "https://docs.buttondown.com/api-changelog",
};

const MARKDOC_DIRECTORY = "content/pages";

export async function GET() {
	const slugs = (await reader.collections.pages.list()).filter((slug) =>
		slug.startsWith("api-changelog-"),
	);

	const rawPostData = await Promise.all(
		slugs.map(async (slug) => {
			const response = await reader.collections.pages.read(slug, {
				resolveLinkedFiles: true,
			});
			return {
				slug,
				...response,
				rawContent: fs.readFileSync(
					`${MARKDOC_DIRECTORY}/${slug}.mdoc`,
					"utf-8",
				),
			};
		}),
	);

	const sortedPostData = rawPostData.sort((a, b) => {
		const coercedADate = new Date(a.title || "");
		const coercedBDate = new Date(b.title || "");
		return coercedBDate.getTime() - coercedADate.getTime();
	});
	const items = sortedPostData.map((post) => ({
		title: post.title,
		description: post.description,
		link: `https://docs.buttondown.com/${post.slug}`,
		pubDate: new Date(post.title || "").toUTCString(),
		content: marked(post.rawContent.split("---\n")[2]),
	}));
	const rssFeed = `<rss version="2.0">
        <channel>
            <title>${CHANNEL_METADATA.title}</title>
            <description>${CHANNEL_METADATA.description}</description>
            <link>${CHANNEL_METADATA.link}</link>
            ${items
							.map(
								(item) => `<item>
                <title>${item.title}</title>
                <description>${item.description}</description>
                <link>${item.link}</link>
                <pubDate>${item.pubDate}</pubDate>
                <content type="html"><![CDATA[${item.content}]]></content>
            </item>`,
							)
							.join("\n")}
        </channel>
    </rss>`;

	return new Response(rssFeed, {
		headers: {
			"Content-Type": "text/xml",
		},
	});
}
