# Conventions

Every rule here is enforced by ESLint unless it says otherwise. Lint
messages link to these headings, so keep them stable.

## One component per file

A `.tsx` file defines exactly one React component. That includes small
internal ones: a spinner used only by Button still gets its own file.

```
button/
├── button.tsx            ← Button
└── button-spinner.tsx    ← ButtonSpinner (internal: not exported from index.ts)
```

- Name the file after the component in kebab-case: `ButtonSpinner` →
  `button-spinner.tsx`. Sub-parts take the parent's name as a prefix.
- Don't define components inside other components either
  (`@eslint-react/no-nested-component-definitions`).
- Hooks, helpers and constants are not components and may sit next to one,
  but anything reused belongs in its own file (`use-*.ts`, `*.constants.ts`).
- Exempt: Next.js route files and test files.

Rule: `lanzate/one-component-per-file`. It counts top-level PascalCase
functions, arrow functions, `memo`/`forwardRef`/`lazy` calls and class
components.

**Why:** small files are easy to find, review and move. One component per
file also makes each part of a compound component a separate unit for the
registry and for tests.

## Types live in types files

Types and interfaces are declared only in `*.types.ts` files, and those files
hold only types.

```ts
// button.types.ts
import type { ReactNode } from "react"
import type { IntentColor } from "@/lib/tokens.types"

export type ButtonVariant = "solid" | "outline" | "ghost" | "soft" | "dashed" | "surface"
export type ButtonProps = { color?: IntentColor; variant?: ButtonVariant; children?: ReactNode }

// button.tsx
import type { ButtonProps } from "./button.types"
export function Button({ color, variant, children }: ButtonProps) { … }
```

- No `type` or `interface` declarations outside `*.types.ts` (`*.d.ts`
  files are exempt).
- No inline object types in function parameters:
  `function Card({ title }: { title: string })` → declare `CardProps`.
- `*.types.ts` files contain only `import type`, `export type`, `type` and
  `interface`. No values, no runtime imports.
- No `enum`. Use a string union.
- Generic and utility types inline are fine:
  `Record<ButtonVariant, string>`, `ReturnType<typeof f>`.

**Contract first.** Types define the allowed values; implementations check
themselves against the types with `satisfies`:

```ts
// button.variants.ts
import type { ButtonVariant } from "./button.types"
export const variantClasses = {
  solid: "…", outline: "…", ghost: "…", soft: "…", dashed: "…", surface: "…",
} satisfies Record<ButtonVariant, string>
```

Adding a value to the union then fails type-checking everywhere it isn't
handled. Don't derive public prop types from implementation details
(`VariantProps<typeof cva>`); the contract comes first.

Where the types file goes:

| Types used by | File |
| --- | --- |
| One component | `<component>.types.ts` next to it |
| Several files in a feature | `src/features/<feature>/types/<topic>.types.ts` |
| Generated from tokens | `src/lib/tokens.types.ts` |

Rule: `lanzate/types-in-types-files`.

**Why:** the types are the component's public contract. Keeping them apart
makes the contract readable at a glance and keeps type-only imports free of
runtime code.

## File naming

- Files and folders are kebab-case: `docs-sidebar.tsx`, `use-scroll-spy.ts`.
  Next.js route folders may use `[param]`, `(group)` and `_private`.
- Suffixes say what a file holds:

| Suffix | Holds |
| --- | --- |
| `.tsx` | One component |
| `.types.ts` | Types only |
| `.variants.ts` | Class maps and `cva` calls, no JSX |
| `.constants.ts` | Constant values |
| `use-*.ts` | One hook |
| `.test.tsx` / `.test.ts` | Tests, next to the code they test |
| `.demo.tsx` | One documentation demo |
| `index.ts` | A component folder's public API |

Rules: `check-file/filename-naming-convention`,
`check-file/folder-naming-convention`.

**Why:** Windows and macOS filesystems are case-insensitive, so renaming
`Header.tsx` to `header.tsx` confuses git. One casing removes the problem.

## Exports and imports

- **Named exports only.** `export default` is reserved for Next.js route
  files (`page.tsx`, `layout.tsx`, …), which require it.
- **No `export *`.** Re-export each public name explicitly.
- **`index.ts` exists only at the root of a registry component folder**, and
  only re-exports that component's public API. No project-wide barrels
  (`components/ui/index.ts`): they make bundlers load everything.
- **Type imports use `import type`** (`@typescript-eslint/consistent-type-imports`).
- **Inside a component folder, import siblings relatively** (`./button.types`).
  **Across components or layers, use the `@/` alias**, never `../`. The
  shadcn CLI rewrites alias imports for consumers.
- **Inside the registry, import another component by exact file**
  (`@/components/ui/tooltip/tooltip-content`), never by folder
  (`@/components/ui/tooltip`): the CLI rewrites a folder import to
  `<ui>/tooltip/tooltip` and the other exports disappear. Website code
  imports from the folder. Evidence: [decision 0003](decisions/0003-registry-imports-and-shipped-types.md).

Rules: `no-restricted-syntax` (default exports, `export *`),
`@typescript-eslint/consistent-type-imports`, `bun run registry:check` (exact-file
imports in the registry). The relative-vs-alias rule is not linted yet.

## React

- React 19: pass `ref` as a prop; don't use `forwardRef`.
- Behavior (focus, keyboard, popups, ARIA) comes from ui-sdk, not Radix. See
  the ui-sdk section of the root `AGENTS.md`.
- Default to Server Components. Add `"use client"` to the smallest component
  that needs state, effects or browser APIs, not to a whole page.
- Prefer explicit variants over combinable booleans: `effect="glow"`, not
  `glow` + `elevated`.
- Prefer composition over configuration props. A convenience prop (like
  Button's `tooltip`) may exist, but the docs show the composed form too.

## Formatting

UTF-8, LF line endings, 2-space indentation, final newline. `.editorconfig`
sets this for editors and `.gitattributes` normalizes line endings in git.

## TypeScript

`strict` and `noUncheckedIndexedAccess` are on. Indexing a record or an
array returns `T | undefined`; handle it instead of asserting with `!`.
