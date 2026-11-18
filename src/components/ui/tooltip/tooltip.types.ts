import type { ComponentProps, ReactNode } from "react"
import type { Tooltip as TooltipRoot, TooltipContent as TooltipContentPart } from "@ui-sdk/react/tooltip"

export type TooltipProps = ComponentProps<typeof TooltipRoot>

export type TooltipContentProps = Omit<ComponentProps<typeof TooltipContentPart>, "className" | "children"> & {
  className?: string
  children?: ReactNode
  /** Draws an arrow pointing at the trigger. Defaults to true. */
  arrow?: boolean
}
