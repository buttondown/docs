import type { Page } from "./types";

export const generateJSONLDMetadata = (page: Page) => {
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `https://docs.buttondown.com/${page.slug}`,
		},
		headline: page.title,
		description: page.description,
		author: {
			"@type": "Organization",
			name: "Buttondown",
			url: "https://buttondown.com",
		},
		publisher: {
			"@type": "Organization",
			name: "Buttondown",
			logo: {
				"@type": "ImageObject",
				url: "https://buttondown.com/static/images/icons/icon@400.png",
			},
		},
		datePublished: page.date,
	};
};
