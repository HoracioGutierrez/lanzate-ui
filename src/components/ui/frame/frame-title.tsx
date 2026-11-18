"use client"

import { use } from "react"
import { ChevronDown } from "lucide-react"
import { CollapsibleTrigger } from "@ui-sdk/react/collapsible"

import { cn } from "@/lib/cn"

import { FrameContext } from "./frame.constants"
import type { FrameTitleProps } from "./frame.types"
import { frameTitleChevronClasses, frameTitleClasses, frameTitleLabelClasses, frameTitleTriggerClasses } from "./frame.variants"

export function FrameTitle({ className, children, ...props }: FrameTitleProps) {
  const { collapsible } = use(FrameContext)

  // Only a collapsible frame gets a button: a static title must not look pressable.
  // The button keeps ui-sdk's data-slot (collapsible-trigger); its behavior reads it.
  if (!collapsible) {
    return (
      <div data-slot="frame-title" className={cn(frameTitleClasses, className)}>
        <span className={frameTitleLabelClasses}>{children}</span>
      </div>
    )
  }

  return (
    <CollapsibleTrigger className={cn(frameTitleClasses, frameTitleTriggerClasses, className)} {...props}>
      <span className={frameTitleLabelClasses}>{children}</span>
      <ChevronDown aria-hidden="true" className={frameTitleChevronClasses} />
    </CollapsibleTrigger>
  )
}
