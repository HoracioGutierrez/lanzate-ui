"use client"

import { MenuSeparator } from "@ui-sdk/react/menu"

import { cn } from "@/lib/cn"

import type { FrameMenuSeparatorProps } from "./frame.types"
import { frameMenuSeparatorClasses } from "./frame.variants"

export function FrameMenuSeparator({ className, ...props }: FrameMenuSeparatorProps) {
  return <MenuSeparator className={cn(frameMenuSeparatorClasses, className)} {...props} />
}
