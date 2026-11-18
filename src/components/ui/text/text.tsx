import { renderElement } from "@ui-sdk/react/primitive"

import { cn } from "@/lib/cn"

import type { TextProps } from "./text.types"
import { textVariants } from "./text.variants"

export function Text({ size, color, variant, weight, font, leading, className, render, ...props }: TextProps) {
  return renderElement(
    "p",
    {
      ...props,
      "data-slot": "text",
      "data-size": size,
      "data-color": color,
      "data-variant": variant,
      className: cn(textVariants({ size, color, variant, weight, font, leading, className })),
    },
    render
  )
}
