import { ScrollArea } from "@/components/ui/scroll-area"

import type { ShowcaseCardProps } from "../home.types"

/** A component's live samples in a scrollable dotted frame, with its name below. */
export function ShowcaseCard({ title, description, number, children }: ShowcaseCardProps) {
  return (
    <article className="bg-card">
      <div className="dot-grid relative h-52 overflow-hidden">
        <ScrollArea className="scroll-fade size-full" viewportProps={{ role: "region", "aria-label": `${title} samples` }}>
          {children}
        </ScrollArea>
      </div>
      <div className="flex items-center justify-between border-t border-border px-5 py-4">
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        </div>
        <span aria-hidden="true" className="font-mono text-3xs text-muted-foreground">
          {number}
        </span>
      </div>
    </article>
  )
}
