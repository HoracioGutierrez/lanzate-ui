# Layers

```
tokens/                  design tokens source (DTCG JSON), see tokens.md
src/
├── app/                 Next.js routes only
├── features/            the website, one folder per feature
├── components/ui/       the registry: components shipped to consumers
├── hooks/               hooks shipped with the registry
├── lib/                 utilities shipped with the registry (cn, …)
├── styles/              global CSS and generated token files
└── test/                test setup
tooling/                 ESLint rules and the token build (Node, not shipped)
docs/architecture/       these docs
```

## Dependency direction

Imports only point inward. A layer may import from itself and the layers to
its right:

```
app → features → ui → hooks → lib → styles
```

| Layer | May import |
| --- | --- |
| `app` | features, ui, hooks, lib, styles |
| `features` | features, ui, hooks, lib, styles |
| `ui` | ui, hooks, lib, styles |
| `hooks` | hooks, lib, styles |
| `lib` | lib, styles |
| `styles` | styles |
| `test` | ui, hooks, lib, styles, test |

`eslint-plugin-boundaries` enforces this table (`boundaries/dependencies`).
Its configuration in `eslint.config.js` is the source of truth; keep this
table in sync with it.

## Why

- **The registry can't depend on the website.** Consumers install
  `src/components/ui`, `src/hooks` and `src/lib`. Any import from `features`
  or `app` would break in their project.
- **The registry stays in `src/components/ui` and `src/lib`.** The shadcn CLI
  rewrites imports that start with `@/components/ui` and `@/lib` to the
  consumer's aliases. Moving the registry to a custom path would lose that.
- **`src/components/` holds only the registry.** Website components live in
  `src/features/`, so "is this shipped?" is answered by the path.

## What goes where

### `src/app/`

Route files only: `page.tsx`, `layout.tsx`, `not-found.tsx`, metadata,
`generateStaticParams`. A page reads params and renders one feature
component. No markup beyond that, no styling, no local components.

- Type params with Next's generated global helpers, not local types:
  `PageProps<"/docs/[section]">`, `LayoutProps<"/">`. They come from
  `next typegen`, which `bun run typecheck` runs first.
- Route files use `export default` (Next requires it). Everything else in
  the project uses named exports.

### `src/features/<feature>/`

One folder per area of the website (`shell`, `docs`, `home`). Inside:

```
src/features/docs/
├── components/     one component per file
├── hooks/          use-*.ts
├── config/         static data (navigation, …)
├── types/          *.types.ts shared across the feature
├── content/        MDX pages
└── demos/          one demo per file, rendered and shown as source
```

Create only the subfolders a feature needs. A feature may import another
feature's public pieces, but prefer moving shared pieces to `shell`.

### `src/components/ui/<component>/`

One folder per registry component. See [registry.md](registry.md).

### `src/lib/`, `src/hooks/`

Code shipped with the registry and used by more than one component. Code
used by a single component stays in that component's folder.

### `src/styles/`

`globals.css` and `generated/` (token outputs, never edited by hand). See
[tokens.md](tokens.md).
