"use client"

import { Collapsible } from "@ui-sdk/react/collapsible"

import { cn } from "@/lib/cn"

import type { TimelineCollapsibleProps } from "./timeline.types"
import { timelineCollapsibleClasses } from "./timeline.variants"

export function TimelineCollapsible({ className, ...props }: TimelineCollapsibleProps) {
  return <Collapsible className={cn(timelineCollapsibleClasses, className)} {...props} />
}
