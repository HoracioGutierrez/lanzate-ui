"use client"

import { use } from "react"
import { TimelineTitle as TimelineTitlePart } from "@ui-sdk/react/timeline"

// Import other registry components by exact file, not their folder's index.ts.
import { Text } from "@/components/ui/text/text"
import { cn } from "@/lib/cn"

import { TimelineContext } from "./timeline.constants"
import type { TimelineTitleProps } from "./timeline.types"
import { timelineTitleClasses } from "./timeline.variants"

// Text goes inside rather than as `render`: Text writes its own data-slot, and the part must keep timeline-title.
// In a tile the title is a label, like Frame's: Text's mono overline, in the status color.
export function TimelineTitle({ className, children, ...props }: TimelineTitleProps) {
  const { variant } = use(TimelineContext)
  return (
    <TimelineTitlePart className={cn(timelineTitleClasses, className)} {...props}>
      {variant === "tiles" ? (
        <Text render={<span />} variant="overline" size="2xs" color="inherit">
          {children}
        </Text>
      ) : (
        <Text render={<span />} size="sm" weight="medium" color="inherit">
          {children}
        </Text>
      )}
    </TimelineTitlePart>
  )
}
