# 0004 — Registry components ship their own cn()

- Status: accepted (resolves the open consequence of [0002](0002-design-token-pipeline.md))
- Date: 2026-11-18

## Context

Registry components merged classes with `cn` from `@/lib/utils`. In a
consumer project that is shadcn's stock `cn`: plain `tailwind-merge`, which
doesn't know our token names. Tested with tailwind-merge 3:

| Input | Stock `twMerge` | Why |
| --- | --- | --- |
| `text-display text-primary` | `text-primary` | `display` isn't a known size, so `text-display` is read as a color |
| `shadow-elevated shadow-primary` | `shadow-primary` | same, for shadows |
| `ease-out ease-spring` | both kept | `spring` isn't a known easing; the CSS order decides |

So in a consumer project `<Text size="display" color="primary">` rendered
without its size, and Button lost `textSize="display"` against its own
`text-(--btn-fg)`. The published registry already had the bug; our website
never showed it because its `cn` knew the tokens.

## Options

1. **Overwrite the consumer's `lib/utils.ts`** with a token-aware `cn`.
   Rejected: it replaces a file the consumer owns and may have changed.
2. **Ship a separate `cn` that only registry components use.** Chosen.

## Decision

- `src/lib/cn.ts` is the token-aware `cn`. It reads the generated
  `src/lib/tw-merge.config.ts` (token names per Tailwind namespace).
- Both ship in the `lanzate-utils` registry item (`registry:lib`). Every
  registry component depends on it.
- Registry components import `cn` from `@/lib/cn`, never from `@/lib/utils`.
  `bun run registry:check` enforces it, and requires every `@/lib/<file>`
  import to be covered by the item that ships that file.
- `src/lib/utils.ts` stays as shadcn's entry point and re-exports the same
  `cn` for the website.

## Evidence

Installed Text and Button with shadcn 4.7.0 into a test project whose
`lib/utils.ts` is stock shadcn. Its own file was left untouched. In the same
project, the stock `cn("text-display", "text-primary")` returned
`text-primary`, while `<Text size="display" color="primary">` rendered
`class="text-display leading-tight tracking-tighter text-primary"`, and
Button kept `text-display`, `text-(--btn-fg)`, `shadow-elevated` and
`ease-spring`. The project type-checks with `strict`.

## Consequences

- A consumer's own `cn` still doesn't know our token classes. Passing
  `className="text-display"` to *their* components through *their* `cn` has
  the same problem; our components are safe. The website's theming page
  should explain it, with the fix (extend their `cn` with `twMergeTheme`);
  pending, with the docs rewrite in phase 4.
- `src/lib/cn.test.ts` keeps a baseline test that reproduces the stock
  behavior, so a tailwind-merge upgrade that changes it is noticed.
