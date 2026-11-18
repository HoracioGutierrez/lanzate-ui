"use client"

import { use, useMemo, useRef, useState } from "react"
import { ChevronLeft } from "lucide-react"
import {
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuItemIcon,
  MenuSeparator,
  MenuSubContent,
} from "@ui-sdk/react/menu"

// Import other registry components by exact file, not their folder's index.ts.
import { Text } from "@/components/ui/text/text"
import { cn } from "@/lib/cn"

import { FloatingToolbarMenuContentContext, FloatingToolbarSubmenuContext } from "./floating-toolbar.constants"
import type { FloatingToolbarSubmenuContentProps } from "./floating-toolbar.types"
import {
  floatingToolbarBackItemClasses,
  floatingToolbarMenuItemClasses,
  floatingToolbarMenuItemIconClasses,
  floatingToolbarMenuSeparatorClasses,
  floatingToolbarPanelCounterClasses,
  floatingToolbarSubmenuContentClasses,
  floatingToolbarSubmenuTitleClasses,
} from "./floating-toolbar.variants"

export function FloatingToolbarSubmenuContent({
  className,
  title,
  backLabel = "Back",
  numbering,
  children,
  ...props
}: FloatingToolbarSubmenuContentProps) {
  const submenu = use(FloatingToolbarSubmenuContext)
  const parent = use(FloatingToolbarMenuContentContext)
  const opensUp = parent.side === "top"
  const resolvedNumbering = numbering ?? parent.numbering
  const context = useMemo(
    () => ({ side: parent.side, numbering: resolvedNumbering, level: 2 as const }),
    [parent.side, resolvedNumbering]
  )
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
      data-numbering={resolvedNumbering}
      className={cn(floatingToolbarSubmenuContentClasses, floatingToolbarPanelCounterClasses[2], className)}
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
        <Text render={<span />} variant="overline" size="2xs" color="inherit">
          {backLabel}
        </Text>
      </MenuItem>
      <MenuSeparator className={floatingToolbarMenuSeparatorClasses} />
      <FloatingToolbarMenuContentContext value={context}>
        {title ? (
          <MenuGroup>
            {/* Text goes inside the label: the label keeps ui-sdk's data-slot, which Text would replace with its own. */}
            <MenuGroupLabel className={floatingToolbarSubmenuTitleClasses}>
              <Text render={<span />} variant="overline" size="2xs" color="primary">
                {title}
              </Text>
            </MenuGroupLabel>
            {children}
          </MenuGroup>
        ) : (
          children
        )}
      </FloatingToolbarMenuContentContext>
    </MenuSubContent>
  )
}
