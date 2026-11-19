"use client"

import { CollapsibleTrigger } from "@ui-sdk/react/collapsible"

import { cn } from "@/lib/cn"

import type { TimelineCollapsibleTriggerProps } from "./timeline.types"
import { timelineCollapsibleTriggerClasses } from "./timeline.variants"

export function TimelineCollapsibleTrigger({ className, ...props }: TimelineCollapsibleTriggerProps) {
  return <CollapsibleTrigger className={cn(timelineCollapsibleTriggerClasses, className)} {...props} />
}
