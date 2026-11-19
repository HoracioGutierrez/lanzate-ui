import { renderElement } from "@ui-sdk/react/primitive"

import { cn } from "@/lib/cn"

import type { TimelineLeaderProps } from "./timeline.types"
import { timelineLeaderClasses } from "./timeline.variants"

export function TimelineLeader({ className, render, ...props }: TimelineLeaderProps) {
  return renderElement(
    "span",
    { "aria-hidden": "true", ...props, "data-slot": "timeline-leader", className: cn(timelineLeaderClasses, className) },
    render
  )
}
