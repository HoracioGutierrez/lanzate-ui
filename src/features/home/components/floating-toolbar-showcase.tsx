import { Bold, Italic, MessageSquare, Redo2, Trash2, Type, Underline, Undo2 } from "lucide-react"

import {
  FloatingToolbar,
  FloatingToolbarButton,
  FloatingToolbarMenu,
  FloatingToolbarMenuContent,
  FloatingToolbarMenuItem,
  FloatingToolbarMenuTrigger,
  FloatingToolbarSeparator,
} from "@/components/ui/floating-toolbar"

import { ShowcaseCard } from "./showcase-card"

export function FloatingToolbarShowcase() {
  return (
    <ShowcaseCard title="Floating Toolbar" description="Icon actions, menus and submenus." number="03">
      <div className="flex min-h-52 items-center justify-center px-6">
        <FloatingToolbar placement="inline" aria-label="Editor sample">
          <FloatingToolbarButton label="Undo">
            <Undo2 />
          </FloatingToolbarButton>
          <FloatingToolbarButton label="Redo">
            <Redo2 />
          </FloatingToolbarButton>
          <FloatingToolbarSeparator />
          <FloatingToolbarMenu>
            <FloatingToolbarMenuTrigger label="Text">
              <Type />
            </FloatingToolbarMenuTrigger>
            <FloatingToolbarMenuContent>
              <FloatingToolbarMenuItem value="bold" icon={<Bold />}>Bold</FloatingToolbarMenuItem>
              <FloatingToolbarMenuItem value="italic" icon={<Italic />}>Italic</FloatingToolbarMenuItem>
              <FloatingToolbarMenuItem value="underline" icon={<Underline />}>Underline</FloatingToolbarMenuItem>
            </FloatingToolbarMenuContent>
          </FloatingToolbarMenu>
          <FloatingToolbarButton label="Comment">
            <MessageSquare />
          </FloatingToolbarButton>
          <FloatingToolbarSeparator />
          <FloatingToolbarButton label="Delete">
            <Trash2 />
          </FloatingToolbarButton>
        </FloatingToolbar>
      </div>
    </ShowcaseCard>
  )
}
