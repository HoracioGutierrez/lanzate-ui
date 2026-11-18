"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@ui-sdk/react/button"

import { cn } from "@/lib/cn"

import type { FrameBackProps } from "./frame.types"
import { frameBackIconClasses, frameIconButtonClasses } from "./frame.variants"

export function FrameBack({ className, label = "Back", ...props }: FrameBackProps) {
  return (
    <Button aria-label={label} className={cn(frameIconButtonClasses, className)} {...props}>
      <ArrowLeft aria-hidden="true" className={frameBackIconClasses} />
    </Button>
  )
}
