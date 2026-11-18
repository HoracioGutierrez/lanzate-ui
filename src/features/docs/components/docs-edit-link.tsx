import { ArrowUpRight } from "lucide-react"

import { GITHUB_URL } from "@/features/shell/shell.constants"

import { DOCS_CONTENT_DIR } from "../config/docs-content"
import type { DocsPageProps } from "../types/docs.types"

/** Links to this page's MDX source on GitHub. */
export function DocsEditLink({ id }: DocsPageProps) {
  return (
    <div className="mx-1 mt-8 rounded-lg border border-border bg-card p-3">
      <p className="font-mono text-2xs tracking-wide text-muted-foreground uppercase">Edit</p>
      <a
        href={`${GITHUB_URL}/blob/dev/${DOCS_CONTENT_DIR}/${id}.mdx`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium transition hover:text-brand"
      >
        Improve this page
        <ArrowUpRight size={12} aria-hidden="true" />
      </a>
    </div>
  )
}
