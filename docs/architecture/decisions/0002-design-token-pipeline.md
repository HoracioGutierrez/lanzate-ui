# 0002 — Design token pipeline

- Status: accepted
- Date: 2026-11-18

## Context

Tokens were hand-written CSS in `src/index.css` and copied by hand into the
`cssVars` of each item in `registry.json`. Components also held literal
values (`oklch(1 0 0)` as text on intent colors, `rgba` shadows, a
`cubic-bezier`), and `cn()` only knew about `text-display` because someone
added it to `utils.ts` by hand.

## Decision

- **Source:** DTCG JSON in `tokens/`, the W3C Design Tokens format, which
  Figma Variables and Tokens Studio can export.
- **Build:** `tooling/tokens/build.js`. Style Dictionary 5 loads the files
  and resolves references. The script writes the outputs itself, because
  they don't map to Style Dictionary's stock formats: per-mode blocks, the
  `@theme inline` mapping, TypeScript unions, tailwind-merge config and a
  shadcn registry item.
- **Resolved values, not references:** outputs contain final values
  (`--primary: oklch(0.62 0.18 35)`), not `var(--primitive-…)`. Primitives
  aren't emitted, which avoids clashing with Tailwind's own `--color-orange-*`
  palette.
- **Scopes:** `registry` tokens ship in a single `registry:theme` item
  (`lanzate-theme`); components that use them list it in
  `registryDependencies`. `site` tokens (the standard shadcn set) don't ship,
  so installing a Lanzate component doesn't overwrite a consumer's neutrals.
- **Only components that need Lanzate tokens depend on the theme.** Today
  that's Button and Text. Tooltip and Scroll Area use only shadcn's standard
  variables, so installing them doesn't change a consumer's `--primary`.
- **Generated files are committed** and checked in CI with `tokens:check`.

## Evidence

Installing `lanzate-theme` with shadcn 4.7.0 into a test project:

- `cssVars.theme` lands in `@theme inline`, `light` in `:root`, `dark` in
  `.dark`. Existing consumer variables are overwritten in place.
- **cssVars keys must not start with `--`.** The CLI adds the prefix itself:
  `"--button-surface-gradient"` became `var(----button-surface-gradient)`,
  which is invalid. The previous hand-written `registry.json` used `--` keys
  and had this bug.
- For `light` variables with no `theme` entry, the CLI adds a
  self-reference to `@theme inline` (`--x: var(--x)`). It's harmless.

## Consequences

- Adding a color, size or shadow is a JSON edit plus `bun run tokens`.
- Prop types (`IntentColor`, `TextSize`…) come from the tokens, so a new
  intent color fails type-checking in every component that doesn't handle
  it.
- Consumers' own `cn()` (shadcn's `lib/utils`) doesn't know our custom
  token classes, such as `text-display` or `shadow-elevated`. A conflicting
  class passed through `className` may not override them in a consumer
  project. **Update:** it was worse (our own classes dropped each other);
  resolved by [0004](0004-registry-cn.md).
