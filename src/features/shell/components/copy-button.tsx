"use client"

import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard"
import type { CopyButtonProps } from "../shell.types"

/** Small square button that copies `value`; shows a check for a moment after copying. */
export function CopyButton({ value, label = "Copy", className }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <Button
      variant="subtle"
      padding="xs"
      icon={
        <>
          {copied ? <Check className="text-brand" aria-hidden="true" /> : <Copy aria-hidden="true" />}
          <span className="sr-only" aria-live="polite">
            {copied ? "Copied" : ""}
          </span>
        </>
      }
      tooltip={copied ? "Copied" : label}
      aria-label={label}
      onClick={() => copy(value)}
      className={className}
    />
  )
}
