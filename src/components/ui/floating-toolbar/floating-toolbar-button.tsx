"use client"

import { ToolbarButton } from "@ui-sdk/react/toolbar"

// Import other registry components by exact file, not their folder's index.ts.
import { Button } from "@/components/ui/button/button"
import { cn } from "@/lib/cn"

import type { FloatingToolbarButtonProps } from "./floating-toolbar.types"
import { floatingToolbarControlClasses } from "./floating-toolbar.variants"

// ToolbarButton keeps the arrow-key focus; the registry Button draws it, and being ui-sdk's Button
// underneath keeps it in the agent snapshot.
export function FloatingToolbarButton({ className, label, children, ...props }: FloatingToolbarButtonProps) {
  return (
    <ToolbarButton
      aria-label={label}
      render={
        <Button
          variant="ghost"
          color="muted"
          padding="none"
          icon={<span aria-hidden="true" className="contents">{children}</span>}
          className={cn(floatingToolbarControlClasses, className)}
        />
      }
      {...props}
    />
  )
}
