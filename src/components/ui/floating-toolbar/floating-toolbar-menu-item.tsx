"use client"

import { use } from "react"
import { MenuItem, MenuItemIcon } from "@ui-sdk/react/menu"

// Import other registry components by exact file, not their folder's index.ts.
import { Text } from "@/components/ui/text/text"
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
      {/* `inherit`: the item colors its own states (highlighted, destructive). */}
      <Text render={<span />} size="sm" color="inherit" className={floatingToolbarMenuItemLabelClasses}>
        {children}
      </Text>
    </MenuItem>
  )
}
