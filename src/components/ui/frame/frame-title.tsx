"use client"

import { use } from "react"
import { ChevronDown } from "lucide-react"
import { CollapsibleTrigger } from "@ui-sdk/react/collapsible"

// Import other registry components by exact file, not their folder's index.ts.
import { Text } from "@/components/ui/text/text"
import { cn } from "@/lib/cn"

import { FrameContext } from "./frame.constants"
import type { FrameTitleProps } from "./frame.types"
import { frameTitleChevronClasses, frameTitleClasses, frameTitleLabelClasses, frameTitleTriggerClasses } from "./frame.variants"

export function FrameTitle({ className, children, ...props }: FrameTitleProps) {
  const { collapsible } = use(FrameContext)

  // Only a collapsible frame gets a button: a static title must not look pressable.
  // The button keeps ui-sdk's data-slot (collapsible-trigger); its behavior reads it.
  // Text's overline sets the type; `inherit` keeps the title's own color and its hover.
  const label = (
    <Text render={<span />} variant="overline" size="xs" color="inherit" className={frameTitleLabelClasses}>
      {children}
    </Text>
  )

  if (!collapsible) {
    return (
      <div data-slot="frame-title" className={cn(frameTitleClasses, className)}>
        {label}
      </div>
    )
  }

  return (
    <CollapsibleTrigger className={cn(frameTitleClasses, frameTitleTriggerClasses, className)} {...props}>
      {label}
      <ChevronDown aria-hidden="true" className={frameTitleChevronClasses} />
    </CollapsibleTrigger>
  )
}
