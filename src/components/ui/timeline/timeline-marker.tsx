"use client"

import { use } from "react"
import { TimelineMarker as TimelineMarkerPart } from "@ui-sdk/react/timeline"
import { TooltipTrigger } from "@ui-sdk/react/tooltip"

// Import other registry components by exact file, not their folder's index.ts.
import { Tooltip } from "@/components/ui/tooltip/tooltip"
import { TooltipContent } from "@/components/ui/tooltip/tooltip-content"
import { cn } from "@/lib/cn"

import { TimelineContext } from "./timeline.constants"
import type { TimelineMarkerProps } from "./timeline.types"
import {
  timelineMarkerClasses,
  timelineMarkerPositionClasses,
  timelineMarkerRadiusClasses,
  timelineMarkerTriggerClasses,
  timelineTileMarkerClasses,
} from "./timeline.variants"

export function TimelineMarker({
  shape = "circle",
  variant,
  pulse = false,
  tooltip,
  tooltipLabel,
  tooltipOptions,
  className,
  ...props
}: TimelineMarkerProps) {
  const { variant: layout } = use(TimelineContext)
  // In a line the button is placed and the marker sits in it; in a tile the button covers the card
  // and the marker keeps its corner.
  const position = tooltip == null || layout === "tiles" ? timelineMarkerPositionClasses[layout] : "relative"
  const look = layout === "tiles" ? timelineTileMarkerClasses(pulse) : timelineMarkerClasses(shape, variant, pulse)
  const classes = cn(position, look, className)

  if (tooltip == null) {
    return <TimelineMarkerPart data-shape={shape} className={classes} {...props} />
  }

  const { delay, toggleable, className: contentClassName, ...contentProps } = tooltipOptions ?? {}

  // ui-sdk hides the marker from screen readers, so a focusable button wraps it to carry the tooltip.
  // Without tooltipLabel the tooltip names the button; type="label" makes the server HTML say so too.
  return (
    <Tooltip delay={delay} toggleable={toggleable ?? true} type={tooltipLabel ? "description" : "label"}>
      <TooltipTrigger
        render={<button type="button" aria-label={tooltipLabel} />}
        data-shape={shape}
        className={cn(timelineMarkerTriggerClasses[layout], layout === "line" && timelineMarkerRadiusClasses[shape])}
      >
        <TimelineMarkerPart data-shape={shape} className={classes} {...props} />
      </TooltipTrigger>
      <TooltipContent {...contentProps} className={contentClassName}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )
}
