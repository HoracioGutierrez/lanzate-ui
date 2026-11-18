# 0005 — Docs in MDX, with registered demos and a build-time table of contents

- Status: accepted
- Date: 2026-11-18

## Context

Docs pages were large TSX files, one per section. Each example appeared
twice: as JSX in a preview, and again as a hand-written string in a code
block, and the two had drifted. The "On this page" list was a separate
hard-coded map whose anchors (`#colores`, `#tamanos`…) had to match ids
written by hand in the TSX, and three pages linked to `#`. Titles were also
repeated in a `titleMap`.

## Decision

- **Content is MDX** (`@next/mdx`), one file per page, imported through a
  typed map (`docs-content.ts`) checked against the `DocId` union.
- **Examples are demo files**, registered by name. `<Demo name>` renders the
  file and shows its source, so the code shown is always the code that runs.
- **Prop tables are typed data**, registered by name.
- **The table of contents is extracted from the MDX source at build time**
  with the same slugger `rehype-slug` uses for heading ids. Rejected
  alternatives: scanning the DOM on the client (the list appears only after
  hydration and needs JavaScript), and a custom remark plugin (Turbopack
  only accepts plugins by package name, so a local plugin would need its own
  package).
- **`docs-nav.ts` is the only list of pages**; titles, pager and breadcrumb
  derive from it.
- Unknown `/docs/<id>` now returns 404 instead of redirecting to the
  introduction.

## Consequences

- Adding a page is four small edits (DocId, nav entry, MDX file, loader);
  type-checking fails if one is missing.
- Demos and their displayed source can't drift.
- `fs` reads at build time must use literal folder paths (see
  [docs-site.md](../docs-site.md#reading-files-at-build-time)).
