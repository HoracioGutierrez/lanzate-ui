"use client"

import { use, useMemo } from "react"
import { MenuContent } from "@ui-sdk/react/menu"

import { cn } from "@/lib/cn"

import { FloatingToolbarContext, FloatingToolbarMenuContentContext } from "./floating-toolbar.constants"
import type { FloatingToolbarMenuContentProps } from "./floating-toolbar.types"
import { floatingToolbarMenuContentClasses } from "./floating-toolbar.variants"

export function FloatingToolbarMenuContent({ className, side, sideOffset = 10, collisionPadding = 12, ...props }: FloatingToolbarMenuContentProps) {
  const { placement } = use(FloatingToolbarContext)
  const resolvedSide = side ?? (placement === "top" ? "bottom" : "top")
  const context = useMemo(() => ({ side: resolvedSide }), [resolvedSide])

  return (
    <FloatingToolbarMenuContentContext value={context}>
      <MenuContent
        side={resolvedSide}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(floatingToolbarMenuContentClasses, className)}
        {...props}
      />
    </FloatingToolbarMenuContentContext>
  )
}
