import { getAdjacentDocs } from "../lib/docs-navigation"
import type { DocsPagerProps } from "../types/docs.types"
import { DocsPagerLink } from "./docs-pager-link"

export function DocsPager({ current }: DocsPagerProps) {
  const { previous, next } = getAdjacentDocs(current)

  return (
    <nav aria-label="Pages" className="mt-20 flex items-center justify-between gap-4 border-t border-border pt-6">
      {previous && <DocsPagerLink item={previous} direction="previous" />}
      {next && <DocsPagerLink item={next} direction="next" />}
    </nav>
  )
}
