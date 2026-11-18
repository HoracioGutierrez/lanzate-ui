# Frame — design

## Intent

A registry container that boxes content in the Lanzate industrial /
technical-drawing look. One component has to cover both ends of the scale:
a whole page section and a small card or list item with expandable content.
It generalizes `IndustrialCard` and `BlueprintFrame` from the `lanzate` app
(corner registration marks, flat border, square corners, `bg-card`) and adds
the behavior they lack: an optional header with back button, a three-dot menu
and user-driven collapse.

## Goals

- Rectangular box, square corners, `border-border`, `bg-card`.
- Corner registration marks on **all four** corners in `primary` (bolder than
  the two-corner brackets on `FloatingToolbar`), sized with the frame.
- Optional header with configurable height and free content.
- Optional back button in the header.
- Optional three-dot menu in the header, configurable items, submenus and
  separators like the `FloatingToolbar` panels.
- Optional collapse: the user toggles the content by pressing the header;
  collapsed, only the header (and the frame around it) stays visible.

## Non-goals

- Automatic collapse (on scroll, on viewport size). The user toggles it.
- Grain overlay, hover/interactive card states (consumers add those with
  `className`).
- A props/data-driven API (`menuItems=[…]`, `title=""`).

## Anti-goals

- Nested buttons or a header where the back/menu buttons also toggle the
  content.
- A frame that only looks right at one size.

## Constraints

- Behavior from ui-sdk: `@ui-sdk/react/collapsible` for collapse,
  `@ui-sdk/react/menu` for the three-dot menu. No Radix.
- All repo rules: one component per file, types in `frame.types.ts`, class
  maps in `frame.variants.ts`, tokens only, named exports, tests incl. the
  ui-sdk agent test, `registry.json` entry, `bun run registry:build`.

## Approaches

- **A. Composable parts (picked).** `Frame`, `FrameHeader`, `FrameBack`,
  `FrameTitle`, `FrameMenu` + items, `FrameContent`. Free header content,
  matches the `FloatingToolbar` pattern. Costs a bit more markup.
- **B. Props-driven** (`<Frame title onBack menuItems collapsible>`). Quicker
  to write, but header content is limited to what the props anticipate and
  the menu is tied to a data array. Rejected: the header must be freely
  configurable.

## Design

```tsx
<Frame size="md" collapsible defaultOpen onOpenChange={…}>
  <FrameHeader height="md">
    <FrameBack onClick={…} />              {/* optional */}
    <FrameTitle>Orders</FrameTitle>        {/* free content */}
    <FrameMenu label="Order actions">      {/* optional */}
      <FrameMenuItem onClick={…}>Edit</FrameMenuItem>
      <FrameMenuSeparator />
      <FrameSubmenu>
        <FrameSubmenuTrigger>Export</FrameSubmenuTrigger>
        <FrameSubmenuContent>…</FrameSubmenuContent>
      </FrameSubmenu>
    </FrameMenu>
  </FrameHeader>
  <FrameContent>…</FrameContent>
</Frame>
```

- **Frame**: root `div` (`data-slot="frame"`). `size: "sm" | "md" | "lg"`
  scales corner marks and content padding (sm ≈ card, lg ≈ page section).
  `collapsible` (boolean) plus `open` / `defaultOpen` / `onOpenChange`; when
  collapsible it renders ui-sdk `Collapsible` as the root, otherwise a plain
  `div`. Shares state through a context.
- **FrameHeader**: `div` row with bottom border (hidden when collapsed).
  `height: "sm" | "md" | "lg"`, defaulting to the frame's `size`. Content is
  whatever children are passed.
- **FrameTitle**: grows to fill the free space. When the frame is
  collapsible it is the `CollapsibleTrigger` (native button, stretched over
  the remaining header width, chevron at its end that rotates on
  `data-open`); otherwise a plain `div`. Pressing anywhere in the header
  except back/menu toggles the content.
- **FrameBack**: icon button (arrow-left, flips in RTL), `aria-label`
  defaults to "Back", overridable.
- **FrameMenu**: three-dots icon button opening a ui-sdk `Menu`; required
  `label` for its accessible name. Items, separators and submenus reuse the
  look of the `FloatingToolbar` panels (corner marks, mono back item).
  The classes are **duplicated** into `frame.variants.ts`, not imported from
  `floating-toolbar`: sharing them would make `floating-toolbar` a
  `registryDependency` of `frame`, so installing the frame would pull in the
  whole toolbar. Each component ships self-contained.
- **FrameContent**: when collapsible it is the `CollapsiblePanel`, animating
  `--collapsible-panel-height` (respects `prefers-reduced-motion`);
  otherwise a plain `div`.

## Left to the builder

- Exact sizes per `size` / `height` (Tailwind spacing, no literal values).
- Docs page and demos (section-scale and card-scale examples, a grid of
  collapsible items).
- Name: `frame` is provisional.
