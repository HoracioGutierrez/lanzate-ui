"use client"

import {
  ScrollArea as ScrollAreaRoot,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaViewport,
} from "@ui-sdk/react/scroll-area"

import { cn } from "@/lib/utils"

import { ScrollBar } from "./scroll-bar"
import type { ScrollAreaProps } from "./scroll-area.types"
import { scrollAreaViewportClasses } from "./scroll-area.variants"

export function ScrollArea({ className, children, orientation = "vertical", viewportProps, ...props }: ScrollAreaProps) {
  const { className: viewportClassName, ...restViewportProps } = viewportProps ?? {}

  return (
    <ScrollAreaRoot className={cn("relative", className)} {...props}>
      <ScrollAreaViewport
        className={cn(scrollAreaViewportClasses, typeof viewportClassName === "string" ? viewportClassName : undefined)}
        {...restViewportProps}
      >
        <ScrollAreaContent>{children}</ScrollAreaContent>
      </ScrollAreaViewport>
      {orientation !== "horizontal" && <ScrollBar orientation="vertical" />}
      {orientation !== "vertical" && <ScrollBar orientation="horizontal" />}
      {orientation === "both" && <ScrollAreaCorner />}
    </ScrollAreaRoot>
  )
}
