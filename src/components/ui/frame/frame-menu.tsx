"use client"

import { EllipsisVertical } from "lucide-react"
import { Menu, MenuContent, MenuTrigger } from "@ui-sdk/react/menu"

import { cn } from "@/lib/cn"

import type { FrameMenuProps } from "./frame.types"
import { frameIconButtonClasses, frameMenuContentClasses } from "./frame.variants"

export function FrameMenu({ label, className, contentClassName, children, ...props }: FrameMenuProps) {
  return (
    <Menu {...props}>
      <MenuTrigger aria-label={label} className={cn(frameIconButtonClasses, className)}>
        <EllipsisVertical aria-hidden="true" />
      </MenuTrigger>
      <MenuContent side="bottom" align="end" sideOffset={6} collisionPadding={12} className={cn(frameMenuContentClasses, contentClassName)}>
        {children}
      </MenuContent>
    </Menu>
  )
}
