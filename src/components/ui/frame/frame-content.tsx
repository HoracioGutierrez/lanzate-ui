"use client"

import { use } from "react"
import { CollapsiblePanel } from "@ui-sdk/react/collapsible"

import { cn } from "@/lib/cn"

import { FrameContext } from "./frame.constants"
import type { FrameContentProps } from "./frame.types"
import { frameContentPaddingClasses, frameContentPanelClasses } from "./frame.variants"

export function FrameContent({ className, keepMounted, hiddenUntilFound, children, ...props }: FrameContentProps) {
  const { size, collapsible } = use(FrameContext)
  const box = cn(frameContentPaddingClasses[size], className)

  if (!collapsible) {
    return (
      <div data-slot="frame-content" className={box} {...props}>
        {children}
      </div>
    )
  }

  // Padding sits on an inner box so the panel's measured height animates to exactly zero.
  // The panel keeps ui-sdk's own data-slot; the inner box carries the frame's.
  return (
    <CollapsiblePanel
      keepMounted={keepMounted}
      hiddenUntilFound={hiddenUntilFound}
      className={frameContentPanelClasses}
      {...props}
    >
      <div data-slot="frame-content" className={box}>
        {children}
      </div>
    </CollapsiblePanel>
  )
}
