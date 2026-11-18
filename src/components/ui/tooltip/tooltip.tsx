"use client"

import { Tooltip as TooltipRoot } from "@ui-sdk/react/tooltip"

import type { TooltipProps } from "./tooltip.types"

export function Tooltip({ delay = 0, ...props }: TooltipProps) {
  return <TooltipRoot delay={delay} {...props} />
}
