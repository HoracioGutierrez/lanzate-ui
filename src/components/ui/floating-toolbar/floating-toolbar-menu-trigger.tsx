"use client"

import { MenuTrigger } from "@ui-sdk/react/menu"
import { ToolbarButton } from "@ui-sdk/react/toolbar"

import { cn } from "@/lib/cn"

import type { FloatingToolbarMenuTriggerProps } from "./floating-toolbar.types"
import { floatingToolbarButtonClasses } from "./floating-toolbar.variants"

export function FloatingToolbarMenuTrigger({ className, label, children, ...props }: FloatingToolbarMenuTriggerProps) {
  return (
    <ToolbarButton render={<MenuTrigger />} aria-label={label} className={cn(floatingToolbarButtonClasses, className)} {...props}>
      <span aria-hidden="true" className="contents">
        {children}
      </span>
    </ToolbarButton>
  )
}
