import type { ApiRow } from "../types/docs.types"

export const buttonApi: ApiRow[] = [
  { prop: "variant", type: '"solid" | "outline" | "ghost" | "soft" | "dashed" | "subtle" | "surface"', default: '"solid"', description: "Visual style." },
  { prop: "color", type: '"primary" | "secondary" | "muted" | "info" | "warning" | "success" | "error"', default: '"primary"', description: "Intent color, from the design tokens." },
  { prop: "effect", type: '"none" | "elevated" | "glow"', default: '"none"', description: "Depth treatment: a drop shadow, or a glow in the button's color. One at a time." },
  { prop: "padding", type: '"none" | "xs" | "sm" | "base" | "md" | "lg" | "xl"', default: '"base"', description: "Padding and text size." },
  { prop: "radius", type: '"none" | "sm" | "md" | "lg" | "xl" | "full"', default: '"md"', description: "Corner radius." },
  { prop: "textSize", type: '"xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "display"', description: "Text size independent of padding." },
  { prop: "iconSize", type: '"xs" | "sm" | "base" | "md" | "lg" | "xl"', description: "Icon size relative to the text." },
  { prop: "startIcon", type: "ReactNode", description: "Icon before the text." },
  { prop: "endIcon", type: "ReactNode", description: "Icon after the text." },
  { prop: "icon", type: "ReactNode", description: "Icon-only, square button. Name it with `aria-label` or `tooltip`." },
  { prop: "isLoading", type: "boolean", default: "false", description: "Shows a spinner, disables the button and marks it busy." },
  { prop: "loadingText", type: "string", description: "Replaces the label while loading." },
  { prop: "tooltip", type: "ReactNode", description: "Wraps the button in a Tooltip. A disabled button with a tooltip stays focusable." },
  { prop: "tapAnimation", type: "boolean", default: "true", description: "Scales down slightly on press." },
  { prop: "mobile", type: '"only-icon" | "full-width" | "hidden"', description: "Behavior below the `sm` breakpoint. `only-icon` hides the label (kept for screen readers) and makes the button square, like an icon-only one." },
  { prop: "render", type: "ReactElement", description: "Renders another element, like a link: render={<a href=\"/docs\" />}." },
  { prop: "className", type: "string", description: "Classes for the root element, merged after the variants." },
  { prop: "iconClassName", type: "string", description: "Classes for the icon wrapper (startIcon, endIcon, icon)." },
  { prop: "textClassName", type: "string", description: "Classes for the text wrapper (children or loadingText)." },
]
