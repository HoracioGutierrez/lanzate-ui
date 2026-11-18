# Design tokens

Every visual value — colors, type sizes, radii, shadows, easings — is a
design token. Tokens are defined once in `tokens/` and generated into
everything that needs them. Change a token, run `bun run tokens`, and the
site, the components and the registry follow.

## No magic values

Components never contain literal design values. They use a token through a
Tailwind utility (`bg-primary`, `text-sm`, `shadow-soft`, `ease-spring`) or a
CSS variable (`var(--primary)`, `text-(--btn-fg)`).

| Don't | Do |
| --- | --- |
| `[--btn-fg:oklch(1_0_0)]` | `[--btn-fg:var(--info-foreground)]` |
| `text-[13px]` | `text-xs` (or add a token) |
| `shadow-[0_4px_12px_rgba(0,0,0,0.15)]` | `shadow-elevated` |
| `ease-[cubic-bezier(0.34,1.56,0.64,1)]` | `ease-spring` |
| `bg-[#7c3aed]` | `bg-brand` |

If no token fits, add one (see [Adding a token](#adding-a-token)). Don't add
a literal "just this once".

Allowed, because they aren't design decisions or only transform tokens:
layout measurements (`w-[22rem]`, `min-h-[16rem]`),
`color-mix(in oklch, var(--x) 60%, transparent)`, and relative colors from a
token (`oklch(from var(--foreground) l c h / 0.65)`).

Rule: `lanzate/no-magic-design-values`. It flags raw color functions,
arbitrary hex colors, arbitrary `text-`/`leading-`/`tracking-` values,
arbitrary shadows and arbitrary easing curves in any string in `src/`.
Tests are exempt.

**Why:** a color written in a component can't be themed, doesn't switch
with dark mode, and nobody checks its contrast against its pair. A token is
changed once and every component follows.

## Files

```
tokens/                                source of truth (DTCG JSON — W3C Design Tokens format)
├── primitives/color.json              tier 1: raw values (neutral ramp, orange, red…)
├── semantic/color.light.json          tier 2: colors by meaning, light mode (:root)
├── semantic/color.dark.json           tier 2: same tokens, dark mode (.dark)
├── semantic/theme.json                tier 2: mode-independent (type scale, radius, shadows, easing, fonts)
├── component/<component>.json         tier 3: tokens only one component uses
└── themes/<name>.json                 overrides of light colors, applied with .theme-<name>

tooling/tokens/build.js                the build (Style Dictionary reads and resolves; the script formats)

src/styles/generated/                  OUTPUT — committed, never edited by hand
├── tokens.css                         @theme inline + :root + .dark + .theme-*
└── tw-merge.config.ts                 token values for tailwind-merge (used by cn)
src/lib/tokens.types.ts                OUTPUT — ColorToken, IntentColor, TextSize, Radius, Shadow, Ease, FontFamily, ThemeName
                                       (in lib/ because it ships with the registry; see decision 0003)
registry.json → item "lanzate-theme"   OUTPUT — the registry:theme item (generated; don't edit it by hand)
```

`src/styles/globals.css` imports `generated/tokens.css`. It holds no token
values of its own.

## Tiers

1. **Primitives** (`primitive.color.*`) — values without meaning:
   `primitive.color.orange.500`. Only semantic tokens reference them. They
   are not emitted as CSS variables.
2. **Semantic** — meaning: `primary`, `info-foreground`, `shadow-elevated`.
   Components use these.
3. **Component** — a value only one component needs: `shadow-button-glow`.
   Same format as semantic tokens, in `tokens/component/<component>.json`.

Themes (`tokens/themes/`) override semantic colors and may use literal
values.

## Token paths: scope and kind

Every non-primitive token path is `<scope>.<kind>.<name>`:

| Part | Values | Meaning |
| --- | --- | --- |
| scope | `registry` | Ships to consumers in the `lanzate-theme` registry item. Use it for tokens a registry component needs and a stock shadcn project doesn't have. |
| | `site` | Used only by this website: the standard shadcn set (`background`, `border`, `sidebar-*`…), which consumers already have, plus site-only values. |
| kind | `color` | `--<name>` in `:root` and `.dark`, plus `--color-<name>` in `@theme inline` → `bg-<name>`, `text-<name>`… |
| | `theme` | `--<name>` in `@theme inline`. Use a Tailwind namespace prefix so it becomes a utility: `text-*`, `shadow-*`, `radius-*`, `ease-*`, `font-*`. |
| | `root` | `--<name>` on `:root`, for values with no Tailwind namespace (gradients, the base `--radius`). Use with `bg-(image:--name)` or `var(--name)`. |

Example: `registry.theme.shadow.elevated` → `--shadow-elevated` → `shadow-elevated`.

`theme` tokens are inlined into utilities, so a value may read variables that
only exist on the element, like Button's `--btn-color`.

## Intent colors

A color with `"$extensions": { "lanzate": { "intent": true } }` is an
**intent**: a value of components' `color` prop (`primary`, `secondary`,
`muted`, `info`, `warning`, `success`, `error`). Every intent needs a
`<name>-foreground` token for text on top of it; the build fails otherwise.
The `IntentColor` type lists them, and components check their color maps
against it:

```ts
import type { IntentColor } from "@/lib/tokens.types"
const colorClasses = { primary: "…", secondary: "…", /* every intent */ } satisfies Record<IntentColor, string>
```

`destructive` is shadcn's name for `error` and references it, so shadcn
components keep working. Lanzate components use `error`.

## Adding a token

1. Pick the tier, scope and kind using the tables above.
2. Add it to the JSON. A color goes in **both** `color.light.json` and
   `color.dark.json`.
3. Run `bun run tokens`. Commit the JSON and the generated files together.
4. Use it through its utility or variable.

The build fails if light and dark don't define the same colors, a theme
overrides a color that doesn't exist, an intent has no foreground, or two
tokens produce the same variable name.

`bun run tokens:check` (part of `bun run check`) fails when the generated
files don't match `tokens/`.

## Why these choices

Decision record: [0002](decisions/0002-design-token-pipeline.md).
