"use client"

import { TimelineTitle as TimelineTitlePart } from "@ui-sdk/react/timeline"

// Import other registry components by exact file, not their folder's index.ts.
import { Text } from "@/components/ui/text/text"
import { cn } from "@/lib/cn"

import type { TimelineTitleProps } from "./timeline.types"
import { timelineTitleClasses } from "./timeline.variants"

// Text goes inside rather than as `render`: Text writes its own data-slot, and the part must keep timeline-title.
export function TimelineTitle({ className, children, ...props }: TimelineTitleProps) {
  return (
    <TimelineTitlePart className={cn(timelineTitleClasses, className)} {...props}>
      <Text render={<span />} size="sm" weight="medium" color="inherit">
        {children}
      </Text>
    </TimelineTitlePart>
  )
}
