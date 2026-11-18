"use client"

import { useMemo, useState } from "react"
import { MenuSub } from "@ui-sdk/react/menu"

import { FloatingToolbarSubmenuContext } from "./floating-toolbar.constants"
import type { FloatingToolbarSubmenuProps } from "./floating-toolbar.types"

export function FloatingToolbarSubmenu({ defaultOpen = false, onOpenChange, ...props }: FloatingToolbarSubmenuProps) {
  const [open, setOpen] = useState(defaultOpen)
  const context = useMemo(() => ({ open, setOpen }), [open])

  return (
    <FloatingToolbarSubmenuContext value={context}>
      <MenuSub
        open={open}
        onOpenChange={(next, details) => {
          onOpenChange?.(next, details)
          if (!details.canceled) setOpen(next)
        }}
        {...props}
      />
    </FloatingToolbarSubmenuContext>
  )
}
