"use client"

import { TooltipArrow, TooltipContent as TooltipContentPart } from "@ui-sdk/react/tooltip"

import { cn } from "@/lib/utils"

import type { TooltipContentProps } from "./tooltip.types"
import { tooltipArrowClasses, tooltipContentClasses } from "./tooltip.variants"

export function TooltipContent({ className, sideOffset = 6, arrow = true, children, ...props }: TooltipContentProps) {
  return (
    <TooltipContentPart sideOffset={sideOffset} className={cn(tooltipContentClasses, className)} {...props}>
      {children}
      {arrow && <TooltipArrow className={tooltipArrowClasses} />}
    </TooltipContentPart>
  )
}
