"use client"

import { TimelineDescription as TimelineDescriptionPart } from "@ui-sdk/react/timeline"

import { Text } from "@/components/ui/text/text"
import { cn } from "@/lib/cn"

import type { TimelineDescriptionProps } from "./timeline.types"
import { timelineDescriptionClasses } from "./timeline.variants"

export function TimelineDescription({ className, children, ...props }: TimelineDescriptionProps) {
  return (
    <TimelineDescriptionPart className={cn(timelineDescriptionClasses, className)} {...props}>
      <Text render={<span />} size="sm" color="muted">
        {children}
      </Text>
    </TimelineDescriptionPart>
  )
}
