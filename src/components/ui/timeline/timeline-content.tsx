import { renderElement } from "@ui-sdk/react/primitive"

import { cn } from "@/lib/cn"

import type { TimelineContentProps } from "./timeline.types"
import { timelineContentClasses } from "./timeline.variants"

export function TimelineContent({ className, render, ...props }: TimelineContentProps) {
  return renderElement(
    "div",
    { ...props, "data-slot": "timeline-content", className: cn(timelineContentClasses, className) },
    render
  )
}
