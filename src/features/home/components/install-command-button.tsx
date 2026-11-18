"use client"

import { Check, Copy } from "lucide-react"

import { useCopyToClipboard } from "@/features/shell/hooks/use-copy-to-clipboard"

import type { InstallCommandButtonProps } from "../home.types"

/** The install command, shown in full; clicking copies it. */
export function InstallCommandButton({ command }: InstallCommandButtonProps) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <button
      type="button"
      onClick={() => copy(command)}
      aria-label={copied ? "Copied install command" : `Copy install command: ${command}`}
      className="inline-flex h-11 w-full max-w-full items-center gap-3 overflow-hidden rounded-md border border-border bg-card px-4 font-mono text-sm transition hover:bg-accent sm:w-auto"
    >
      <span aria-hidden="true" className="shrink-0 text-muted-foreground">
        $
      </span>
      <span aria-hidden="true" className="min-w-0 truncate">
        {command}
      </span>
      <span aria-hidden="true" className="ml-1 shrink-0 text-muted-foreground">
        {copied ? <Check size={14} className="text-brand" /> : <Copy size={14} />}
      </span>
    </button>
  )
}
