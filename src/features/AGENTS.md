# Website features (`src/features`)

The website that documents the registry. Nothing here ships to consumers.
Full rules: `docs/architecture/layers.md` and `docs/architecture/docs-site.md`.

- One folder per feature: `shell` (header, theme, shared site pieces),
  `docs`, `home`. Inside a feature, create only the subfolders it needs:
  `components/`, `hooks/`, `config/`, `lib/`, `types/`, `icons/`, plus
  `<feature>.types.ts` / `<feature>.constants.ts` at its root.
- Pieces used by more than one feature go in `shell`. A feature may import
  from `shell`; avoid imports between other features.
- Import registry components from their folder: `@/components/ui/button`.
- **Server Components by default.** Add `"use client"` only to the smallest
  component that needs state, effects or browser APIs (today: header,
  theme toggle, copy buttons, docs sidebar filter, docs table of contents).
  Read browser state (scroll, theme) with `useSyncExternalStore`, not by
  copying it into state inside an effect.
- No inline `style={{…}}` for design. Repeated visual patterns become a
  utility in `src/styles/globals.css` (`dot-grid`, `hero-glow`,
  `text-fade`) built from tokens; one-off values become tokens.
- Accessibility: one `<h1>` per page (demos and previews use `<p>`, not
  headings); every control has a name (icon-only buttons get `aria-label`
  or `tooltip`); decorative SVGs get `aria-hidden="true"`; animations respect
  `prefers-reduced-motion`.

## Docs pages

- Content is MDX in `docs/content/<id>.mdx`. To add a page: add the id to
  `DocId` (`docs/types/docs.types.ts`), an entry to `docs/config/docs-nav.ts`,
  the MDX file, and its loader in `docs/config/docs-content.ts`.
- `##` headings become the "On this page" list automatically.
- Live examples are demos: one component per `docs/demos/<component>/<name>.demo.tsx`,
  registered in `docs/demos/demo-registry.ts`, used in MDX as
  `<Demo name="…" />`. The page shows the demo and its file's source, so
  the code shown is the code that runs.
- Prop tables are data in `docs/api/<component>.api.ts`, registered in
  `docs/api/api-tables.ts`, used as `<ApiTable name="…" />`.
- MDX can use the components in `docs/mdx/docs-mdx-components.ts` without
  importing them (`Demo`, `ApiTable`, `Lead`, `LinkCard`, `InfoGrid`,
  `DependencyList`, `ComponentBadge`).
