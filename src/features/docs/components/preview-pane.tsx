import { cn } from "@/lib/utils"

import type { PreviewPaneProps } from "../types/docs.types"

/** Dotted stage a demo renders on. `stack` left-aligns content and drops the minimum height. */
export function PreviewPane({ children, layout = "center" }: PreviewPaneProps) {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-border">
      <div className={cn("dot-grid p-8", layout === "center" ? "grid min-h-64 grid-cols-1 place-items-center" : "text-left")}>
        {children}
      </div>
    </div>
  )
}
