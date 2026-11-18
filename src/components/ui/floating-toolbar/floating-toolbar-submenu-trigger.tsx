"use client"

import { ChevronRight } from "lucide-react"
import { MenuItemIcon, MenuSubTrigger } from "@ui-sdk/react/menu"

import { cn } from "@/lib/cn"

import type { FloatingToolbarSubmenuTriggerProps } from "./floating-toolbar.types"
import {
  floatingToolbarMenuItemClasses,
  floatingToolbarMenuItemIconClasses,
  floatingToolbarSubmenuChevronClasses,
} from "./floating-toolbar.variants"

export function FloatingToolbarSubmenuTrigger({ className, icon, children, ...props }: FloatingToolbarSubmenuTriggerProps) {
  return (
    <MenuSubTrigger className={cn(floatingToolbarMenuItemClasses, className)} {...props}>
      {icon && <MenuItemIcon className={floatingToolbarMenuItemIconClasses}>{icon}</MenuItemIcon>}
      {children}
      <ChevronRight aria-hidden="true" className={floatingToolbarSubmenuChevronClasses} />
    </MenuSubTrigger>
  )
}
