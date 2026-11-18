"use client"

import { MenuTrigger } from "@ui-sdk/react/menu"
import { ToolbarButton } from "@ui-sdk/react/toolbar"

// Import other registry components by exact file, not their folder's index.ts.
import { Button } from "@/components/ui/button/button"
import { cn } from "@/lib/cn"

import type { FloatingToolbarMenuTriggerProps } from "./floating-toolbar.types"
import { floatingToolbarControlClasses, floatingToolbarMenuTriggerClasses } from "./floating-toolbar.variants"

// ToolbarButton keeps the arrow-key focus, MenuTrigger opens the panel, the registry Button draws it.
export function FloatingToolbarMenuTrigger({ className, label, children, ...props }: FloatingToolbarMenuTriggerProps) {
  return (
    <ToolbarButton
      aria-label={label}
      render={
        <MenuTrigger
          render={
            <Button
              variant="ghost"
              color="muted"
              padding="none"
              icon={<span aria-hidden="true" className="contents">{children}</span>}
              className={cn(floatingToolbarControlClasses, floatingToolbarMenuTriggerClasses, className)}
            />
          }
        />
      }
      {...props}
    />
  )
}
