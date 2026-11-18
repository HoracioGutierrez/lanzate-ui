import GithubSlugger from "github-slugger"

import type { TocItem } from "../types/docs.types"

const HEADING = /^(#{1,6})\s+(.+?)\s*#*\s*$/
const FENCE = /^\s*(```|~~~)/

/** Markdown inline syntax → the plain text rehype-slug sees. */
function plainText(markdown: string) {
  return markdown
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .trim()
}

/**
 * The `##` headings of an MDX source, with the ids rehype-slug gives them.
 * Every heading goes through the slugger in order, as rehype-slug does, so
 * duplicate titles get the same `-1`, `-2` suffixes.
 */
export function extractToc(source: string): TocItem[] {
  const slugger = new GithubSlugger()
  const items: TocItem[] = []
  let inFence = false

  for (const line of source.split(/\r?\n/)) {
    if (FENCE.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const match = HEADING.exec(line)
    if (!match?.[1] || !match[2]) continue
    const label = plainText(match[2])
    const id = slugger.slug(label)
    if (match[1].length === 2) items.push({ id, label })
  }

  return items
}
