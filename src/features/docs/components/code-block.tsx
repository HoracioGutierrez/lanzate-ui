import { CopyButton } from "@/features/shell/components/copy-button"

import type { CodeBlockProps } from "../types/docs.types"

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <div className="group relative mt-3">
      <pre className="overflow-x-auto rounded-lg border border-border bg-foreground/4 p-4 font-mono text-xs leading-relaxed text-foreground dark:bg-foreground/6">
        <code>{code}</code>
      </pre>
      <CopyButton
        value={code}
        label="Copy code"
        className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
      />
    </div>
  )
}
