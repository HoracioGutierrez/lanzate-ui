"use client"

import { use } from "react"
import { TimelineItem as TimelineItemPart } from "@ui-sdk/react/timeline"

import { cn } from "@/lib/cn"

import { TimelineContext } from "./timeline.constants"
import type { TimelineItemProps } from "./timeline.types"
import { timelineColorClasses, timelineItemClasses, timelineStatusColors } from "./timeline.variants"

export function TimelineItem({ color, status, className, ...props }: TimelineItemProps) {
  const { variant } = use(TimelineContext)
  const resolved = color ?? (status ? timelineStatusColors[status] : "primary")
  // A failed event happened, so ui-sdk sees it as complete; data-status keeps the difference.
  return (
    <TimelineItemPart
      status={status === "failed" ? "complete" : status}
      data-status={status}
      data-color={resolved}
      className={cn(timelineItemClasses[variant], timelineColorClasses[resolved], className)}
      {...props}
    />
  )
}
