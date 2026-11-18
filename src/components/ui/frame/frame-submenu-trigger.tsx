"use client"

import { ChevronRight } from "lucide-react"
import { MenuItemIcon, MenuSubTrigger } from "@ui-sdk/react/menu"

import { cn } from "@/lib/cn"

import type { FrameSubmenuTriggerProps } from "./frame.types"
import {
  frameMenuItemClasses,
  frameMenuItemIconClasses,
  frameMenuItemLabelClasses,
  frameSubmenuChevronClasses,
} from "./frame.variants"

export function FrameSubmenuTrigger({ className, icon, children, ...props }: FrameSubmenuTriggerProps) {
  return (
    <MenuSubTrigger className={cn(frameMenuItemClasses, className)} {...props}>
      {icon && <MenuItemIcon className={frameMenuItemIconClasses}>{icon}</MenuItemIcon>}
      <span className={frameMenuItemLabelClasses}>{children}</span>
      <ChevronRight aria-hidden="true" className={frameSubmenuChevronClasses} />
    </MenuSubTrigger>
  )
}
