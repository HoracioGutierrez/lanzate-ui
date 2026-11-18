import type { PartProps } from "@ui-sdk/react/primitive"

import type { IntentColor } from "@/lib/tokens.types"

/** Type scale steps. `md` is the body size (the `text-base` token). */
export type TextSizeStep = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "display"

/** Every intent color from the tokens, plus softer variants of primary and secondary. */
export type TextColor = IntentColor | "primary-muted" | "secondary-muted"

export type TextProps = {
  size?: TextSizeStep
  color?: TextColor
  className?: string
} & Omit<PartProps<"p">, "color" | "className">
