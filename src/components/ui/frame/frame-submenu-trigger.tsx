"use client"

import { ChevronRight } from "lucide-react"
import { MenuItemIcon, MenuSubTrigger } from "@ui-sdk/react/menu"

// Import other registry components by exact file, not their folder's index.ts.
import { Text } from "@/components/ui/text/text"
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
      <Text render={<span />} size="sm" color="inherit" className={frameMenuItemLabelClasses}>
        {children}
      </Text>
      <ChevronRight aria-hidden="true" className={frameSubmenuChevronClasses} />
    </MenuSubTrigger>
  )
}
