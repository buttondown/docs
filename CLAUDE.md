This folder of the monorepo (docs/) uses Bun instead of npm or pnpm.

- When adding a new page, make sure to add it to the navigation.json file after you've created it.
- FAQs use a `faqItems` field in the frontmatter (JSON array with `question` and `answer` keys) and `{% faq /%}` in the body to render them. See billing.mdoc for an example.
- To run a local build: `KEYSTATIC_LOCAL=true bun run build`
