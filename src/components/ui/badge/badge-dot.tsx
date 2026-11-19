import { renderElement } from "@ui-sdk/react/primitive"

import { cn } from "@/lib/cn"

import type { BadgeDotProps } from "./badge.types"
import { badgeDotVariants } from "./badge.variants"

export function BadgeDot({ color = "primary", pulse = false, className, render, ...props }: BadgeDotProps) {
  return renderElement(
    "span",
    {
      "aria-hidden": "true",
      ...props,
      "data-slot": "badge-dot",
      "data-color": color,
      "data-pulse": pulse || undefined,
      className: cn(badgeDotVariants({ color, pulse }), className),
    },
    render
  )
}
