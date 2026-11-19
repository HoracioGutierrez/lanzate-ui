"use client"

import { TimelineTime as TimelineTimePart } from "@ui-sdk/react/timeline"

import { Text } from "@/components/ui/text/text"
import { cn } from "@/lib/cn"

import type { TimelineTimeProps } from "./timeline.types"
import { timelineTimeClasses } from "./timeline.variants"

export function TimelineTime({ className, children, ...props }: TimelineTimeProps) {
  return (
    <TimelineTimePart className={cn(timelineTimeClasses, className)} {...props}>
      <Text render={<span />} size="xs" color="muted">
        {children}
      </Text>
    </TimelineTimePart>
  )
}
