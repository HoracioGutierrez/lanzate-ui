"use client"

import { use } from "react"
import { CollapsiblePanel } from "@ui-sdk/react/collapsible"

import { cn } from "@/lib/cn"

import { FrameContext } from "./frame.constants"
import type { FrameContentProps } from "./frame.types"
import { frameContentPaddingClasses, frameContentPanelClasses } from "./frame.variants"

export function FrameContent({ className, keepMounted, hiddenUntilFound, children, ...props }: FrameContentProps) {
  const { size, collapsible } = use(FrameContext)
  // Padding sits on an inner box so the panel's measured height animates to exactly zero.
  const inner = <div className={cn(frameContentPaddingClasses[size], className)}>{children}</div>

  if (!collapsible) {
    return (
      <div data-slot="frame-content" {...props}>
        {inner}
      </div>
    )
  }

  return (
    <CollapsiblePanel
      data-slot="frame-content"
      keepMounted={keepMounted}
      hiddenUntilFound={hiddenUntilFound}
      className={frameContentPanelClasses}
      {...props}
    >
      {inner}
    </CollapsiblePanel>
  )
}
