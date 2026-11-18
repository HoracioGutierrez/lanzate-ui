"use client"

import { ScrollAreaScrollbar, ScrollAreaThumb } from "@ui-sdk/react/scroll-area"

import { cn } from "@/lib/utils"

import type { ScrollBarProps } from "./scroll-area.types"
import { scrollBarClasses, scrollBarThumbClasses } from "./scroll-area.variants"

export function ScrollBar({ className, orientation = "vertical", ...props }: ScrollBarProps) {
  return (
    <ScrollAreaScrollbar orientation={orientation} className={cn(scrollBarClasses, className)} {...props}>
      <ScrollAreaThumb className={scrollBarThumbClasses} />
    </ScrollAreaScrollbar>
  )
}
