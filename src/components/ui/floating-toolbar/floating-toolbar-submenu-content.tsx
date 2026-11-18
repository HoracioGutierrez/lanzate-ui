"use client"

import { use, useRef, useState } from "react"
import { ChevronLeft } from "lucide-react"
import {
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuItemIcon,
  MenuSeparator,
  MenuSubContent,
} from "@ui-sdk/react/menu"

import { cn } from "@/lib/cn"

import { FloatingToolbarMenuContentContext, FloatingToolbarSubmenuContext } from "./floating-toolbar.constants"
import type { FloatingToolbarSubmenuContentProps } from "./floating-toolbar.types"
import {
  floatingToolbarBackItemClasses,
  floatingToolbarMenuItemClasses,
  floatingToolbarMenuItemIconClasses,
  floatingToolbarMenuSeparatorClasses,
  floatingToolbarSubmenuContentClasses,
  floatingToolbarSubmenuTitleClasses,
} from "./floating-toolbar.variants"

export function FloatingToolbarSubmenuContent({
  className,
  title,
  backLabel = "Back",
  children,
  ...props
}: FloatingToolbarSubmenuContentProps) {
  const submenu = use(FloatingToolbarSubmenuContext)
  const { side: parentSide } = use(FloatingToolbarMenuContentContext)
  const opensUp = parentSide === "top"
  const selfRef = useRef<HTMLDivElement>(null)

  // A zero-height anchor on the parent panel's edge nearest the toolbar, so this panel
  // opens over its parent (not beside it) and grows away from the toolbar.
  const [anchor] = useState(() => ({
    getBoundingClientRect() {
      const parent = selfRef.current?.parentElement?.closest('[data-slot="menu-content"]')
      if (!parent) return new DOMRect()
      const rect = parent.getBoundingClientRect()
      const parentAbove = parent.getAttribute("data-side") === "top"
      return new DOMRect(rect.x, parentAbove ? rect.bottom : rect.top, rect.width, 0)
    },
  }))

  return (
    <MenuSubContent
      ref={selfRef}
      anchor={anchor}
      side={opensUp ? "top" : "bottom"}
      align="start"
      sideOffset={0}
      alignOffset={0}
      className={cn(floatingToolbarSubmenuContentClasses, className)}
      {...props}
    >
      <MenuItem
        closeOnSelect={false}
        onSelect={(event) => {
          event.preventDefault()
          submenu?.setOpen(false)
        }}
        className={cn(floatingToolbarMenuItemClasses, floatingToolbarBackItemClasses)}
      >
        <MenuItemIcon mirror className={floatingToolbarMenuItemIconClasses}>
          <ChevronLeft />
        </MenuItemIcon>
        {backLabel}
      </MenuItem>
      <MenuSeparator className={floatingToolbarMenuSeparatorClasses} />
      {title ? (
        <MenuGroup>
          <MenuGroupLabel className={floatingToolbarSubmenuTitleClasses}>{title}</MenuGroupLabel>
          {children}
        </MenuGroup>
      ) : (
        children
      )}
    </MenuSubContent>
  )
}
