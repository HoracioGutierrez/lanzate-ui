"use client"

import { use } from "react"
import { TimelineTime as TimelineTimePart } from "@ui-sdk/react/timeline"

import { Text } from "@/components/ui/text/text"
import { cn } from "@/lib/cn"

import { TimelineContext } from "./timeline.constants"
import type { TimelineTimeProps } from "./timeline.types"
import { timelineTimeClasses } from "./timeline.variants"

// The time reads like a readout: mono, and in a tile at the foot of the card.
export function TimelineTime({ className, children, ...props }: TimelineTimeProps) {
  const { variant } = use(TimelineContext)
  return (
    <TimelineTimePart className={cn(timelineTimeClasses, className)} {...props}>
      <Text render={<span />} size={variant === "tiles" ? "2xs" : "xs"} font="mono" color="muted">
        {children}
      </Text>
    </TimelineTimePart>
  )
}
