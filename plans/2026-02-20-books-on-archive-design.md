# Books on Archive Pages

## Goal

Display newsletter authors' books on their public archive pages so subscribers can discover them.

## Design

Books already have full CRUD via `/v1/books`. The missing piece is rendering them on the public archive.

### Approach

1. **Extend `TemplateContext.to_context()`** to include `books` — query `newsletter.books.all()` (only when books exist, to avoid unnecessary queries)
2. **Create `subscriber_facing/snippets/books.html`** template that renders a bookshelf section
3. **Include the snippet in `base.html`** just before the footer, so it appears on all archive pages across all themes without modifying individual theme templates
4. **Gate on books existing** — only render the section if the newsletter has books

### Template structure

The books snippet renders as a simple grid/list of book cards, each showing:
- Cover image (if provided)
- Title (linked to URL if provided)
- Description (if provided)
- Year (if provided)

### What we're NOT doing

- No new model or DB changes (Book model is sufficient)
- No new API endpoints (CRUD already exists)
- No feature flag gating (books are a free feature)
- No settings page changes (authors manage books via API for now)
