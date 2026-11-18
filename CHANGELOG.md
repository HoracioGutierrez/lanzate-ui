# Changelog

All notable changes to the Lanzate UI registry. Versions follow
[Semantic Versioning](https://semver.org); while the version is `0.x`, a
minor bump may contain breaking changes.

## 0.11.0

### Added

- **Frame** (`frame`): an industrial box with registration marks on all
  four corners, sized with `size` (`"sm"` for cards, `"md"`, `"lg"` for
  page sections). `FrameHeader` (optional, `height` `"sm" | "md" | "lg"`)
  takes free content: `FrameBack` for a back button, `FrameTitle`, and
  `FrameMenu` for a three-dot menu with `FrameMenuItem`,
  `FrameMenuSeparator` and `FrameSubmenu`. With `collapsible` (and
  `open` / `defaultOpen` / `onOpenChange`), pressing the title shows or
  hides `FrameContent` on ui-sdk's Collapsible.

## 0.10.0

### Added

- **Floating Toolbar** (`floating-toolbar`): a floating row of icon options
  on ui-sdk's Toolbar. `FloatingToolbarButton` runs an action;
  `FloatingToolbarMenu` with `FloatingToolbarMenuTrigger` and
  `FloatingToolbarMenuContent` opens a panel of items, and
  `FloatingToolbarSubmenu` opens a second panel over the first with a
  back item. `placement` (`"bottom"`, `"top"`, `"inline"`) pins it to the
  viewport or leaves it in the flow. Options that don't fit scroll
  sideways, with edge fades.
- **Floating Toolbar:** `numbering` (`"none"`, `"sequential"`,
  `"hierarchical"`) on `FloatingToolbarMenuContent` and
  `FloatingToolbarSubmenuContent` numbers panel items like part numbers
  (01, 02 or 03.1). Off by default; a nested panel inherits its parent's.
  Exported type: `FloatingToolbarNumbering`.

## 0.9.0

### Added

- **Text:** `variant` (`"body"`, `"heading"`, `"overline"`): role presets.
  `heading` uses the heading font, semibold with tight tracking; `overline` is a small mono,
  uppercase, muted label.
- **Text:** `weight` (`"normal"`, `"medium"`, `"semibold"`), `font`
  (`"sans"`, `"mono"`) and `leading` (`"none"` … `"relaxed"`), so common
  type adjustments don't need `className`.
- `--font-heading` theme token in `lanzate-theme` (`font-heading`
  utility). It defaults to `var(--font-sans)`; set it to give headings
  their own family.
- **Text:** `size="2xs"`, and `size="inherit"` for inline text that keeps its
  parent's size.
- Exported types: `TextVariant`, `TextWeight`, `TextFont`, `TextLeading`.

## 0.8.0

### Added

- **Button:** `variant="subtle"`, a neutral bordered button (theme border,
  card fill, accent on hover). It ignores `color`, for toolbar and utility
  actions like copy or theme toggles.

### Changed

- **Button:** every variant has a 1px border (transparent on `solid`,
  `ghost`, `soft` and `surface`), so buttons with the same `padding` are the
  same size whatever the variant. Unbordered buttons grow by 2px.
- **Button:** an icon-only button (`icon`) sizes its icon box to the text's
  line height, so it is square and exactly as tall as a text button with the
  same `padding`. Icon-only buttons grow a few pixels.
- **Button:** `opacity` is now part of the transition, so a button shown or
  hidden by changing its opacity fades instead of popping.

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

- `lanzate-utils` registry item: a `cn()` (`lib/cn.ts`) that knows the
  design-token class names. Every component installs and uses it; your own
  `lib/utils.ts` is left untouched.
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

- Text and Button lost token classes in projects using shadcn's stock
  `cn()`: `<Text size="display" color="primary">` rendered without its size,
  because stock tailwind-merge reads `text-display` as a color. Components
  now merge classes with Lanzate's own `cn()`.
- Registry CSS variables were declared with a leading `--`, which the shadcn
  CLI turned into invalid `var(----name)` references.
