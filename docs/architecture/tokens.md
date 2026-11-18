# Design tokens

> **Status:** the token pipeline lands in phase 2. Until then, tokens are the
> CSS custom properties in `src/index.css`, and the rule below already
> applies: use them, don't write literal values.

## No magic values

Components never contain literal design values. Colors, type sizes,
shadows, easings and durations come from tokens, through a Tailwind utility
(`bg-primary`, `text-sm`, `shadow-soft`) or a CSS variable
(`var(--primary)`, `text-(--btn-fg)`).

| Don't | Do |
| --- | --- |
| `[--btn-fg:oklch(1_0_0)]` | `[--btn-fg:var(--info-foreground)]` |
| `text-[13px]` | `text-sm` (or add a token) |
| `shadow-[0_4px_12px_rgba(0,0,0,0.15)]` | `shadow-soft` |
| `ease-[cubic-bezier(0.34,1.56,0.64,1)]` | `ease-spring` |
| `bg-[#7c3aed]` | `bg-brand` |

If no token fits, add one (see below). Don't add a literal "just this once".

Layout measurements (`w-[22rem]`, `min-h-[16rem]`) are not design tokens and
are allowed. `color-mix(in oklch, var(--x) …)` is allowed: it only mixes
tokens.

Rule: `lanzate/no-magic-design-values`. It flags raw color functions
(`oklch(`, `rgb(`, `hsl(` …), arbitrary hex colors, arbitrary `text-`,
`leading-` and `tracking-` values, arbitrary shadows and arbitrary easing
curves in any string in `src/`. Tests are exempt.

**Why:** a color written in a component can't be themed, can't switch with
dark mode, and isn't checked for contrast with its pair. A token is changed
once and every component follows.

## Target pipeline (phase 2)

```
tokens/                      source of truth, DTCG JSON (W3C Design Tokens format)
├── primitives/              raw values: color ramps, sizes, shadows, motion
├── semantic/                intent: background, primary, info-foreground… (light.json, dark.json)
├── themes/                  overrides of semantic tokens (ocean, sunset)
└── component/               optional: per-component tokens referencing semantic ones
        │
        ▼  bun run tokens  (Style Dictionary)
src/styles/generated/
├── tokens.css               @theme inline + :root / .dark / .theme-* values
├── tokens.types.ts          SemanticColor, Radius, TextSize… unions for component props
└── tw-merge.config.ts       custom class groups so cn() resolves token classes
registry: lanzate-theme      a registry:theme item with every CSS variable
```

Three tiers, each referencing only the one below it:

1. **Primitives** — values without meaning: `color.orange.500`, `space.4`,
   `easing.spring`.
2. **Semantic** — meaning: `color.primary`, `color.info-foreground`,
   `shadow.pop`. Components use these.
3. **Component** (optional) — `button.radius`, when a component needs a
   knob of its own.

Generated files are committed and never edited by hand. CI regenerates them
and fails if they differ.
