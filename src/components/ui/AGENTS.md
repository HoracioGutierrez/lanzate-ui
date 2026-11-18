# Registry components (`src/components/ui`)

Everything in this folder ships to other projects through the shadcn
registry. Full rules: `docs/architecture/registry.md`. `button/` is the
reference example of every rule below.

- One folder per component: `src/components/ui/<name>/`. Files inside:
  `<name>.tsx` (the component), one `.tsx` per sub-part
  (`<name>-<part>.tsx`), `<name>.types.ts`, `<name>.variants.ts`,
  `<name>.test.tsx`, and `index.ts` with explicit named re-exports of the
  public API only.
- Import siblings relatively (`./button.types`).
- Import **other registry components by exact file**:
  `@/components/ui/tooltip/tooltip-content`, never `@/components/ui/tooltip`
  (the shadcn CLI breaks folder imports; see decision 0003). Import ui-sdk
  parts from ui-sdk. Never `../tooltip`.
- **Build on core components** (`button`, `text`, `tooltip`,
  `scroll-area`). A composite uses them for what they already cover instead
  of re-creating their look with classes: a button is `Button`, typography
  is `Text`.
  - Core components stay composable: forward props and the ref, merge
    `className`, accept `render`, render one element.
  - Composites never import each other. A shared piece becomes a new core
    component.
  - Exceptions get a comment in the code.

  See `docs/architecture/registry.md#building-on-core-components`.
- Merge classes with `cn` from `@/lib/cn`, **never `@/lib/utils`**: a
  consumer's stock `cn` drops token classes (`text-display` vs
  `text-primary`; decision 0004). Every component lists
  `https://lanzate-ui.vercel.app/r/lanzate-utils.json` in
  `registryDependencies`.
- Never import from `@/features`, `@/app` or anything website-specific.
  Only `ui`, `hooks`, `lib` and `styles`. Every `@/lib/<file>` you import
  must ship in a registry item you depend on.
- Public prop types are a contract in `<name>.types.ts`. Variant maps check
  themselves against it with `satisfies Record<Union, string>`. Don't export
  `VariantProps<typeof cva>` as the public type. Colors and sizes come from
  `@/lib/tokens.types` (`IntentColor`, `TextSize`…), so new tokens fail
  type-checking until every component handles them.
- Prefer one prop with explicit values over combinable booleans
  (`effect="glow"`, not `glow` + `elevated`).
- No literal colors, font sizes, shadows or easings. Use token utilities or
  `var(--token)`. Missing token → add it (see `docs/architecture/tokens.md`).
- Behavior comes from ui-sdk (see the root `AGENTS.md`). Style from
  `data-slot` and state attributes. Every control has an accessible name.
- Every component has tests next to it, importing from `"."` (the public
  API), including the ui-sdk agent test.
- `registry.json`: every file of the folder listed (tests and agent docs
  excluded), no `target`, no `cssVars`, `registryDependencies` for every
  component imported. `bun run registry:check` verifies it;
  `node tooling/registry/check.js --fix` syncs the file lists.
- Using a `registry`-scope token (`info`, `text-display`, `shadow-elevated`,
  `ease-spring`…)? Add `https://lanzate-ui.vercel.app/r/lanzate-theme.json` to
  the item's `registryDependencies`.
- A change to a component's public API is a breaking change: bump the
  version in `package.json` and add a `CHANGELOG.md` entry.
- Finish with `bun run registry:build` and commit `public/r/`.
