import { renderElement } from "@ui-sdk/react/primitive"

import { cn } from "@/lib/cn"

import type { TimelineStackItemProps } from "./timeline.types"
import { timelineColorClasses, timelineStackItemClasses, timelineStatusColors } from "./timeline.variants"

export function TimelineStackItem({ color, status, shape = "circle", className, render, ...props }: TimelineStackItemProps) {
  const resolved = color ?? (status ? timelineStatusColors[status] : "primary")
  return renderElement(
    "span",
    {
      ...props,
      "data-slot": "timeline-stack-item",
      "data-color": resolved,
      "data-status": status,
      className: cn(timelineStackItemClasses(shape), timelineColorClasses[resolved], className),
    },
    render
  )
}
