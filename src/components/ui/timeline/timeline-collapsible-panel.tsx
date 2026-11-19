"use client"

import { CollapsiblePanel } from "@ui-sdk/react/collapsible"

import { cn } from "@/lib/cn"

import type { TimelineCollapsiblePanelProps } from "./timeline.types"
import { timelineCollapsibleContentClasses, timelineCollapsiblePanelClasses } from "./timeline.variants"

// Padding sits on an inner box so the panel's measured height animates to exactly zero.
export function TimelineCollapsiblePanel({ className, children, ...props }: TimelineCollapsiblePanelProps) {
  return (
    <CollapsiblePanel className={timelineCollapsiblePanelClasses} {...props}>
      <div data-slot="timeline-collapsible-content" className={cn(timelineCollapsibleContentClasses, className)}>
        {children}
      </div>
    </CollapsiblePanel>
  )
}
