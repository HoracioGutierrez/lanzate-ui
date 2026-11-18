"use client"

import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard"
import type { CopyButtonProps } from "../shell.types"

/** Small square button that copies `value`; shows a check for a moment after copying. */
export function CopyButton({ value, label = "Copy", className }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      aria-label={label}
      className={cn(
        "grid size-7 place-items-center rounded-md border border-border bg-background transition hover:bg-accent",
        className
      )}
    >
      {copied ? <Check size={13} className="text-brand" aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  )
}
