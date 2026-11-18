"use client"

import { EllipsisVertical } from "lucide-react"
import { Menu, MenuContent, MenuTrigger } from "@ui-sdk/react/menu"

// Import other registry components by exact file, not their folder's index.ts.
import { Button } from "@/components/ui/button/button"
import { cn } from "@/lib/cn"

import type { FrameMenuProps } from "./frame.types"
import { frameControlClasses, frameMenuContentClasses, frameMenuTriggerClasses } from "./frame.variants"

export function FrameMenu({ label, className, contentClassName, children, ...props }: FrameMenuProps) {
  return (
    <Menu {...props}>
      <MenuTrigger
        aria-label={label}
        render={
          <Button
            variant="ghost"
            color="muted"
            radius="none"
            padding="none"
            icon={<EllipsisVertical aria-hidden="true" />}
            className={cn(frameControlClasses, frameMenuTriggerClasses, className)}
          />
        }
      />
      <MenuContent side="bottom" align="end" sideOffset={6} collisionPadding={12} className={cn(frameMenuContentClasses, contentClassName)}>
        {children}
      </MenuContent>
    </Menu>
  )
}
