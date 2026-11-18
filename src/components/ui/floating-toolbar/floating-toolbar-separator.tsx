"use client"

import { ToolbarSeparator } from "@ui-sdk/react/toolbar"

import { cn } from "@/lib/cn"

import type { FloatingToolbarSeparatorProps } from "./floating-toolbar.types"
import { floatingToolbarSeparatorClasses } from "./floating-toolbar.variants"

export function FloatingToolbarSeparator({ className, ...props }: FloatingToolbarSeparatorProps) {
  return <ToolbarSeparator className={cn(floatingToolbarSeparatorClasses, className)} {...props} />
}
