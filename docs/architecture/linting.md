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
| Registry file lists, exact-file imports, `@/lib/cn` not `@/lib/utils`, shipped `@/lib` deps, no `target`/`cssVars` | `bun run registry:check` (not ESLint) | `tooling/registry/check.js` |
| Generated token files up to date | `bun run tokens:check` (not ESLint) | `tooling/tokens/build.js` |

`eslint-plugin-react` is not used: it doesn't support ESLint 10.
`@eslint-react` has no "one component per file" rule, hence the local one.

## Severity

Every rule fails the build. Architecture rules use the `ARCHITECTURE` constant
in `eslint.config.js`, now `"error"` (it was `"warn"` during the migration; see
[README.md](README.md#migration-status)). `bun run lint` runs with
`--max-warnings 0`, so a warning from any other rule (React, hooks, Next)
fails it too. There is no "warnings are fine" state.

## CI

`.github/workflows/check.yml` runs on pull requests and on pushes to `dev`
and `main`:

1. `bun install --frozen-lockfile` — the lockfile matches `package.json`.
2. `bun run check` — tokens, registry, tests, types, lint.
3. `bun run build` — the site builds.
4. `bun run registry:build` + `git diff --exit-code -- public/r registry.json`
   — the published registry matches its source. A component or token change
   committed without rebuilding `public/r` fails here.

CI pins Bun and Node (22+, for the token build); update them together with
the local versions.

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
