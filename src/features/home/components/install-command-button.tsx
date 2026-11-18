"use client"

import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCopyToClipboard } from "@/features/shell/hooks/use-copy-to-clipboard"

import type { InstallCommandButtonProps } from "../home.types"

/** The install command, shown in full; clicking copies it. */
export function InstallCommandButton({ command }: InstallCommandButtonProps) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <Button
      variant="subtle"
      padding="md"
      mobile="full-width"
      startIcon={
        <span aria-hidden="true" className="font-mono text-muted-foreground">
          $
        </span>
      }
      endIcon={copied ? <Check className="text-brand" aria-hidden="true" /> : <Copy className="text-muted-foreground" aria-hidden="true" />}
      textClassName="min-w-0 truncate font-mono"
      aria-label={copied ? "Copied install command" : `Copy install command: ${command}`}
      onClick={() => copy(command)}
      className="max-w-full"
    >
      {command}
    </Button>
  )
}
