import type { ApiRow } from "../types/docs.types"

export const buttonGroupApi: ApiRow[] = [
  { prop: "ButtonGroup selection", type: '"single" | "multiple"', description: "Required. single switches between options with a sliding indicator; multiple toggles several items at once." },
  { prop: "ButtonGroup aria-label", type: "string", description: "Required. Names the group for screen readers and agents." },
  { prop: "ButtonGroup value", type: "string | null (single), string[] (multiple)", description: "The chosen items, when controlled. Pair it with onValueChange. null or [] means nothing chosen, which lights ButtonGroupAll." },
  { prop: "ButtonGroup defaultValue", type: "string | null (single), string[] (multiple)", default: "null / []", description: "The chosen items at first, when uncontrolled." },
  { prop: "ButtonGroup onValueChange", type: "(value) => void", description: "Runs when the user chooses an item, with the new value. ButtonGroupAll's internal value never appears in it." },
  { prop: "ButtonGroup color", type: '"primary" | "secondary" | "muted" | "info" | "warning" | "success" | "error"', default: '"primary"', description: "Color of the lit items and the indicator." },
  { prop: "ButtonGroup padding", type: '"none" | "xs" | "sm" | "base" | "md" | "lg" | "xl"', default: '"sm"', description: "Size of every item, as the Button's padding." },
  { prop: "ButtonGroup orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Lays the items out in a row or a column." },
  { prop: "ButtonGroup disabled", type: "boolean", default: "false", description: "Disables every item." },
  { prop: "ButtonGroup name", type: "string", description: "single only. Submits the chosen value with a form." },
  { prop: "ButtonGroupItem value", type: "string", description: "Required. What the group's value holds when this item is chosen." },
  { prop: "ButtonGroupItem icon", type: "ReactNode", description: "Renders an icon-only item. Name it with tooltip or aria-label." },
  { prop: "ButtonGroupItem startIcon / endIcon", type: "ReactNode", description: "Icons beside the label." },
  { prop: "ButtonGroupItem tooltip", type: "ReactNode", description: "Wraps the item in a Tooltip. A disabled item stays focusable so the tooltip stays reachable." },
  { prop: "ButtonGroupItem disabled", type: "boolean", default: "false", description: "Keeps the item from being chosen." },
  { prop: "ButtonGroupAll", type: "ButtonGroupItem props, without value", description: "Optional, in both modes. Lit while nothing is chosen; choosing it clears the group." },
]
