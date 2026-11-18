import { readFile } from "node:fs/promises"
import path from "node:path"

import type { DocId, TocItem } from "../types/docs.types"
import { extractToc } from "./extract-toc"

/** Table of contents for a doc, read from its MDX source at build time. Server-only. */
export async function getToc(id: DocId): Promise<TocItem[]> {
  // A literal folder (same as DOCS_CONTENT_DIR) lets the build trace only the MDX sources.
  const source = await readFile(path.join(process.cwd(), "src/features/docs/content", `${id}.mdx`), "utf8")
  return extractToc(source)
}
