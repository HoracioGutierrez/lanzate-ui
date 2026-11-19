# Changelog

All notable changes to the Lanzate UI registry. Versions follow
[Semantic Versioning](https://semver.org); while the version is `0.x`, a
minor bump may contain breaking changes.

## 0.14.0

### Added

- **Timeline** (`timeline`): events in order, built on ui-sdk's Timeline (a
  named list, one tab stop, arrow keys by orientation). `Timeline` takes
  `orientation`, `variant` (`line`: markers joined by a line; `tiles`:
  each event is a card with its content inside, sharing the row equally),
  `size` and `appear` (staggered entrance). `TimelineItem` takes `status`
  (`complete` success, `failed` error, `current` warning, `upcoming` muted)
  and `color` to override it; `TimelineMarker` takes `shape` (`circle`,
  `square`), `variant` (`solid`, `soft`, `outline`, defaulting from the
  status), `pulse` and `tooltip` / `tooltipLabel` / `tooltipOptions`, which
  turn it into a button carrying the registry Tooltip (over the whole card
  in a tile). `TimelineConnector` fills as its step completes.
  `TimelineTitle`, `TimelineTime`, `TimelineDescription` and
  `TimelineContent` hold the text. The collapsible mode
  (`TimelineCollapsible`, `TimelineCollapsibleTrigger`,
  `TimelineCollapsiblePanel`) opens from a decorative summary
  (`TimelineStack`, `TimelineStackItem`, `TimelineLeader`): each dot
  leaves and its event grows out of a dot below, in turn, timed by
  `--timeline-stagger` and `--timeline-handoff`. Animations are off under
  reduced motion.

## 0.13.0

### Added

- **Badge** (`badge`): a core component for status chips and pills, built
  from parts. `Badge` takes `variant` (`solid`, `soft`, `outline`,
  `surface`), `color` (every intent), `size` (`sm` chip, `md` pill),
  `radius` (`none`, `sm`, `md`, `full`) and `font`, and changes its element
  with `render` (a link, say). `BadgeTag` is the small chip in front, with
  its own `color` and `variant`; `BadgeDot` is a status dot whose `pulse`
  rings for live states (off under reduced motion). `tooltip` and
  `tooltipOptions` wrap it in the registry Tooltip: a badge with no
  `render` becomes a focusable button whose tip also toggles on press, for
  touch screens. Server Component friendly.

### Changed

- **Intent colors meet WCAG AA (4.5:1)** in light and dark mode. Each intent
  gets a `<intent>-text` token (`primary-text`, `info-text`, `muted-text`…)
  for text, icons and borders on the page or on its own soft tint; Button,
  Button Group, Badge, Text, Frame and Floating Toolbar use it wherever the
  intent was text (soft, outline, ghost and dashed variants, colored text,
  menu items). `Text`'s `muted` color and overline use `muted-text`. Light
  `primary` (0.62 → 0.575) and `info` (0.60 → 0.555) are slightly darker so
  white text on them passes; in dark mode every intent's `-foreground` is
  dark ink. Themes that override an intent must override its `-text` too.
  If you override `--primary`, also set `--primary-text`. See decision 0007.

## 0.12.0

### Added

- **Button Group** (`button-group`): a tray of registry Buttons that lights
  up the chosen ones with a solid fill and an LED, with registration
  brackets on two corners. `selection="single"` switches between options on
  ui-sdk's SegmentedControl: a background slides to the new choice and
  fades into its fill (`value: string | null`, `name` submits it).
  `selection="multiple"` toggles several filters at once on ui-sdk's
  ToggleGroup (`value: string[]`). `ButtonGroupItem` takes text, an icon
  (`icon` for icon-only, `startIcon`, `endIcon`; an item with an icon has
  no LED) and a `tooltip`;
  `ButtonGroupAll`, optional in both modes, is lit while nothing is chosen
  and clears the group. `color`, `size` (`"xs" | "md" | "lg"`, scaling
  the tray, items and LEDs), `orientation` and `disabled` apply to the
  whole group. In both modes one hover fill slides between items and
  stays on the last one until the pointer leaves the tray.

### Fixed

- **Button** (`button`): `mobile="only-icon"` is now square on phones, with
  the icon-only button's padding and line-tall icon box. It used to keep the
  text padding, which left a short, wide button around the icon.

## 0.11.0

### Added

- **Frame** (`frame`): an industrial box with registration marks on all
  four corners, sized with `size` (`"sm"` for cards, `"md"`, `"lg"` for
  page sections). `FrameHeader` (optional, `height` `"sm" | "md" | "lg"`)
  takes free content: `FrameBack` for a back button, `FrameTitle`, and
  `FrameMenu` for a three-dot menu with `FrameMenuItem`,
  `FrameMenuSeparator` and `FrameSubmenu`. With `collapsible` (and
  `open` / `defaultOpen` / `onOpenChange`), pressing the title shows or
  hides `FrameContent` on ui-sdk's Collapsible. `color` takes any intent
  color (`"warning"`, `"error"`, …): it colors the corner marks and, except
  for the default `"primary"`, tints the background and borders.
  The back and three-dot buttons are the registry's `Button` (square,
  ghost), so `button` installs with it and `FrameBack` takes its props.
  `FrameTitle` takes `size` from `Text`'s scale (default `"xs"`).

### Changed

- **Floating Toolbar**: options and menu triggers are drawn with the
  registry's `Button` (ghost, icon only), so `button` now installs with
  `floating-toolbar`. Same props, size, focus ring and open state.
- **Frame** and **Floating Toolbar**: titles, the toolbar's Back item and
  menu item labels are drawn with the registry's `Text` (the `overline`
  variant for small caps labels), so `text` installs with both. Labels
  read slightly wider: they take `overline`'s `tracking-wider`.
- **Text**: `color="inherit"` takes the parent's color, for text inside a
  control that colors its own states (a highlighted menu item).

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
