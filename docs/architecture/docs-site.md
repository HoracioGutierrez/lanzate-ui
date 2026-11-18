# The docs site

How the documentation pages under `/docs` are built. The short rules are in
`src/features/AGENTS.md`; the reasoning is in
[decision 0005](decisions/0005-mdx-docs.md).

## From URL to page

```
/docs/[section]            src/app/docs/[section]/page.tsx
  │                        reads the param, 404s unknown ids, renders DocsPage
  ▼
DocsPage (server)          src/features/docs/components/docs-page.tsx
  ├── DocsSidebar (client)   navigation from config/docs-nav.ts, with a filter
  ├── <Content />            the MDX module from config/docs-content.ts
  ├── DocsPager              previous / next, from config/docs-nav.ts
  └── DocsToc (client)       "On this page", from lib/get-toc.ts
```

Every page is prerendered at build time (`generateStaticParams`,
`dynamicParams = false`).

## Single sources

| Data | Lives in | Feeds |
| --- | --- | --- |
| Page ids | `DocId` in `types/docs.types.ts` | every map below is checked against it with `satisfies` |
| Order, labels, groups | `config/docs-nav.ts` | sidebar, pager, breadcrumb, page titles |
| Content | `content/<id>.mdx` | the article and the table of contents |
| Demos | `demos/demo-registry.ts` | `<Demo name>` in MDX |
| Prop tables | `api/api-tables.ts` | `<ApiTable name>` in MDX |

## Table of contents

`lib/extract-toc.ts` reads the MDX source at build time and lists its `##`
headings, slugged with `github-slugger`, the library `rehype-slug` uses to
give headings their ids. Both run over every heading in order, so ids match,
including numbered duplicates. Code fences are skipped. The links are plain
anchors and work without JavaScript; the client only highlights the current
section (`hooks/use-scroll-spy.ts`).

## Demos

A demo is a component file under `demos/<component>/`, with a `.demo.tsx`
suffix, registered by name. `<Demo name="button-colors" />` renders the
component on a preview pane and, below it, the file's own source. Write
demos as real usage examples: import from `@/components/ui/…`, name every
control, no headings.

## Reading files at build time

`Demo` and `getToc` read files with `fs`. Their paths start with a literal
folder (`path.join(process.cwd(), "src/features/docs/demos", file)`), not a
constant: Turbopack traces files from that literal, and a non-literal path
makes it include the whole project in the server output.

## MDX setup

- `next.config.ts` wraps the config with `@next/mdx`; plugins are named by
  string (`remark-gfm`, `rehype-slug`) so Turbopack can load them.
- `src/mdx-components.tsx` is required by Next at the `src/` root; it
  returns `docsMdxComponents`.
- `src/mdx.d.ts` references `@types/mdx`, so TypeScript can import `.mdx`.
