"use client"

import { Button } from "@ui-sdk/react/button"
import { ToolbarButton } from "@ui-sdk/react/toolbar"

import { cn } from "@/lib/cn"

import type { FloatingToolbarButtonProps } from "./floating-toolbar.types"
import { floatingToolbarButtonClasses } from "./floating-toolbar.variants"

// Rendered through ui-sdk's Button so agents can find and press it; a bare toolbar button isn't in their snapshot.
export function FloatingToolbarButton({ className, label, children, ...props }: FloatingToolbarButtonProps) {
  return (
    <ToolbarButton render={<Button />} aria-label={label} className={cn(floatingToolbarButtonClasses, className)} {...props}>
      <span aria-hidden="true" className="contents">
        {children}
      </span>
    </ToolbarButton>
  )
}
