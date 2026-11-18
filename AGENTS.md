<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Lanzate UI is a **component registry** (installed by other projects with the
shadcn CLI) plus the **website** that documents it. The registry is the
product; the website consumes it. Everything in this repo is in English.

Architecture docs: `docs/architecture/README.md`. Read the doc for the area
you touch before changing it. Folders with their own `AGENTS.md` add rules
for that folder (`src/components/ui/AGENTS.md`, `src/features/AGENTS.md`,
`tokens/AGENTS.md`).

```
tokens/              design tokens source (DTCG JSON); generated into src/styles/generated
src/app/             Next.js routes only: read params, render one feature component
src/features/        the website: shell (shared), docs (MDX), home
src/components/ui/   the registry, one folder per component
src/hooks/, src/lib/ shipped with the registry
src/styles/          global CSS, generated token files
tooling/             ESLint rules and scripts
```

## Rules

Each rule links to its explanation. Most are enforced by `bun run lint`.

1. **One component per file**, named after it in kebab-case
   (`ButtonSpinner` → `button-spinner.tsx`). → `conventions.md#one-component-per-file`
2. **Types live in `*.types.ts` files**, which hold only types. No `type`,
   `interface` or inline object types (`{ a }: { a: string }`) elsewhere.
   No `enum`. Implementations check against types with `satisfies`.
   → `conventions.md#types-live-in-types-files`
3. **No literal design values** (`oklch(…)`, `#hex`, `text-[13px]`,
   `shadow-[…]`, `cubic-bezier`). Use tokens; add one if it's missing.
   Tokens live in `tokens/` (JSON); `src/styles/generated/` is output — never
   edit it. → `tokens.md#no-magic-values`
4. **Imports point inward**: app → features → ui → hooks → lib → styles. The
   registry never imports website code. → `layers.md`
5. **kebab-case** files and folders; suffixes `.types.ts`, `.variants.ts`,
   `.constants.ts`, `use-*.ts`, `.test.tsx`, `.demo.tsx`. → `conventions.md#file-naming`
6. **Named exports only** (`export default` only in `src/app` route files).
   No `export *`. `index.ts` only at a registry component's folder root.
   `import type` for types. Inside the registry, import another component
   by exact file (`@/components/ui/tooltip/tooltip-content`), never by
   folder. → `conventions.md#exports-and-imports`
7. **Route params** use Next's global `PageProps<"/route">` /
   `LayoutProps<"/route">`, not local types.
8. **Server Components by default**; `"use client"` on the smallest
   component that needs it.
9. **TypeScript is `strict`** with `noUncheckedIndexedAccess`.

`bun run lint` reports zero warnings. Architecture rules are still "warn" until
phase 5 makes them errors (`docs/architecture/README.md#migration-status`);
**keep it at zero.**

## When you add or change a rule

Update all three: the short rule in the nearest `AGENTS.md`, its explanation
in `docs/architecture/`, and, if it's mechanical, an ESLint rule in
`tooling/eslint/` whose message links to that explanation. Record
non-obvious choices in `docs/architecture/decisions/`. See
`docs/architecture/linting.md#adding-a-rule`.

## Commands

Run `bun run check` before finishing. It runs, in order:

- `bun run tokens:check` — generated token files match `tokens/`
- `bun run registry:check` — `registry.json` matches `src/components/ui`
- `bun run test` — Vitest (components, utils and ESLint rules)
- `bun run typecheck` — `next typegen` + `tsc --noEmit`
- `bun run lint` — ESLint, architecture rules included

`bun run tokens` after changing anything in `tokens/`.
`bun run registry:build` after changing a registry component or tokens.
Public API changes to a registry component bump `package.json` and get a
`CHANGELOG.md` entry.

## ui-sdk

Components with behavior (focus, keyboard, popups, ARIA) are built on ui-sdk (`@ui-sdk/react` + `@ui-sdk/core`), not Radix.

- Before using ui-sdk, follow the ui-sdk skill if it's installed (`npx skills@latest add vercel-labs/ui --skill ui-sdk`; it also ships at `node_modules/@ui-sdk/core/skills/ui-sdk/SKILL.md`), and read `node_modules/@ui-sdk/react/docs/llms.txt`. Then read only the component pages you need, like `docs/components/tooltip.md`.
- To build a new component, also search `node_modules/@ui-sdk/react/docs/core.md` by heading (it's large; don't read it whole), and read `rendering.md` next to it.
- Import each component from its own entry (`@ui-sdk/react/tooltip`), never from the package root or `@ui-sdk/core/internal/*`. Change a part's element with `render`, not `asChild` or `as`.
- Style from state: `data-slot`, state attributes (`data-open`, `data-side`, `data-pending`…) and the CSS variables each component lists.
- Name every control (visible label or `aria-label`) so screen readers and agents (`createAgent` from `@ui-sdk/react/agent`) can find it.
- Every registry component gets tests in `src/**/*.test.tsx` (Vitest + jsdom, setup in `src/test/setup.ts`), including the agent test from the skill's `references/agent-ready.md`.
