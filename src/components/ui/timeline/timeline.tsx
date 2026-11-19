"use client"

import { useMemo } from "react"
import { Timeline as TimelineRoot } from "@ui-sdk/react/timeline"

import { cn } from "@/lib/cn"

import { TimelineContext } from "./timeline.constants"
import type { TimelineProps } from "./timeline.types"
import { timelineClasses } from "./timeline.variants"

export function Timeline({ variant = "line", size = "md", appear = false, className, ...props }: TimelineProps) {
  const context = useMemo(() => ({ variant, size }), [variant, size])
  return (
    <TimelineContext value={context}>
      <TimelineRoot
        data-variant={variant}
        data-size={size}
        data-appear={appear || undefined}
        className={cn(timelineClasses(variant, size), className)}
        {...props}
      />
    </TimelineContext>
  )
}
