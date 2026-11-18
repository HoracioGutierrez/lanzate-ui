"use client"

import { use, useMemo } from "react"
import { MenuContent } from "@ui-sdk/react/menu"

import { cn } from "@/lib/cn"

import { FloatingToolbarContext, FloatingToolbarMenuContentContext } from "./floating-toolbar.constants"
import type { FloatingToolbarMenuContentProps } from "./floating-toolbar.types"
import { floatingToolbarMenuContentClasses, floatingToolbarPanelCounterClasses } from "./floating-toolbar.variants"

export function FloatingToolbarMenuContent({
  className,
  side,
  numbering = "none",
  sideOffset = 10,
  collisionPadding = 12,
  ...props
}: FloatingToolbarMenuContentProps) {
  const { placement } = use(FloatingToolbarContext)
  const resolvedSide = side ?? (placement === "top" ? "bottom" : "top")
  const context = useMemo(() => ({ side: resolvedSide, numbering, level: 1 as const }), [resolvedSide, numbering])

  return (
    <FloatingToolbarMenuContentContext value={context}>
      <MenuContent
        side={resolvedSide}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        data-numbering={numbering}
        className={cn(floatingToolbarMenuContentClasses, floatingToolbarPanelCounterClasses[1], className)}
        {...props}
      />
    </FloatingToolbarMenuContentContext>
  )
}
