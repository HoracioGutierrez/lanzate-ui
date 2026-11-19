# ButtonGroup — design

## Intent

A registry control that groups related buttons and lights up the chosen
ones. It covers two scenarios with one component:

- **Filters** (`selection="multiple"`): turn several filters on and off at
  once, with an optional, configurable "All" button that clears them.
- **Switching** (`selection="single"`): pick one of a few options (views,
  modes, tabs-like switches). A background slides toward the newly chosen
  option and then fades into the final background of the active button.

It replaces `ToggleGroup` and `FilterButtons` from the `lanzate` app, which
are hand-rolled (no keyboard model) and split across two components.

## Goals

- One component, `ButtonGroup`, with `selection: "single" | "multiple"`.
- Compound API: `ButtonGroup`, `ButtonGroupItem`, `ButtonGroupAll`.
- Items with text, icon-only, or icon + text; optional tooltip on any item.
- The selected item(s) are lit (solid fill in the group's color).
- `single`: directional sliding indicator, then fade into the active item's
  fill.
- `multiple`: value is `string[]`; `ButtonGroupAll` is lit when nothing is
  selected and clears the value when pressed. Its label, icon and tooltip
  are whatever the consumer passes.
- Controlled and uncontrolled (`value`/`defaultValue`/`onValueChange`).
- Horizontal and vertical orientation; disabled group and disabled items.

## Non-goals

- A data-driven `options={[…]}` prop (compound only).
- Counters/badges as a built-in prop: consumers put them in the item's
  children (`Pending · 12`).
- Overflow into a "more" menu, split buttons. Possible follow-ups.
- Form submission for `multiple` (ui-sdk's toggle group doesn't submit;
  `single` submits via `name` because SegmentedControl renders radios).

## Anti-goals

- Re-creating the Button's look with classes: items are the registry
  `Button`.
- An "All" button that is just another toggle value (it must not end up in
  the value array).
- Animation that ignores `prefers-reduced-motion`.

## Constraints

- Behavior from ui-sdk:
  - `single` → `@ui-sdk/react/segmented-control` (`SegmentedControl`,
    `SegmentedControlIndicator`, `SegmentedControlItem`): radio-group
    semantics, arrow keys select, one tab stop, indicator exposes
    `--segmented-control-indicator-{left,top,width,height}`.
  - `multiple` → `@ui-sdk/react/toggle` (`ToggleGroup multiple`, `Toggle`):
    `aria-pressed`, arrow keys move focus without pressing.
- Registry rules (`src/components/ui/AGENTS.md`): types in
  `button-group.types.ts`, variants in `button-group.variants.ts`, one
  component per file, `cn` from `@/lib/cn`, no literal design values,
  import `Button` by exact file, tests incl. the ui-sdk agent test,
  `registry.json` entry, `bun run registry:build`, CHANGELOG + version bump.
- Build on core components, like `FloatingToolbarButton` does: the ui-sdk
  part keeps the behavior and renders the registry `Button` through
  `render`. The Button's own `tooltip` prop supplies the Tooltip.

## Approaches

- **A. One `ButtonGroup` with `selection` (chosen).** One thing to learn and
  document, follows "one prop with explicit values". Internally picks
  SegmentedControl or ToggleGroup. Root props are a discriminated union on
  `selection`, so `value` is `string` in `single` and `string[]` in
  `multiple`.
- B. Two components (`segmented-control`, `toggle-group`). Cleaner
  semantics, but two names for one idea, and sharing the item look would
  need a third core piece because composites can't import each other.
- C. Compound API — adopted *on top of* A instead of an `options` prop,
  because ui-sdk itself is compound and registry consumers expect JSX
  composition.

## Design

```tsx
<ButtonGroup selection="multiple" aria-label="Status" value={status} onValueChange={setStatus}>
  <ButtonGroupAll>All</ButtonGroupAll>
  <ButtonGroupItem value="pending" startIcon={<ClockIcon />}>Pending</ButtonGroupItem>
  <ButtonGroupItem value="paid" icon={<CheckIcon />} tooltip="Paid" />
</ButtonGroup>

<ButtonGroup selection="single" aria-label="View" defaultValue="list">
  <ButtonGroupItem value="list" startIcon={<ListIcon />}>List</ButtonGroupItem>
  <ButtonGroupItem value="grid" startIcon={<GridIcon />}>Grid</ButtonGroupItem>
</ButtonGroup>
```

### Parts

- **`ButtonGroup`** — root. Props: `selection`, `value`, `defaultValue`,
  `onValueChange`, `color` (`ButtonColor`, default `primary`), `size`
  (`"xs" | "md" | "lg"`, default `md`; maps to Button padding `xs` / `sm` / `md`), `orientation`, `disabled`,
  `aria-label`, `className`, `children`. `single` adds `name`, `required`.
  No `radius`: the tray is always `rounded-sm` and items `radius="none"`,
  part of the industrial look (dropped 2026-11-19).
  Renders the industrial tray (see Look). Provides a context:
  `{ selection, color, size }`. In `single` it renders
  `SegmentedControlIndicator` first.
- **`ButtonGroupItem`** — `value` + the Button's content props (`icon`,
  `startIcon`, `endIcon`, `tooltip`, `disabled`, `children`, `aria-label`,
  `className`). Renders `SegmentedControlItem` or `Toggle` (from context)
  with `render={(props, state) => <Button … />}`: `solid` in the group
  color when checked/pressed, `ghost` + `muted` otherwise, plus the LED
  (see Look). In `single` the solid fill is delayed (see Motion).
