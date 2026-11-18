# Registry

The registry is the product: components that other projects install with
`npx shadcn add https://lanzate-ui.vercel.app/r/<name>.json`.

## Component anatomy

> **Status:** components move to this layout in phase 3. New components use
> it from the start.

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

Internal sub-parts (like `ButtonSpinner`) are not re-exported.

## registry.json

- One item per component folder. List **every file** of the folder with
  `type: "registry:ui"`.
- **Never set `target`** on UI files. Without it, the CLI keeps the
  subfolder and maps it under the consumer's `ui` alias. With it, the CLI
  writes to a fixed path and ignores the alias.
  Evidence: [decision 0001](decisions/0001-registry-component-folders.md).
- A component that imports another lists it in `registryDependencies`, and
  imports it through `@/components/ui/<other>`.
- Component items never declare `cssVars`. CSS variables ship in the
  `lanzate-theme` item.
- Pin ui-sdk versions in `dependencies` (`@ui-sdk/react@0.1.0-beta.6`).

Run `bun run registry:build` after changing a component or tokens, and
commit `public/r/`.

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
- `cssVars` keys have no leading `--`. The CLI adds it, and `--`-prefixed
  keys come out as `var(----name)`. Evidence:
  [decision 0002](decisions/0002-design-token-pipeline.md).

## Tests

Every registry component has tests next to it (Vitest + jsdom, setup in
`src/test/setup.ts`), including the agent test from the ui-sdk skill
(`references/agent-ready.md`): every control is found by name and operable
through `createAgent`.
