# Registry components (`src/components/ui`)

Everything in this folder ships to other projects through the shadcn
registry. Full rules: `docs/architecture/registry.md`.

- One folder per component: `src/components/ui/<name>/`. Files inside:
  `<name>.tsx` (the component), one `.tsx` per sub-part
  (`<name>-<part>.tsx`), `<name>.types.ts`, `<name>.variants.ts`,
  `<name>.test.tsx`, and `index.ts` with explicit named re-exports of the
  public API only.
- Import siblings relatively (`./button.types`); import other components
  through the alias (`@/components/ui/tooltip`), never `../tooltip`.
- Never import from `@/features`, `@/app` or anything website-specific.
  Only `ui`, `hooks`, `lib` and `styles`.
- Public prop types are a contract in `<name>.types.ts`. Variant maps check
  themselves against it with `satisfies Record<Union, string>`. Don't export
  `VariantProps<typeof cva>` as the public type.
- No literal colors, font sizes, shadows or easings. Use token utilities or
  `var(--token)`. Missing token → add it (see `docs/architecture/tokens.md`).
- Behavior comes from ui-sdk (see the root `AGENTS.md`). Style from
  `data-slot` and state attributes. Every control has an accessible name.
- Every component has tests, including the ui-sdk agent test.
- After any change: update `registry.json` (every file listed, no `target`,
  `registryDependencies` for other components) and run
  `bun run registry:build`.

> Until phase 3 lands, the existing components are single files
> (`button.tsx`, …). New components use the folder layout.
