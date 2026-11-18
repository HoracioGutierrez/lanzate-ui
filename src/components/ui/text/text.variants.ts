import { cva } from "class-variance-authority"

import type { TextColor, TextFont, TextLeading, TextSizeStep, TextVariant, TextWeight } from "./text.types"

const sizeClasses = {
  "2xs": "text-2xs leading-tight tracking-wide",
  xs: "text-xs leading-tight tracking-wide",
  sm: "text-sm leading-snug",
  md: "text-base leading-normal",
  lg: "text-lg leading-relaxed",
  xl: "text-xl leading-relaxed",
  "2xl": "text-2xl leading-snug tracking-tight",
  display: "text-display leading-tight tracking-tighter",
  inherit: "",
} satisfies Record<TextSizeStep, string>

const variantClasses = {
  body: "",
  heading: "font-heading font-semibold tracking-tight",
  overline: "font-mono uppercase tracking-wider text-muted-foreground",
} satisfies Record<TextVariant, string>

const weightClasses = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
} satisfies Record<TextWeight, string>

const fontClasses = {
  sans: "font-sans",
  mono: "font-mono",
} satisfies Record<TextFont, string>

const leadingClasses = {
  none: "leading-none",
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
} satisfies Record<TextLeading, string>

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

// Order matters: later groups win conflicts (cn runs tailwind-merge), so
// variant beats the size's tracking, and weight, font, leading and color beat the variant.
export const textVariants = cva("text-foreground", {
  variants: {
    size: sizeClasses,
    variant: variantClasses,
    weight: weightClasses,
    font: fontClasses,
    leading: leadingClasses,
    color: colorClasses,
  },
  defaultVariants: { size: "md", variant: "body" },
})