- **`ButtonGroupAll`** — "nothing selected", in both modes. It's an item
  with a reserved internal value, so it's part of ui-sdk's roving focus;
  the root maps the value so the reserved value never reaches the
  consumer:
  - `multiple`: the root passes `[ALL]` to ToggleGroup while the real value
    is `[]` (so "All" shows pressed). A press that adds `ALL` emits `[]`;
    any other change emits the next value minus `ALL`. Pressing "All" while
    pressed does nothing.
  - `single`: the value type is `string | null`. "All" is checked while the
    value is `null`, and checking it emits `null` (same model as
    `FilterButtons`' `""` in `lanzate`, but typed). The indicator slides to
    it like to any item.

### Look (industrial, like `FloatingToolbar` and `Frame`)

- Tray: square-ish (`rounded-sm` like the toolbar), `border border-border
  bg-card`, `p-1 gap-1`, primary registration brackets on two opposite
  corners (`before:`/`after:` with `border-primary`, over the border, as on
  `FloatingToolbar`). Duplicated on purpose: composites install on their
  own.
- Items: the registry `Button`, `radius="none"`/`xs`, focus ring inset
  (`focus-visible:inset-ring`) so the tray doesn't clip it.
- "Lit" = an LED: a small square (`size-1.5 bg-current`) before the label of
  the active item, as in `lanzate`'s `ToggleGroup`, plus the solid fill.
  Inactive items show the LED off (`bg-current/25` or `bg-border`), so
  items don't shift when they light up. Items with any icon (`icon`, `startIcon`, `endIcon`) have no LED.
  Replaces the earlier `effect="glow"` idea.
- Single indicator: `bg-(--btn-accent)/15` + `inset-ring` in the accent at
  50%, the same "marked" look the toolbar and frame menu triggers use while
  open. `--btn-accent`, not `--btn-color`: for `secondary` and `muted` the
  fill color is a near-background neutral that disappears at 15%, while
  the accent (their foreground) stays visible. For the other colors the two
  are the same value.
- Labels keep the Button's type; no mono/uppercase forced (consumers can
  pass `textClassName`). *Open for the user to change.*

### Motion (`single`)

1. Indicator: absolute, `z-index: -1`, position/size from the ui-sdk CSS
   variables, `transition-[left,top,width,height]` on `ease-spring`, filled
   with the group accent at low opacity (`bg-(--btn-accent)/15`, see Look).
2. Checked item: its solid fill fades in with a `transition-delay` equal to
   the slide duration, on `color` and `background-color` only (the focus
   ring, opacity and press keep their own timing), so the moving highlight "lands" and melts into the
   active button. Unchecked → ghost fades out immediately.
3. `motion-reduce`: no slide, no delay; the fill just swaps.
4. Nothing checked → indicator has no box (ui-sdk behavior).

Durations use Tailwind duration utilities as `Button` does; easing uses the
`ease-spring` token. No literal cubic-bezier.

### Accessibility

- Group needs `aria-label` (or a Field label): required in the types.
- Icon-only items need `tooltip` or `aria-label` (same rule as `Button`).
- `single`: radio semantics from SegmentedControl. `multiple`: toggle
  buttons with `aria-pressed` in a `group`.

## Testing

Vitest + jsdom, importing from `"."`:

- single: default checked, click checks, arrow keys move selection,
  indicator present, controlled value, disabled item skipped.
- multiple: several pressed at once, value array order, "All" pressed when
  empty, "All" clears and fires `onValueChange([])`, "All" never appears in
  the value, disabled group.
- Icon-only item with tooltip has an accessible name.
- ui-sdk agent test (`references/agent-ready.md`).

## Docs site

A docs page with demos: filters with "All", view switcher (icon + text),
icon-only with tooltips, vertical, disabled.

## Left to the builder

- Exact padding/gap/indicator opacity values within existing tokens.
- File split of the context (`button-group-context.tsx` vs hook file).
- Follow-up ideas (not in this change): counters demo, using it on the site
  for Preview/Code, package-manager switcher and theme switcher; overflow
  menu; split button.
