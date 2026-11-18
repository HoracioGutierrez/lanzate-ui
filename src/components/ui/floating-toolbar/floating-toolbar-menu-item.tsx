"use client"

import { MenuItem, MenuItemIcon } from "@ui-sdk/react/menu"

import { cn } from "@/lib/cn"

import type { FloatingToolbarMenuItemProps } from "./floating-toolbar.types"
import { floatingToolbarMenuItemClasses, floatingToolbarMenuItemIconClasses } from "./floating-toolbar.variants"

export function FloatingToolbarMenuItem({ className, icon, children, ...props }: FloatingToolbarMenuItemProps) {
  return (
    <MenuItem className={cn(floatingToolbarMenuItemClasses, className)} {...props}>
      {icon && <MenuItemIcon className={floatingToolbarMenuItemIconClasses}>{icon}</MenuItemIcon>}
      {children}
    </MenuItem>
  )
}
