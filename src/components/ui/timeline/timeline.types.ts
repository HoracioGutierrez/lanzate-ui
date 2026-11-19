import type { ComponentProps, ReactNode } from "react"
import type { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@ui-sdk/react/collapsible"
import type { PartProps } from "@ui-sdk/react/primitive"
import type {
  Timeline as TimelineRoot,
  TimelineConnector as TimelineConnectorPart,
  TimelineDescription as TimelineDescriptionPart,
  TimelineItem as TimelineItemPart,
  TimelineMarker as TimelineMarkerPart,
  TimelineTime as TimelineTimePart,
  TimelineTitle as TimelineTitlePart,
} from "@ui-sdk/react/timeline"

import type { TooltipContentProps, TooltipProps } from "@/components/ui/tooltip/tooltip.types"
import type { IntentColor } from "@/lib/tokens.types"

/** Every intent color defined in the tokens. */
export type TimelineColor = IntentColor

/**
 * Where an event stands. `complete` happened and went well, `failed` happened with an error,
 * `current` is happening now, `upcoming` is still to come. Each has its own color.
 */
export type TimelineStatus = "complete" | "failed" | "current" | "upcoming"

/** `line`: markers joined by a line, content beside or under them. `tiles`: each event is a card with its content inside. */
export type TimelineVariant = "line" | "tiles"

/** `sm`: small dots or compact tiles. `md`: markers with room for an icon. `lg`: big markers or tall tiles. */
export type TimelineSize = "sm" | "md" | "lg"

/** `square` (the default) for the industrial look; `circle` for a softer one. */
export type TimelineMarkerShape = "circle" | "square"

/** `solid` fills the marker, `soft` tints it with a colored edge, `outline` draws only the edge. */
export type TimelineMarkerVariant = "solid" | "soft" | "outline"

export type TimelineContextValue = {
  variant: TimelineVariant
  size: TimelineSize
}

export type TimelineProps = Omit<ComponentProps<typeof TimelineRoot>, "className"> & {
  className?: string
  /** Defaults to "line". In a horizontal `tiles` timeline the cards share the row equally. */
  variant?: TimelineVariant
  /** Scales markers, connectors, tiles and gaps. Defaults to "md". */
  size?: TimelineSize
  /**
   * Staggers the events in on first paint, one after another. Inside a `TimelineCollapsiblePanel`
   * they stagger in every time it opens, whatever this is. Off under reduced motion.
   */
  appear?: boolean
}

export type TimelineItemProps = Omit<ComponentProps<typeof TimelineItemPart>, "className" | "color" | "status"> & {
  className?: string
  /**
   * Where the event stands. `current` sets `aria-current="step"` and takes the tab stop; `failed`
   * counts as done for ui-sdk (it happened) and shows as `data-status="failed"`.
   */
  status?: TimelineStatus
  /**
   * Overrides the status color. Defaults from `status`: `complete` success, `failed` error,
   * `current` warning, `upcoming` muted, none primary.
   */
  color?: TimelineColor
}
/** The tooltip settings a marker passes through. For anything else, compose `Tooltip` and `TooltipTrigger` yourself. */
export type TimelineTooltipOptions = Pick<TooltipProps, "delay" | "toggleable"> &
  Pick<TooltipContentProps, "side" | "align" | "sideOffset" | "arrow" | "className">

export type TimelineMarkerProps = Omit<ComponentProps<typeof TimelineMarkerPart>, "className" | "children"> & {
  className?: string
  /** An icon or a short label inside the marker. Decorative: say the status in the title too. */
  children?: ReactNode
  /** Defaults to "square", the edge of the registry's industrial look. */
  shape?: TimelineMarkerShape
  /** Defaults from the event's status: `complete` solid, `current` soft, `upcoming` outline, none solid. */
  variant?: TimelineMarkerVariant
  /** Frames the marker with brackets that pulse outward, for a live step. Off when the person prefers reduced motion. */
  pulse?: boolean
  /**
   * Extra info in a tooltip. The marker becomes a focusable button; Tab reaches it after its event,
   * and a press toggles the tip on touch screens.
   */
  tooltip?: ReactNode
  /**
   * Accessible name of the marker's button. Without it the tooltip names the button, so a
   * plain-text tooltip is enough; pass one when the tooltip is rich content.
   */
  tooltipLabel?: string
  tooltipOptions?: TimelineTooltipOptions
}

export type TimelineConnectorProps = Omit<ComponentProps<typeof TimelineConnectorPart>, "className"> & {
  className?: string
}

export type TimelineContentProps = {
  className?: string
} & Omit<PartProps<"div">, "className">

export type TimelineTitleProps = Omit<ComponentProps<typeof TimelineTitlePart>, "className" | "children"> & {
  className?: string
  children?: ReactNode
}

export type TimelineTimeProps = Omit<ComponentProps<typeof TimelineTimePart>, "className" | "children"> & {
  className?: string
  children?: ReactNode
}

export type TimelineDescriptionProps = Omit<ComponentProps<typeof TimelineDescriptionPart>, "className" | "children"> & {
  className?: string
  children?: ReactNode
}

export type TimelineCollapsibleProps = Omit<ComponentProps<typeof Collapsible>, "className"> & {
  className?: string
}

export type TimelineCollapsibleTriggerProps = Omit<ComponentProps<typeof CollapsibleTrigger>, "className"> & {
  className?: string
}

export type TimelineCollapsiblePanelProps = Omit<ComponentProps<typeof CollapsiblePanel>, "className" | "children"> & {
  /** Classes for the padded box inside the panel. */
  className?: string
  children?: ReactNode
}

export type TimelineStackProps = {
  className?: string
  /** `TimelineStackItem`s, in the same order as the events they summarize. */
  children?: ReactNode
} & Omit<PartProps<"span">, "className" | "children">

export type TimelineStackItemProps = {
  /** Defaults from `status`, like a `TimelineItem`. */
  color?: TimelineColor
  status?: TimelineStatus
  /** Defaults to "square", like the tiles it summarizes. */
  shape?: TimelineMarkerShape
  className?: string
} & Omit<PartProps<"span">, "className" | "color" | "children">

export type TimelineLeaderProps = {
  className?: string
} & Omit<PartProps<"span">, "className" | "children">
