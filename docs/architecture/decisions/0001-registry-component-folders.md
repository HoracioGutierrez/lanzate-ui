# 0001 — Registry components live in one folder each

- Status: accepted
- Date: 2026-11-18

## Context

The architecture requires one component per file and types in separate
`*.types.ts` files. A registry component therefore becomes several files
(`button.tsx`, `button.types.ts`, `button.variants.ts`, `index.ts`, …). The
registry is distributed with the shadcn CLI, so the layout must survive
`shadcn build` + `shadcn add` in a consumer project whose aliases differ from
ours.

## Experiment

Spike with shadcn 4.7.0. A producer registry had `badge/` (component, types,
variants, index) and `chip/` (imports `@/components/ui/badge`, declares
`badge` as a `registryDependency`). The consumer's `components.json` used
non-default aliases (`ui: "@/shared/ui"`, `utils: "@/shared/lib/utils"`).

| Registry file entry | Result in consumer |
| --- | --- |
| With `target: "components/ui/badge/badge.tsx"` | Written literally to `src/components/ui/badge/`, **ignoring the consumer's `ui` alias**. Rejected. |
| Without `target` | Written to `src/shared/ui/badge/` — subfolder kept, alias respected. |

Without `target`:

- Relative imports inside the folder (`./badge.types`, `./badge.variants`) are
  kept as-is and resolve.
- Alias imports are rewritten: `@/lib/utils` → `@/shared/lib/utils`,
  `@/components/ui/badge` → `@/shared/ui/badge/badge`.
- `registryDependencies` install the dependency folder next to the dependent.

## Decision

- Each registry component is a folder under `src/components/ui/<name>/`.
- `registry.json` lists every file of the folder with `type: "registry:ui"`
  and **never sets `target`** for UI files.
- Files inside a component folder import each other with relative paths.
- A component imports another registry component through the alias
  (`@/components/ui/<other>`), never with `../<other>`, so shadcn can rewrite it.

## Consequences

- Consumers get the same folder layout we use, under their own `ui` alias.
- `registry.json` items list more files; this is generated or checked by
  tooling rather than hand-maintained (see later phases).
