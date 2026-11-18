"use client"

import { useMemo } from "react"
import { Collapsible } from "@ui-sdk/react/collapsible"

import { cn } from "@/lib/cn"

import { FrameContext } from "./frame.constants"
import type { FrameProps } from "./frame.types"
import {
  frameClasses,
  frameCollapsibleClasses,
  frameColorClasses,
  frameCornerClasses,
  frameCorners,
  frameCornerSizeClasses,
} from "./frame.variants"

export function Frame({
  className,
  size = "md",
  color = "primary",
  collapsible = false,
  open,
  defaultOpen = true,
  onOpenChange,
  children,
  ...props
}: FrameProps) {
  const context = useMemo(() => ({ size, collapsible }), [size, collapsible])

  // The frame owns its element: ui-sdk keeps its own data-slot on its parts, so the Collapsible
  // sits inside as a layout-free box that only carries the open state for the parts below it.
  return (
    <FrameContext value={context}>
      <div data-slot="frame" data-size={size} data-color={color} className={cn(frameClasses, frameColorClasses[color], className)} {...props}>
        {frameCorners.map((corner) => (
          <span key={corner} aria-hidden="true" data-slot="frame-corner" className={cn(frameCornerClasses[corner], frameCornerSizeClasses[size])} />
        ))}
        {collapsible ? (
          <Collapsible
            open={open}
            defaultOpen={open === undefined ? defaultOpen : undefined}
            onOpenChange={onOpenChange}
            className={frameCollapsibleClasses}
          >
            {children}
          </Collapsible>
        ) : (
          children
        )}
      </div>
    </FrameContext>
  )
}
