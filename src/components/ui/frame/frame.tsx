"use client"

import { useMemo } from "react"
import { Collapsible } from "@ui-sdk/react/collapsible"

import { cn } from "@/lib/cn"

import { FrameContext } from "./frame.constants"
import type { FrameProps } from "./frame.types"
import { frameClasses, frameCornerClasses, frameCorners, frameCornerSizeClasses } from "./frame.variants"

export function Frame({
  className,
  size = "md",
  collapsible = false,
  open,
  defaultOpen = true,
  onOpenChange,
  children,
  ...props
}: FrameProps) {
  const context = useMemo(() => ({ size, collapsible }), [size, collapsible])
  const corners = frameCorners.map((corner) => (
    <span key={corner} aria-hidden="true" data-slot="frame-corner" className={cn(frameCornerClasses[corner], frameCornerSizeClasses[size])} />
  ))
  const shared = { "data-size": size, className: cn(frameClasses, className), ...props }

  return (
    <FrameContext value={context}>
      {collapsible ? (
        <Collapsible open={open} defaultOpen={open === undefined ? defaultOpen : undefined} onOpenChange={onOpenChange} {...shared} data-slot="frame">
          {corners}
          {children}
        </Collapsible>
      ) : (
        <div {...shared} data-slot="frame">
          {corners}
          {children}
        </div>
      )}
    </FrameContext>
  )
}
