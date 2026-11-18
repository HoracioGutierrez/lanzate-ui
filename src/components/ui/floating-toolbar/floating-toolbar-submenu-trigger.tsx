"use client"

import { use } from "react"
import { ChevronRight } from "lucide-react"
import { MenuItemIcon, MenuSubTrigger } from "@ui-sdk/react/menu"

// Import other registry components by exact file, not their folder's index.ts.
import { Text } from "@/components/ui/text/text"
import { cn } from "@/lib/cn"

import { FloatingToolbarMenuContentContext } from "./floating-toolbar.constants"
import type { FloatingToolbarSubmenuTriggerProps } from "./floating-toolbar.types"
import {
  floatingToolbarItemNumberClasses,
  floatingToolbarMenuItemClasses,
  floatingToolbarMenuItemIconClasses,
  floatingToolbarMenuItemLabelClasses,
  floatingToolbarSubmenuChevronClasses,
} from "./floating-toolbar.variants"

export function FloatingToolbarSubmenuTrigger({ className, icon, children, ...props }: FloatingToolbarSubmenuTriggerProps) {
  const { numbering, level } = use(FloatingToolbarMenuContentContext)

  return (
    <MenuSubTrigger className={cn(floatingToolbarMenuItemClasses, floatingToolbarItemNumberClasses[level][numbering], className)} {...props}>
      {icon && <MenuItemIcon className={floatingToolbarMenuItemIconClasses}>{icon}</MenuItemIcon>}
      <Text render={<span />} size="sm" color="inherit" className={floatingToolbarMenuItemLabelClasses}>
        {children}
      </Text>
      <ChevronRight aria-hidden="true" className={floatingToolbarSubmenuChevronClasses} />
    </MenuSubTrigger>
  )
}
