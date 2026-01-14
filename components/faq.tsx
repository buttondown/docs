"use client";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import * as Accordion from "@radix-ui/react-accordion";
import { marked } from "marked";

type FAQItem = {
	question: string;
	answer: string;
};

type FAQProps = {
	items: FAQItem[];
};

export default function FAQ({ items }: FAQProps) {
	if (!items || items.length === 0) {
		return null;
	}

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: items.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	};

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<div className="not-prose my-6">
				<Accordion.Root type="single" collapsible>
					{items.map((item, index) => (
						<Accordion.Item
							key={index}
							value={`item-${index}`}
							className="border border-b-0 last:border-b border-gray-200 first:rounded-t-lg last:rounded-b-lg overflow-hidden"
						>
							<Accordion.Header>
								<Accordion.Trigger className="group flex w-full items-center justify-between bg-background px-5 py-4 text-left hover:bg-card transition-colors">
									<span className="font-medium text-lg text-foreground">
										{item.question}
									</span>
									<ChevronDownIcon className="ml-4 h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
								</Accordion.Trigger>
							</Accordion.Header>
							<Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
								<div className="px-5 pb-4 bg-white prose max-w-none faq-content">
									<div
										// biome-ignore lint/security/noDangerouslySetInnerHtml: Markdown rendered content
										dangerouslySetInnerHTML={{
											__html: marked(item.answer),
										}}
									/>
								</div>
							</Accordion.Content>
						</Accordion.Item>
					))}
				</Accordion.Root>
			</div>
		</>
	);
}
