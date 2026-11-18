"use client"

import { use } from "react"
import { MenuItem, MenuItemIcon } from "@ui-sdk/react/menu"

import { cn } from "@/lib/cn"

import { FloatingToolbarMenuContentContext } from "./floating-toolbar.constants"
import type { FloatingToolbarMenuItemProps } from "./floating-toolbar.types"
import {
  floatingToolbarItemNumberClasses,
  floatingToolbarMenuItemClasses,
  floatingToolbarMenuItemIconClasses,
  floatingToolbarMenuItemLabelClasses,
} from "./floating-toolbar.variants"

export function FloatingToolbarMenuItem({ className, icon, children, ...props }: FloatingToolbarMenuItemProps) {
  const { numbering, level } = use(FloatingToolbarMenuContentContext)

  return (
    <MenuItem className={cn(floatingToolbarMenuItemClasses, floatingToolbarItemNumberClasses[level][numbering], className)} {...props}>
      {icon && <MenuItemIcon className={floatingToolbarMenuItemIconClasses}>{icon}</MenuItemIcon>}
      <span className={floatingToolbarMenuItemLabelClasses}>{children}</span>
    </MenuItem>
  )
}
