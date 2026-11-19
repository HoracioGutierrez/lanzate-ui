"use client"

import { use } from "react"
import { TimelineDescription as TimelineDescriptionPart } from "@ui-sdk/react/timeline"

import { Text } from "@/components/ui/text/text"
import { cn } from "@/lib/cn"

import { TimelineContext } from "./timeline.constants"
import type { TimelineDescriptionProps } from "./timeline.types"
import { timelineDescriptionClasses } from "./timeline.variants"

// In a tile the description is the value under the overline label, so it reads at full contrast.
export function TimelineDescription({ className, children, ...props }: TimelineDescriptionProps) {
  const { variant } = use(TimelineContext)
  return (
    <TimelineDescriptionPart className={cn(timelineDescriptionClasses, className)} {...props}>
      {variant === "tiles" ? (
        <Text render={<span />} size="sm" weight="medium">
          {children}
        </Text>
      ) : (
        <Text render={<span />} size="sm" color="muted">
          {children}
        </Text>
      )}
    </TimelineDescriptionPart>
  )
}
