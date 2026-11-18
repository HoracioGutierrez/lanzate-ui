import type { ApiRow } from "../types/docs.types"

export const textApi: ApiRow[] = [
  { prop: "render", type: "ReactElement | (props) => ReactElement", default: "<p />", description: "Element to render instead of <p>, like render={<h1 />}. Same render prop as ui-sdk parts." },
  { prop: "size", type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "display"', default: '"md"', description: "Fluid size from the type-scale tokens, with matching line height and tracking." },
  { prop: "color", type: '"primary" | "secondary" | "muted" | "primary-muted" | "secondary-muted" | "info" | "warning" | "success" | "error"', description: "Intent color. Without it, the text uses the foreground color." },
  { prop: "className", type: "string", description: "Classes merged after the variants, so they can extend or override any base style." },
]
