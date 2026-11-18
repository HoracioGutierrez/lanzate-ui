import type { ComponentProps, ReactNode } from "react"
import type { Button as ButtonPart } from "@ui-sdk/react/button"

import type { IntentColor, TextSize } from "@/lib/tokens.types"

/** Every intent color defined in the tokens. */
export type ButtonColor = IntentColor

/** `subtle` is neutral and ignores `color`. */
export type ButtonVariant = "solid" | "outline" | "ghost" | "soft" | "dashed" | "subtle" | "surface"

/** Depth treatment. One at a time: they all set the shadow. */
export type ButtonEffect = "none" | "elevated" | "glow"

export type ButtonPadding = "none" | "xs" | "sm" | "base" | "md" | "lg" | "xl"

export type ButtonRadius = "none" | "sm" | "md" | "lg" | "xl" | "full"

/** The type scale from the tokens, minus sizes too small for a control and the site-only hero size. */
export type ButtonTextSize = Exclude<TextSize, "3xs" | "2xs" | "hero">

export type ButtonIconSize = "xs" | "sm" | "base" | "md" | "lg" | "xl"

/** Behavior below the `sm` breakpoint. */
export type ButtonMobile = "only-icon" | "full-width" | "hidden"

export type ButtonProps = {
  color?: ButtonColor
  variant?: ButtonVariant
  effect?: ButtonEffect
  padding?: ButtonPadding
  radius?: ButtonRadius
  textSize?: ButtonTextSize
  iconSize?: ButtonIconSize
  mobile?: ButtonMobile
  /** Renders an icon-only, square button. Name it with `tooltip` or `aria-label`. */
  icon?: ReactNode
  startIcon?: ReactNode
  endIcon?: ReactNode
  iconClassName?: string
  textClassName?: string
  /** Disables the button, marks it busy and shows a spinner. */
  isLoading?: boolean
  /** Replaces the label while loading. */
  loadingText?: string
  /** Wraps the button in a Tooltip. Keeps a disabled button focusable so the tooltip stays reachable. */
  tooltip?: ReactNode
  /** Scales down slightly on press. Defaults to true. */
  tapAnimation?: boolean
  className?: string
} & Omit<ComponentProps<typeof ButtonPart>, "color" | "className">
