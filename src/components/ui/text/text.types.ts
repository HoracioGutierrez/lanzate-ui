import type { PartProps } from "@ui-sdk/react/primitive"

import type { IntentColor } from "@/lib/tokens.types"

/** Type scale steps. `md` is the body size (the `text-base` token). `inherit` keeps the parent's size, for inline text. */
export type TextSizeStep = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "display" | "inherit"

/** Every intent color from the tokens, plus softer variants of primary and secondary. */
export type TextColor = IntentColor | "primary-muted" | "secondary-muted"

/** Role presets. `heading`: the heading font (`--font-heading`), semibold, tight tracking. `overline`: a small label in mono caps, muted. */
export type TextVariant = "body" | "heading" | "overline"

export type TextWeight = "normal" | "medium" | "semibold"

export type TextFont = "sans" | "mono"

/** Line height. Overrides the one each size sets. */
export type TextLeading = "none" | "tight" | "snug" | "normal" | "relaxed"

export type TextProps = {
  size?: TextSizeStep
  color?: TextColor
  variant?: TextVariant
  weight?: TextWeight
  font?: TextFont
  leading?: TextLeading
  className?: string
} & Omit<PartProps<"p">, "color" | "className">
