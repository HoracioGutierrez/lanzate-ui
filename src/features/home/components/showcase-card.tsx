import { ScrollArea } from "@/components/ui/scroll-area"
import { Text } from "@/components/ui/text"

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
          <Text render={<h3 />} size="sm" weight="medium">
            {title}
          </Text>
          <Text size="xs" color="muted" className="mt-0.5">
            {description}
          </Text>
        </div>
        <Text render={<span aria-hidden="true" />} size="2xs" font="mono" color="muted">
          {number}
        </Text>
      </div>
    </article>
  )
}
