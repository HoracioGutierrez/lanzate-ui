import { cva } from "class-variance-authority"

import type { TextColor, TextSizeStep } from "./text.types"

const sizeClasses = {
  xs: "text-xs leading-tight tracking-wide",
  sm: "text-sm leading-snug",
  md: "text-base leading-normal",
  lg: "text-lg leading-relaxed",
  xl: "text-xl leading-relaxed",
  "2xl": "text-2xl leading-snug tracking-tight",
  display: "text-display leading-tight tracking-tighter",
} satisfies Record<TextSizeStep, string>

const colorClasses = {
  primary: "text-primary",
  secondary: "text-secondary-foreground",
  muted: "text-muted-foreground",
  "primary-muted": "text-primary/60",
  "secondary-muted": "text-secondary-foreground/60",
  info: "text-info",
  warning: "text-warning",
  success: "text-success",
  error: "text-error",
} satisfies Record<TextColor, string>

export const textVariants = cva("text-foreground", {
  variants: { size: sizeClasses, color: colorClasses },
  defaultVariants: { size: "md" },
})
