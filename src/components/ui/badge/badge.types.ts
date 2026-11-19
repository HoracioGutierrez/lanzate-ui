import type { ReactNode } from "react"
import type { PartProps } from "@ui-sdk/react/primitive"

import type { TooltipContentProps, TooltipProps } from "@/components/ui/tooltip/tooltip.types"
import type { IntentColor } from "@/lib/tokens.types"

/** Every intent color defined in the tokens. */
export type BadgeColor = IntentColor

/** `surface` is the neutral card pill (border, card fill, soft shadow); `color` only tints its text. */
export type BadgeVariant = "solid" | "soft" | "outline" | "surface"

/** `BadgeTag` has no `surface`: it's the colored chip inside one. */
export type BadgeTagVariant = Exclude<BadgeVariant, "surface">

/** `sm`: a compact chip, like a "New" next to a nav item. `md`: a pill with room for a tag, text and an icon. */
export type BadgeSize = "sm" | "md"

export type BadgeRadius = "none" | "sm" | "md" | "full"

export type BadgeFont = "sans" | "mono"

/** The tooltip settings a badge passes through. For anything else, compose `Tooltip` and `TooltipTrigger` yourself. */
export type BadgeTooltipOptions = Pick<TooltipProps, "delay" | "toggleable" | "type"> &
  Pick<TooltipContentProps, "side" | "align" | "sideOffset" | "arrow" | "className">

export type BadgeProps = {
  color?: BadgeColor
  variant?: BadgeVariant
  size?: BadgeSize
  radius?: BadgeRadius
  font?: BadgeFont
  /**
   * Wraps the badge in a Tooltip. A badge without `render` becomes a focusable button, and the
   * tooltip opens on press too (`toggleable`), so keyboard and touch reach it.
   */
  tooltip?: ReactNode
  tooltipOptions?: BadgeTooltipOptions
  className?: string
} & Omit<PartProps<"span">, "color" | "className">

export type BadgeTagProps = {
  /** Independent of the Badge's color. */
  color?: BadgeColor
  variant?: BadgeTagVariant
  className?: string
} & Omit<PartProps<"span">, "color" | "className">

export type BadgeDotProps = {
  color?: BadgeColor
  /** Pulses a ring around the dot, for live states. Off when the person prefers reduced motion. */
  pulse?: boolean
  className?: string
} & Omit<PartProps<"span">, "color" | "className" | "children">
