# Customer docs

Uses **Bun**, not npm or pnpm.

- When adding a page, register it in `navigation.json` after creating the file.
- FAQs use a `faqItems` field in frontmatter (JSON array with `question` and `answer`) plus `{% faq /%}` in the body. See `content/pages/click-tracking.mdoc` for an example.
- Local build: `bun run build`.
- `lib/openapi/snippets.ts` is written by `//app:generate-files` from `shared/openapi-snippets.ts` — edit the source, not the copy. `app/[slug]/oas.ts` just binds it to `public/openapi.json`.
- The API changelog is not here: non-breaking API changes are entries in `marketing/content/changelog.md`, breaking ones are posts in `marketing/content/blog/`. Only the version-by-version history in `api-versioning.mdoc` lives on this site.
- Integration guides are not here: each one is a page in `marketing/content/features/integrations/`, and `redirects.mjs` sends the old URLs there. A new page appears on the integrations wall once its brand icon exists in `shared/icons/brands/`; its frontmatter `category` picks the section.
