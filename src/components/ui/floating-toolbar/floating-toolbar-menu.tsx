"use client"

import { Menu } from "@ui-sdk/react/menu"

import type { FloatingToolbarMenuProps } from "./floating-toolbar.types"

export function FloatingToolbarMenu(props: FloatingToolbarMenuProps) {
  return <Menu {...props} />
}
