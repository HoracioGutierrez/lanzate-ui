import type { ApiRow } from "../types/docs.types"

const colors = '"primary" | "secondary" | "muted" | "info" | "success" | "warning" | "error"'

export const badgeApi: ApiRow[] = [
  { prop: "Badge variant", type: '"solid" | "soft" | "outline" | "surface"', default: '"soft"', description: "Fill style. surface is the neutral card pill (border, card fill, soft shadow); color only tints its text." },
  { prop: "Badge color", type: colors, default: '"primary"', description: "Intent color of the badge. A BadgeTag or BadgeDot inside keeps its own." },
  { prop: "Badge size", type: '"sm" | "md"', default: '"md"', description: 'sm is a compact chip, like a "New" next to a nav item; md is a pill with room for a tag, text and an icon.' },
  { prop: "Badge radius", type: '"none" | "sm" | "md" | "full"', default: '"full"', description: "Corner radius. A BadgeTag inside follows it." },
  { prop: "Badge font", type: '"sans" | "mono"', description: "Font family. Without it, the badge inherits the parent's." },
  { prop: "Badge render", type: "ReactElement | (props) => ReactElement", default: "<span />", description: 'Element to render instead of <span>, like render={<a href="…" />}. As a link or button it gets a hover fill and a focus ring.' },
  { prop: "Badge tooltip", type: "ReactNode", description: "Wraps the badge in a Tooltip. Without render, the badge becomes a focusable button and the tip also toggles on press, for touch screens." },
  { prop: "Badge tooltipOptions", type: "{ side, align, sideOffset, arrow, delay, toggleable, type, className }", description: "Settings passed to the Tooltip and its content. For anything else, compose Tooltip and TooltipTrigger yourself." },
  { prop: "Badge className", type: "string", description: "Classes merged after the variants, so they can override any base style." },
  { prop: "BadgeTag color", type: colors, default: '"primary"', description: "Color of the leading chip, independent of the badge's." },
  { prop: "BadgeTag variant", type: '"solid" | "soft" | "outline"', default: '"solid"', description: "Fill style of the chip." },
  { prop: "BadgeDot color", type: colors, default: '"primary"', description: "Color of the dot." },
  { prop: "BadgeDot pulse", type: "boolean", default: "false", description: "Pulses a ring around the dot, for live states. Off when the person prefers reduced motion." },
]
