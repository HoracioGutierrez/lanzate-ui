"use client"

import { MenuSubContent } from "@ui-sdk/react/menu"

import { cn } from "@/lib/cn"

import type { FrameSubmenuContentProps } from "./frame.types"
import { frameSubmenuContentClasses } from "./frame.variants"

export function FrameSubmenuContent({ className, ...props }: FrameSubmenuContentProps) {
  return <MenuSubContent className={cn(frameSubmenuContentClasses, className)} {...props} />
}
