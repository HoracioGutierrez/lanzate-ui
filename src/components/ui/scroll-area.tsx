"use client"

import * as React from "react"
import {
  ScrollArea as ScrollAreaRoot,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@ui-sdk/react/scroll-area"

import { cn } from "@/lib/utils"

type ScrollAreaProps = Omit<React.ComponentProps<typeof ScrollAreaRoot>, "className"> & {
  className?: string
  orientation?: "vertical" | "horizontal" | "both"
  viewportProps?: React.ComponentProps<typeof ScrollAreaViewport>
}

function ScrollArea({
  className,
  children,
  orientation = "vertical",
  viewportProps,
  ...props
}: ScrollAreaProps) {
  const { className: viewportClassName, ...restViewportProps } = viewportProps ?? {}

  return (
    <ScrollAreaRoot className={cn("relative", className)} {...props}>
      <ScrollAreaViewport
        className={cn(
          "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
          typeof viewportClassName === "string" ? viewportClassName : undefined
        )}
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

type ScrollBarProps = Omit<React.ComponentProps<typeof ScrollAreaScrollbar>, "className"> & {
  className?: string
}

function ScrollBar({ className, orientation = "vertical", ...props }: ScrollBarProps) {
  return (
    <ScrollAreaScrollbar
      orientation={orientation}
      className={cn(
        "flex touch-none p-px opacity-0 transition-opacity duration-150 select-none data-visible:opacity-100 motion-reduce:transition-none",
        "data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent",
        "data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:border-l data-[orientation=vertical]:border-l-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
    </ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
export type { ScrollAreaProps, ScrollBarProps }
