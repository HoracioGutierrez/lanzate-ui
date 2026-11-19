"use client"

import { TimelineConnector as TimelineConnectorPart } from "@ui-sdk/react/timeline"

import { cn } from "@/lib/cn"

import type { TimelineConnectorProps } from "./timeline.types"
import { timelineConnectorClasses } from "./timeline.variants"

export function TimelineConnector({ className, ...props }: TimelineConnectorProps) {
  return <TimelineConnectorPart className={cn(timelineConnectorClasses, className)} {...props} />
}
