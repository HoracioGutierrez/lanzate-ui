"use client"

import { useMemo, useRef } from "react"
import { Toolbar } from "@ui-sdk/react/toolbar"

import { cn } from "@/lib/cn"

import { FloatingToolbarContext } from "./floating-toolbar.constants"
import type { FloatingToolbarProps } from "./floating-toolbar.types"
import {
  floatingToolbarClasses,
  floatingToolbarSentinelClasses,
  floatingToolbarSurfaceClasses,
  floatingToolbarWrapperClasses,
} from "./floating-toolbar.variants"
import { useScrollEdges } from "./use-scroll-edges"

export function FloatingToolbar({
  className,
  wrapperClassName,
  placement = "bottom",
  children,
  ...props
}: FloatingToolbarProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const startRef = useRef<HTMLSpanElement>(null)
  const endRef = useRef<HTMLSpanElement>(null)
  useScrollEdges(scrollerRef, startRef, endRef)
  const context = useMemo(() => ({ placement }), [placement])

  return (
    <FloatingToolbarContext value={context}>
      <div data-slot="floating-toolbar-wrapper" data-placement={placement} className={cn(floatingToolbarWrapperClasses[placement], wrapperClassName)}>
        <div data-slot="floating-toolbar-surface" className={cn(floatingToolbarSurfaceClasses, className)}>
          <Toolbar ref={scrollerRef} data-placement={placement} className={floatingToolbarClasses} {...props}>
            <span ref={startRef} aria-hidden="true" className={floatingToolbarSentinelClasses} />
            {children}
            <span ref={endRef} aria-hidden="true" className={floatingToolbarSentinelClasses} />
          </Toolbar>
        </div>
      </div>
    </FloatingToolbarContext>
  )
}
