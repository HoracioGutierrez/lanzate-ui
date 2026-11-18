"use client"

import { use } from "react"

import { cn } from "@/lib/cn"

import { FrameContext } from "./frame.constants"
import type { FrameHeaderProps } from "./frame.types"
import { frameHeaderClasses, frameHeaderHeightClasses } from "./frame.variants"

export function FrameHeader({ className, height, ...props }: FrameHeaderProps) {
  const { size } = use(FrameContext)

  return <div data-slot="frame-header" className={cn(frameHeaderClasses, frameHeaderHeightClasses[height ?? size], className)} {...props} />
}
