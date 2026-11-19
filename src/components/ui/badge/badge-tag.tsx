import { renderElement } from "@ui-sdk/react/primitive"

import { cn } from "@/lib/cn"

import type { BadgeTagProps } from "./badge.types"
import { badgeTagVariants } from "./badge.variants"

export function BadgeTag({ color = "primary", variant = "solid", className, render, ...props }: BadgeTagProps) {
  return renderElement(
    "span",
    {
      ...props,
      "data-slot": "badge-tag",
      "data-color": color,
      "data-variant": variant,
      className: cn(badgeTagVariants({ color, variant }), className),
    },
    render
  )
}
