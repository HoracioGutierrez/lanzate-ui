import { renderElement } from "@ui-sdk/react/primitive"

import { cn } from "@/lib/cn"

import type { TextProps } from "./text.types"
import { textVariants } from "./text.variants"

export function Text({ size, color, className, render, ...props }: TextProps) {
  return renderElement(
    "p",
    {
      ...props,
      "data-slot": "text",
      "data-size": size,
      "data-color": color,
      className: cn(textVariants({ size, color, className })),
    },
    render
  )
}
