# Architecture

How Lanzate UI is organized, and why. `AGENTS.md` files hold the short,
mandatory version of these rules; this folder holds the reasoning, examples
and edge cases.

| Doc | What it covers |
| --- | --- |
| [layers.md](layers.md) | The folders under `src/`, what each one may import, and why |
| [conventions.md](conventions.md) | One component per file, types in `*.types.ts`, naming, exports, imports |
| [tokens.md](tokens.md) | Design tokens: the single source of colors, sizes, shadows and motion |
| [registry.md](registry.md) | How a component is laid out and shipped through the shadcn registry |
| [docs-site.md](docs-site.md) | How the `/docs` pages are built: MDX, demos, prop tables, table of contents |
| [linting.md](linting.md) | Which ESLint rule enforces which convention, and how to add a rule |
| [decisions/](decisions/) | Decision records: why a choice was made, with the evidence |

## The project in one paragraph

Lanzate UI is two things in one repository: a **component registry** that
other projects install with the shadcn CLI (`src/components/ui`, `src/lib`),
and the **website** that documents it (`src/app`, `src/features`). The
registry is the product. The website consumes it like any other app would, so
the registry never imports from the website. All visual values come from
**design tokens**, so colors and sizes change in one place.

## Adding or changing a rule

Every rule lives in three places, and a change touches all of them:

1. **The short rule** in the nearest `AGENTS.md` (root for global rules,
   `src/components/ui/AGENTS.md` for registry rules, and so on).
2. **The explanation** in the matching doc in this folder, under a stable
   heading that lint messages can link to.
3. **The enforcement**, when the rule is mechanical: an ESLint rule whose
   message links to that heading (see [linting.md](linting.md)).

A choice that isn't obvious, or that came from an experiment, also gets a
decision record in [decisions/](decisions/).

## Migration status

The architecture was adopted in phases on the `refactor/architecture`
branch. It is complete: every rule is enforced as an error, locally and in CI.

| Phase | Scope | Status |
| --- | --- | --- |
| 0 | Spike: registry folder layout ([0001](decisions/0001-registry-component-folders.md)) | Done |
| 1 | Lint rules, TypeScript `strict`, these docs | Done |
| 2 | Design tokens: DTCG source, Style Dictionary, generated CSS and types ([0002](decisions/0002-design-token-pipeline.md)) | Done |
| 3 | Registry components moved to per-component folders; Button API 0.7.0 ([0003](decisions/0003-registry-imports-and-shipped-types.md)) | Done |
| 3b | Registry components ship their own token-aware cn() ([0004](decisions/0004-registry-cn.md)) | Done |
| 4 | Website moved to `src/features` (shell, docs with MDX, home); lint at zero warnings ([0005](decisions/0005-mdx-docs.md)) | Done |
| 5 | Architecture rules switched to errors; CI workflow ([linting.md#ci](linting.md#ci)) | Done |

No legacy code is left. The table stays as the history of how the
architecture got here; each decision record explains one step.
