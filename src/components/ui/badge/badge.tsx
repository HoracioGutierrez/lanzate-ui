import type { ReactElement } from "react"
import { renderElement } from "@ui-sdk/react/primitive"
import { TooltipTrigger } from "@ui-sdk/react/tooltip"

// Import other registry components by exact file, not their folder's index.ts:
// the shadcn CLI rewrites `@/components/ui/tooltip` to `<ui>/tooltip/tooltip`.
import { Tooltip } from "@/components/ui/tooltip/tooltip"
import { TooltipContent } from "@/components/ui/tooltip/tooltip-content"
import { cn } from "@/lib/cn"

import type { BadgeProps } from "./badge.types"
import { badgeVariants } from "./badge.variants"

export function Badge({
  color = "primary",
  variant = "soft",
  size = "md",
  radius = "full",
  font,
  tooltip,
  tooltipOptions,
  className,
  render,
  ...props
}: BadgeProps) {
  const badgeProps = {
    ...props,
    "data-slot": "badge",
    "data-color": color,
    "data-variant": variant,
    "data-size": size,
    "data-radius": radius,
    className: cn(badgeVariants({ color, variant, size, radius, font }), className),
  }

  if (tooltip == null) return renderElement("span", badgeProps, render)

  const { delay, toggleable, type, className: contentClassName, ...contentProps } = tooltipOptions ?? {}
  // renderElement types its result's props as unknown; TooltipTrigger's render wants a props record.
  const trigger = renderElement("button", render == null ? { type: "button", ...badgeProps } : badgeProps, render) as ReactElement<
    Record<string, unknown>
  >

  // A tooltip needs a focusable trigger: without `render` the badge becomes a button, and a press
  // toggles the tip so touch screens can show it. The badge element goes in as `render` so it keeps its data-slot.
  return (
    <Tooltip delay={delay} toggleable={toggleable ?? render == null} type={type}>
      <TooltipTrigger render={trigger} />
      <TooltipContent {...contentProps} className={contentClassName}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )
}
