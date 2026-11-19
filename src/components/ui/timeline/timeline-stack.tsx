import { renderElement } from "@ui-sdk/react/primitive"

import { cn } from "@/lib/cn"

import type { TimelineStackProps } from "./timeline.types"
import { timelineStackClasses } from "./timeline.variants"

export function TimelineStack({ className, render, ...props }: TimelineStackProps) {
  return renderElement(
    "span",
    { "aria-hidden": "true", ...props, "data-slot": "timeline-stack", className: cn(timelineStackClasses, className) },
    render
  )
}
