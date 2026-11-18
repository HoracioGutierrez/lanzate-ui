"use client"

import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
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
        <Text render={<span aria-hidden="true" />} size="inherit" font="mono" color="muted">
          $
        </Text>
      }
      endIcon={copied ? <Check className="text-brand" aria-hidden="true" /> : <Copy className="text-muted-foreground" aria-hidden="true" />}
      textClassName="min-w-0 truncate font-mono"
      aria-label={copied ? "Copied install command" : `Copy install command: ${command}`}
      onClick={() => copy(command)}
      className="max-w-full min-w-0"
    >
      {command}
    </Button>
  )
}
