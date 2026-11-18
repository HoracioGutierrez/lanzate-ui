# 0006 — Composites build on core components

- Status: accepted
- Date: 2026-11-18

## Context

Frame (0.11.0) and Floating Toolbar (0.10.0) are composites: boxes, menus
and toolbars built from ui-sdk parts. Both started out drawing everything
themselves:

- Their icon buttons were ui-sdk's unstyled `Button` and `MenuTrigger`, plus
  a class list that re-created a ghost button.
- Their small labels re-created `Text`'s `overline` variant:
  `font-mono text-2xs tracking-wide uppercase`. That covers the Frame title,
  the toolbar's submenu title and its Back item.
- Frame duplicated the toolbar's menu panel classes on purpose, so "each
  component installs on its own".

So a change to `Button` or `Text` didn't reach them, and two copies of the
same look drifted apart.

## Options

1. **Self-contained composites.** Each component draws everything it needs
   and depends only on ui-sdk and the theme. Rejected: every core change has
   to be copied by hand, and the "installs alone" benefit is not real.
   `registryDependencies` installs a dependency automatically.
2. **Composites build on core components.** Chosen.

## Decision

- Core components (`button`, `text`, `tooltip`, `scroll-area`) are the
  building blocks. A composite uses them for whatever they already cover and
  only adds its own layout, sizing and state styles.
- Core components stay composable:
  - they forward props and the ref;
  - they merge `className`;
  - they accept `render`;
  - they render one element. An option that adds a wrapper, like Button's
    `tooltip`, is never used inside a ui-sdk `render` chain.
- Composites don't import each other. A piece two composites share becomes a
  new core component. Until it does, each keeps its own copy. That still
  covers the menu panel classes Frame and Floating Toolbar each keep.
- Exceptions (pseudo-elements, a ui-sdk part that must own the element) are
  commented in the code.

## Evidence

Frame's back and menu buttons, then Floating Toolbar's options and menu
triggers, moved to the registry `Button`. Two cases needed care:

- **Chained `render`:** `ToolbarButton render={<MenuTrigger render={<Button … />} />}`
  works, because Button spreads its props and ref onto ui-sdk's Button.
- **Focus ring:** the toolbar row scrolls, so Button's outer ring would be
  clipped. The toolbar swaps it for an inner ring through `className`.

Nothing else changed. Both components kept:

- their public props;
- their size (28/36/48px in Frame, 40px in the toolbar);
- their roving focus, open state and agent test.

Both items now list `button` in `registryDependencies`.

## Consequences

- Installing a composite also installs the core components it uses (Button
  pulls in Tooltip). That is a few more files in the consumer's `ui` folder.
- A core component's API is now a contract for composites too. A breaking
  change to Button or Text is checked against every composite that uses it.
- Frame's title, the toolbar's submenu title and Back item, and both menus'
  item labels moved to `Text` as well. Doing so added `color="inherit"` to
  Text: the menu item colors its own states (highlighted, destructive), and
  a label with a fixed color would ignore them. A core component grows an
  option like this when a composite needs it; that is the rule's other side.
- `Text` is placed *inside* ui-sdk parts that own the element (`MenuGroupLabel`),
  not passed to their `render`: Text sets its own `data-slot`, which would
  replace the part's.
- The toolbar's item numbers stay as classes: they are a CSS counter in an
  `::after` pseudo-element, the documented exception.
- Not enforced by lint (see [linting.md](../linting.md)): checked in review.
