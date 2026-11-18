"use client"

import { ArrowLeft } from "lucide-react"

// Import other registry components by exact file, not their folder's index.ts.
import { Button } from "@/components/ui/button/button"
import { cn } from "@/lib/cn"

import type { FrameBackProps } from "./frame.types"
import { frameBackIconClasses, frameControlClasses } from "./frame.variants"

export function FrameBack({ className, label = "Back", ...props }: FrameBackProps) {
  return (
    <Button
      variant="ghost"
      color="muted"
      radius="none"
      padding="none"
      icon={<ArrowLeft aria-hidden="true" className={frameBackIconClasses} />}
      aria-label={label}
      className={cn(frameControlClasses, className)}
      {...props}
    />
  )
}
