"use client"

import { Image, MoveRight, Plus, Shapes, Square, Table } from "lucide-react"

import {
  FloatingToolbar,
  FloatingToolbarMenu,
  FloatingToolbarMenuContent,
  FloatingToolbarMenuItem,
  FloatingToolbarMenuTrigger,
  FloatingToolbarSubmenu,
  FloatingToolbarSubmenuContent,
  FloatingToolbarSubmenuTrigger,
} from "@/components/ui/floating-toolbar"

export function FloatingToolbarNumberingDemo() {
  return (
    <FloatingToolbar placement="inline" aria-label="Numbered">
      <FloatingToolbarMenu>
        <FloatingToolbarMenuTrigger label="Insert">
          <Plus />
        </FloatingToolbarMenuTrigger>
        <FloatingToolbarMenuContent numbering="hierarchical">
          <FloatingToolbarMenuItem value="image" icon={<Image />}>Image</FloatingToolbarMenuItem>
          <FloatingToolbarMenuItem value="table" icon={<Table />}>Table</FloatingToolbarMenuItem>
          <FloatingToolbarSubmenu>
            <FloatingToolbarSubmenuTrigger icon={<Shapes />}>Shape</FloatingToolbarSubmenuTrigger>
            <FloatingToolbarSubmenuContent title="Shapes">
              <FloatingToolbarMenuItem value="rectangle" icon={<Square />}>Rectangle</FloatingToolbarMenuItem>
              <FloatingToolbarMenuItem value="arrow" icon={<MoveRight />}>Arrow</FloatingToolbarMenuItem>
            </FloatingToolbarSubmenuContent>
          </FloatingToolbarSubmenu>
        </FloatingToolbarMenuContent>
      </FloatingToolbarMenu>
    </FloatingToolbar>
  )
}
