# 0003 — Imports between registry components, and shipped token types

- Status: accepted
- Date: 2026-11-18

## Context

Phase 3 moved every registry component into its own folder with an
`index.ts`. Before shipping, Button, Text and their dependencies were
installed with shadcn 4.7.0 into a test project with custom aliases
(`ui: "@/shared/ui"`, `lib: "@/shared/lib"`) and type-checked with
`strict` on.

## Findings

1. **A folder import loses exports.** Button imported
   `{ Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"`.
   The CLI rewrote it to `@/shared/ui/tooltip/tooltip`, the file named
   after the folder, which only exports `Tooltip`. The consumer would not
   compile.
2. **Exact-file imports are rewritten correctly.**
   `@/components/ui/tooltip/tooltip-content` → `@/shared/ui/tooltip/tooltip-content`.
3. **`@/styles/...` is not an alias the CLI knows.** Components imported
   their token types from `@/styles/generated/tokens.types`, a path that
   doesn't exist in a consumer project.
4. **`registry:lib` files follow the consumer's `lib` alias.** A file at
   `src/lib/tokens.types.ts` installs to `<lib>/tokens.types.ts`, and
   `@/lib/tokens.types` imports are rewritten to match.

With the fixes below, the consumer project type-checks cleanly.

## Decision

- Inside the registry, a component imports another component **by exact
  file** (`@/components/ui/tooltip/tooltip-content`), never by folder.
  Parts that come straight from ui-sdk (`TooltipTrigger`) are imported from
  ui-sdk. `bun run registry:check` enforces the exact-file rule.
- Website code (`src/features`, `src/app`) keeps importing from the folder
  (`@/components/ui/tooltip`); it isn't shipped, so the rewrite doesn't
  apply.
- The generated token types live in `src/lib/tokens.types.ts` and ship as a
  `registry:lib` file inside the `lanzate-theme` item.
- `registry.json` is checked against `src/components/ui` by
  `bun run registry:check`, part of `bun run check`. `--fix` rewrites each
  item's file list.

## Consequences

- A component depends on another component's file names, not only on its
  public API. Renaming a file in a component folder means updating its
  importers; type-checking catches it.
