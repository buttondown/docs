# Customer docs

Uses **Bun**, not npm or pnpm.

- When adding a page, register it in `navigation.json` after creating the file.
- FAQs use a `faqItems` field in frontmatter (JSON array with `question` and `answer`) plus `{% faq /%}` in the body. See `billing.mdoc` for an example.
- Local build: `bun run build`.
