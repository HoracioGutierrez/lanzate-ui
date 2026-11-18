"use client"

import { useState } from "react"
import {
  ALargeSmall,
  Bold,
  Circle,
  Image,
  Italic,
  MessageSquare,
  MoveRight,
  Plus,
  Redo2,
  Share2,
  Shapes,
  Square,
  Table,
  Trash2,
  Type,
  Underline,
  Undo2,
} from "lucide-react"

import {
  FloatingToolbar,
  FloatingToolbarButton,
  FloatingToolbarMenu,
  FloatingToolbarMenuContent,
  FloatingToolbarMenuItem,
  FloatingToolbarMenuTrigger,
  FloatingToolbarSeparator,
  FloatingToolbarSubmenu,
  FloatingToolbarSubmenuContent,
  FloatingToolbarSubmenuTrigger,
} from "@/components/ui/floating-toolbar"

export function FloatingToolbarBasicDemo() {
  const [last, setLast] = useState("Nothing yet")

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <FloatingToolbar placement="inline" aria-label="Editor">
        <FloatingToolbarButton label="Undo" onClick={() => setLast("Undo")}>
          <Undo2 />
        </FloatingToolbarButton>
        <FloatingToolbarButton label="Redo" onClick={() => setLast("Redo")}>
          <Redo2 />
        </FloatingToolbarButton>
        <FloatingToolbarSeparator />

        <FloatingToolbarMenu onAction={(value) => setLast(value)}>
          <FloatingToolbarMenuTrigger label="Text">
            <Type />
          </FloatingToolbarMenuTrigger>
          <FloatingToolbarMenuContent>
            <FloatingToolbarMenuItem value="Bold" icon={<Bold />}>Bold</FloatingToolbarMenuItem>
            <FloatingToolbarMenuItem value="Italic" icon={<Italic />}>Italic</FloatingToolbarMenuItem>
            <FloatingToolbarMenuItem value="Underline" icon={<Underline />}>Underline</FloatingToolbarMenuItem>
            <FloatingToolbarSubmenu>
              <FloatingToolbarSubmenuTrigger icon={<ALargeSmall />}>Font size</FloatingToolbarSubmenuTrigger>
              <FloatingToolbarSubmenuContent title="Font size">
                <FloatingToolbarMenuItem value="Small text">Small</FloatingToolbarMenuItem>
                <FloatingToolbarMenuItem value="Medium text">Medium</FloatingToolbarMenuItem>
                <FloatingToolbarMenuItem value="Large text">Large</FloatingToolbarMenuItem>
              </FloatingToolbarSubmenuContent>
            </FloatingToolbarSubmenu>
          </FloatingToolbarMenuContent>
        </FloatingToolbarMenu>

        <FloatingToolbarMenu onAction={(value) => setLast(value)}>
          <FloatingToolbarMenuTrigger label="Insert">
            <Plus />
          </FloatingToolbarMenuTrigger>
          <FloatingToolbarMenuContent>
            <FloatingToolbarMenuItem value="Image" icon={<Image />}>Image</FloatingToolbarMenuItem>
            <FloatingToolbarMenuItem value="Table" icon={<Table />}>Table</FloatingToolbarMenuItem>
            <FloatingToolbarSubmenu>
              <FloatingToolbarSubmenuTrigger icon={<Shapes />}>Shape</FloatingToolbarSubmenuTrigger>
              <FloatingToolbarSubmenuContent title="Shapes">
                <FloatingToolbarMenuItem value="Rectangle" icon={<Square />}>Rectangle</FloatingToolbarMenuItem>
                <FloatingToolbarMenuItem value="Circle" icon={<Circle />}>Circle</FloatingToolbarMenuItem>
                <FloatingToolbarMenuItem value="Arrow" icon={<MoveRight />}>Arrow</FloatingToolbarMenuItem>
              </FloatingToolbarSubmenuContent>
            </FloatingToolbarSubmenu>
          </FloatingToolbarMenuContent>
        </FloatingToolbarMenu>

        <FloatingToolbarButton label="Comment" onClick={() => setLast("Comment")}>
          <MessageSquare />
        </FloatingToolbarButton>

        <FloatingToolbarMenu onAction={(value) => setLast(value)}>
          <FloatingToolbarMenuTrigger label="Share">
            <Share2 />
          </FloatingToolbarMenuTrigger>
          <FloatingToolbarMenuContent>
            <FloatingToolbarMenuItem value="Copy link">Copy link</FloatingToolbarMenuItem>
            <FloatingToolbarMenuItem value="Invite people">Invite people</FloatingToolbarMenuItem>
          </FloatingToolbarMenuContent>
        </FloatingToolbarMenu>

        <FloatingToolbarSeparator />
        <FloatingToolbarButton label="Delete" onClick={() => setLast("Delete")}>
          <Trash2 />
        </FloatingToolbarButton>
      </FloatingToolbar>
      <p className="text-sm text-muted-foreground" aria-live="polite">
        Last action: {last}
      </p>
    </div>
  )
}
