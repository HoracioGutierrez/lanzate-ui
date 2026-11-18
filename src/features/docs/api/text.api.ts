import type { ApiRow } from "../types/docs.types"

export const textApi: ApiRow[] = [
  { prop: "render", type: "ReactElement | (props) => ReactElement", default: "<p />", description: "Element to render instead of <p>, like render={<h1 />}. Same render prop as ui-sdk parts." },
  { prop: "size", type: '"2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "display" | "inherit"', default: '"md"', description: "Size from the type-scale tokens, with matching line height and tracking. \"inherit\" keeps the parent's size, for inline text." },
  { prop: "variant", type: '"body" | "heading" | "overline"', default: '"body"', description: "Role preset. heading: semibold with tight tracking. overline: a small mono, uppercase, muted label." },
  { prop: "weight", type: '"normal" | "medium" | "semibold"', description: "Font weight. Overrides the variant's." },
  { prop: "font", type: '"sans" | "mono"', description: "Font family." },
  { prop: "leading", type: '"none" | "tight" | "snug" | "normal" | "relaxed"', description: "Line height. Overrides the one the size sets." },
  { prop: "color", type: '"primary" | "secondary" | "muted" | "primary-muted" | "secondary-muted" | "info" | "warning" | "success" | "error"', description: "Intent color. Overrides the variant's. Without it, the text uses the foreground color." },
  { prop: "className", type: "string", description: "Classes merged after the variants, so they can extend or override any base style." },
]
