"use client"

import { MenuItem, MenuItemIcon } from "@ui-sdk/react/menu"

// Import other registry components by exact file, not their folder's index.ts.
import { Text } from "@/components/ui/text/text"
import { cn } from "@/lib/cn"

import type { FrameMenuItemProps } from "./frame.types"
import { frameMenuItemClasses, frameMenuItemIconClasses, frameMenuItemLabelClasses } from "./frame.variants"

export function FrameMenuItem({ className, icon, children, ...props }: FrameMenuItemProps) {
  return (
    <MenuItem className={cn(frameMenuItemClasses, className)} {...props}>
      {icon && <MenuItemIcon className={frameMenuItemIconClasses}>{icon}</MenuItemIcon>}
      {/* `inherit`: the item colors its own states (highlighted, destructive). */}
      <Text render={<span />} size="sm" color="inherit" className={frameMenuItemLabelClasses}>
        {children}
      </Text>
    </MenuItem>
  )
}
