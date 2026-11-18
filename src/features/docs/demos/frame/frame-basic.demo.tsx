"use client"

import { useState } from "react"
import { Archive, Copy, FileSpreadsheet, FileText, Pencil, Share2, Trash2 } from "lucide-react"

import {
  Frame,
  FrameBack,
  FrameContent,
  FrameHeader,
  FrameMenu,
  FrameMenuItem,
  FrameMenuSeparator,
  FrameSubmenu,
  FrameSubmenuContent,
  FrameSubmenuTrigger,
  FrameTitle,
} from "@/components/ui/frame"

export function FrameBasicDemo() {
  const [last, setLast] = useState("Nothing yet")

  return (
    <div className="flex w-full flex-col gap-4">
      <Frame size="lg" collapsible>
        <FrameHeader>
          <FrameBack onClick={() => setLast("Back")} />
          <FrameTitle>Store — 01 / Orders</FrameTitle>
          <FrameMenu label="Section actions" onAction={(value) => setLast(value)}>
            <FrameMenuItem value="Edit" icon={<Pencil />}>Edit</FrameMenuItem>
            <FrameMenuItem value="Duplicate" icon={<Copy />}>Duplicate</FrameMenuItem>
            <FrameSubmenu>
              <FrameSubmenuTrigger icon={<Share2 />}>Export</FrameSubmenuTrigger>
              <FrameSubmenuContent>
                <FrameMenuItem value="CSV" icon={<FileSpreadsheet />}>CSV</FrameMenuItem>
                <FrameMenuItem value="PDF" icon={<FileText />}>PDF</FrameMenuItem>
              </FrameSubmenuContent>
            </FrameSubmenu>
            <FrameMenuSeparator />
            <FrameMenuItem value="Archive" icon={<Archive />}>Archive</FrameMenuItem>
            <FrameMenuItem value="Delete" icon={<Trash2 />} destructive>Delete</FrameMenuItem>
          </FrameMenu>
        </FrameHeader>
        <FrameContent>
          <p className="text-sm text-muted-foreground">
            A whole page section. Press the title to fold it into the header; Back and the menu work without folding it.
          </p>
        </FrameContent>
      </Frame>
      <p className="font-mono text-xs text-muted-foreground">Last action: {last}</p>
    </div>
  )
}
