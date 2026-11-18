"use client"

import { MenuItem, MenuItemIcon } from "@ui-sdk/react/menu"

import { cn } from "@/lib/cn"

import type { FrameMenuItemProps } from "./frame.types"
import { frameMenuItemClasses, frameMenuItemIconClasses, frameMenuItemLabelClasses } from "./frame.variants"

export function FrameMenuItem({ className, icon, children, ...props }: FrameMenuItemProps) {
  return (
    <MenuItem className={cn(frameMenuItemClasses, className)} {...props}>
      {icon && <MenuItemIcon className={frameMenuItemIconClasses}>{icon}</MenuItemIcon>}
      <span className={frameMenuItemLabelClasses}>{children}</span>
    </MenuItem>
  )
}
