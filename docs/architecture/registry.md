# Registry

The registry is the product: components that other projects install with
`npx shadcn add https://lanzate-ui.vercel.app/r/<name>.json`.

## Component anatomy

```
src/components/ui/button/
├── button.tsx              Button only
├── button-spinner.tsx      internal sub-part, own file
├── button.types.ts         ButtonProps and every public type
├── button.variants.ts      cva / class maps, checked with `satisfies`
├── button.constants.ts     only if needed
├── button.test.tsx         behavior, a11y and agent tests
└── index.ts                public API: explicit named re-exports
```

`index.ts` example:

```ts
export { Button } from "./button"
export { buttonVariants } from "./button.variants"
export type { ButtonProps, ButtonVariant } from "./button.types"
```

Internal sub-parts (like `ButtonSpinner`) are not re-exported. Parts that
come straight from ui-sdk may be re-exported as they are
(`export { TooltipTrigger } from "@ui-sdk/react/tooltip"`).

Components that keep shadcn's well-known names keep them, even when the file
name doesn't take the parent's prefix: Scroll Area's scrollbar is `ScrollBar`
in `scroll-bar.tsx`.

## Imports between components

Inside the registry, import another component **by exact file**, and import
ui-sdk parts from ui-sdk:

```ts
// button.tsx
import { TooltipTrigger } from "@ui-sdk/react/tooltip"
import { Tooltip } from "@/components/ui/tooltip/tooltip"
import { TooltipContent } from "@/components/ui/tooltip/tooltip-content"
```

Never `from "@/components/ui/tooltip"`: the shadcn CLI rewrites a folder
import to `<ui>/tooltip/tooltip`, and every export not in that file
disappears. Evidence: [decision 0003](decisions/0003-registry-imports-and-shipped-types.md).
Website code imports from the folder (`@/components/ui/tooltip`).

## Building on core components

**Core components** are the registry's building blocks: today `button`,
`text`, `tooltip` and `scroll-area`. Everything else is a **composite**
built from them and from ui-sdk parts (`frame`, `floating-toolbar`).
The rule has two sides.

**Composites use core components** for whatever those already cover:

- a button is the registry `Button`;
- typography is `Text`;
- a hint is `Tooltip`.

Don't re-create a core component's look with a class string: a copy doesn't
follow when the core component changes.

```tsx
// floating-toolbar-button.tsx: ui-sdk keeps the behavior, Button draws it
<ToolbarButton
  aria-label={label}
  render={<Button variant="ghost" color="muted" padding="none" icon={icon} className={sizeClasses} />}
/>
```

```tsx
// ✗ re-creates Text's overline variant
<span className="font-mono text-2xs tracking-wide uppercase">Shapes</span>
// ✓
<Text render={<span />} variant="overline" size="2xs">Shapes</Text>
```

A composite only adds what is its own:

- layout;
- sizing from its own CSS variables;
- state styles (`data-open`);
- overrides passed through `className`.

**Core components stay composable**, so they can be reapplied inside any
composite:

- Forward every prop and the ref to the rendered element (spread `...props`
  onto the ui-sdk part). ui-sdk's `render` needs it: "A custom component used
  here needs to forward those props and the ref to its DOM element."
- Merge `className` with `cn`, so a composite can override size, radius or
  focus ring.
- Accept `render` to change the element.
- Render one element. A prop that adds a wrapper must be optional, like
  Button's `tooltip`, which wraps the button in a Tooltip. Composites that
  pass the component to a ui-sdk `render` must not use it: the wrapper
  breaks the chain.

**Composites don't import each other.** When two composites need the same
piece (both menus' panels), it becomes a new core component that both
depend on. Until then each composite keeps its own copy; never import
another composite to share it.

**Exceptions** get a short comment in the code saying why:

- Pseudo-elements (`after:` numbering) can't be a component.
- A ui-sdk part must own the element and a core component can't be passed
  to its `render`.

Depending on a core component costs the user nothing: `registryDependencies`
installs it. List it there and import it by exact file. Why this replaced
"duplicate so each component installs alone":
[decision 0006](decisions/0006-composites-build-on-core-components.md).

## Merging classes: `@/lib/cn`

Registry components import `cn` from `@/lib/cn`, **never `@/lib/utils`**.
In a consumer project `@/lib/utils` is shadcn's stock `cn`, which doesn't
know our token classes and drops them: `cn("text-display", "text-primary")`
returns `"text-primary"`. Our `cn` ships in the `lanzate-utils` item, so
every component depends on it. Evidence: [decision 0004](decisions/0004-registry-cn.md).

Any `@/lib/<file>` a component imports must ship in a registry item the
component lists in `registryDependencies`. `bun run registry:check`
enforces both rules.

## registry.json

`bun run registry:check` compares `registry.json` with `src/components/ui`
and fails on any mismatch; `node tooling/registry/check.js --fix` rewrites
each item's file list from its folder.

- One item per component folder. List **every file** of the folder with
  `type: "registry:ui"`, except tests and `AGENTS.md`/`CLAUDE.md`.
- **Never set `target`** on UI files. Without it, the CLI keeps the
  subfolder and maps it under the consumer's `ui` alias. With it, the CLI
  writes to a fixed path and ignores the alias.
  Evidence: [decision 0001](decisions/0001-registry-component-folders.md).
- A component that imports another lists it in `registryDependencies`.
- Component items never declare `cssVars`. CSS variables ship in the
  `lanzate-theme` item.
- Pin ui-sdk versions in `dependencies` (`@ui-sdk/react@0.1.0-beta.6`).

Run `bun run registry:build` after changing a component or tokens, and
commit `public/r/`.

## Support items

| Item | Type | Ships | Who depends on it |
| --- | --- | --- | --- |
| `lanzate-theme` | `registry:theme` | `registry`-scope CSS variables, `lib/tokens.types.ts` | components that use Lanzate tokens (Button, Text) |
| `lanzate-utils` | `registry:lib` | `lib/cn.ts`, `lib/tw-merge.config.ts` | every component |

`lanzate-utils` is hand-written in `registry.json`;
`lib/tw-merge.config.ts` inside it is generated by `bun run tokens`.

## The theme item

`lanzate-theme` (`registry:theme`) carries every token in the `registry`
scope (see [tokens.md](tokens.md#token-paths-scope-and-kind)). It is
**generated** by `bun run tokens`; never edit it in `registry.json` by hand.

- A component lists `https://lanzate-ui.vercel.app/r/lanzate-theme.json` in
  `registryDependencies` **only if it uses a `registry`-scope token**
  (`info`, `text-display`, `shadow-elevated`, `ease-spring`…). Components
  that only use standard shadcn variables (`background`, `border`, `ring`…)
  don't, so installing them doesn't change a consumer's theme.
- Today: Button and Text depend on it; Tooltip and Scroll Area don't.
- It also ships `src/lib/tokens.types.ts` as a `registry:lib` file, so
  components can type their props with `IntentColor`, `TextSize`… from
  `@/lib/tokens.types` in consumer projects too.
- `cssVars` keys have no leading `--`. The CLI adds it, and `--`-prefixed
  keys come out as `var(----name)`. Evidence:
  [decision 0002](decisions/0002-design-token-pipeline.md).

## Tests

Every registry component has tests next to it (Vitest + jsdom, setup in
`src/test/setup.ts`), including the agent test from the ui-sdk skill
(`references/agent-ready.md`): every control is found by name and operable
through `createAgent`.
