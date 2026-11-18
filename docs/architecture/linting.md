# Linting

`bun run lint` enforces the architecture. Rule messages link to the doc
heading that explains them.

## Rule map

| Convention | Rule | Source |
| --- | --- | --- |
| One component per file | `lanzate/one-component-per-file` | `tooling/eslint/rules/` |
| Types only in `*.types.ts` | `lanzate/types-in-types-files` | `tooling/eslint/rules/` |
| No literal design values | `lanzate/no-magic-design-values` | `tooling/eslint/rules/` |
| Layer dependencies | `boundaries/dependencies` | `eslint-plugin-boundaries` |
| kebab-case files and folders | `check-file/*-naming-convention` | `eslint-plugin-check-file` |
| Named exports, no `export *` | `no-restricted-syntax` | ESLint core |
| `import type` | `@typescript-eslint/consistent-type-imports` | typescript-eslint |
| React correctness | `@eslint-react/*`, `react-hooks/*` | `@eslint-react/eslint-plugin`, `eslint-plugin-react-hooks` |
| Next.js | `@next/next/*` (core-web-vitals) | `@next/eslint-plugin-next` |

`eslint-plugin-react` is not used: it doesn't support ESLint 10.
`@eslint-react` has no "one component per file" rule, hence the local one.

## Severity

Architecture rules use the `ARCHITECTURE` constant in `eslint.config.js`,
set to `"warn"` during the migration (see
[README.md](README.md#migration-status)). Phase 5 sets it to `"error"`.
Correctness rules (TypeScript, hooks, Next) are errors from the start.

## Exceptions

- `src/app/**`: may use `export default`; one-component rule off.
- `*.test.{ts,tsx}`: may define throwaway components, use literal values and
  plain `<a>` elements.
- A line-level disable needs a reason:
  `// eslint-disable-next-line <rule> -- <why>`.

## Adding a rule

1. Write the rule in `tooling/eslint/rules/<name>.js` and register it in
   `tooling/eslint/plugin.js`.
2. Its message ends with `See docs/architecture/<doc>.md#<heading>`.
3. Add `RuleTester` cases to `tooling/eslint/rules/rules.test.js`
   (they run with `bun run test`).
4. Document it in the linked doc and add a row to the map above.
5. Add the short version to the nearest `AGENTS.md`.
