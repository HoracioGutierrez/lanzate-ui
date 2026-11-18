# Changelog

All notable changes to the Lanzate UI registry. Versions follow
[Semantic Versioning](https://semver.org); while the version is `0.x`, a
minor bump may contain breaking changes.

## 0.7.0

### Breaking

- **Button:** `elevated` and `glow` are replaced by one `effect` prop:
  `effect="elevated"` or `effect="glow"` (default `"none"`). The two booleans
  set the same CSS property, so combining them only ever showed the last one.
- **Button:** `variant="secondary"` is renamed to `variant="soft"`, so it no
  longer shares a name with `color="secondary"`.
- **Components are folders.** Each component installs as a folder
  (`ui/button/button.tsx`, `button.types.ts`, `button.variants.ts`,
  `index.ts`, …) instead of a single file. Imports from `@/components/ui/button`
  keep working through `index.ts`. Remove the old single-file versions
  (`ui/button.tsx`, `ui/text.tsx`, `ui/tooltip.tsx`, `ui/scroll-area.tsx`)
  after reinstalling.

### Added

- `lanzate-theme` registry item with every shared design token, including
  `lib/tokens.types.ts` (types such as `IntentColor` and `TextSize`). Button
  and Text install it automatically.
- Tokens for values that were hardcoded: `--error`, an `-foreground` color for
  every intent (`--info-foreground`…), `shadow-elevated*`,
  `shadow-button-glow*`, `shadow-button-surface*`, `ease-spring`,
  `text-2xs`, `text-3xs`.
- Exported prop types: `ButtonColor`, `ButtonVariant`, `ButtonEffect`,
  `ButtonPadding`, `ButtonRadius`, `ButtonTextSize`, `ButtonIconSize`,
  `ButtonMobile`, `TextColor`, `TextSizeStep`, `TooltipProps`,
  `ScrollAreaOrientation`.

### Changed

- Button and Text read intent colors from `--error` and the new foreground
  tokens instead of literal values. The colors are the same.
- Text `color="error"` uses `--error` (previously `--destructive`; same value).
- Tooltip and Scroll Area no longer depend on any Lanzate token, so
  installing them doesn't change a project's theme.

### Fixed

- Registry CSS variables were declared with a leading `--`, which the shadcn
  CLI turned into invalid `var(----name)` references.
