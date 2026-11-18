import { allDocs } from "../config/docs-nav"
import type { DocId, DocItem } from "../types/docs.types"

export function isDocId(value: string): value is DocId {
  return allDocs.some((doc) => doc.id === value)
}

export function findDoc(id: DocId): DocItem {
  const doc = allDocs.find((d) => d.id === id)
  if (!doc) throw new Error(`Doc "${id}" is missing from docsNav`)
  return doc
}

export function getAdjacentDocs(id: DocId): { previous?: DocItem; next?: DocItem } {
  const index = allDocs.findIndex((d) => d.id === id)
  return { previous: allDocs[index - 1], next: allDocs[index + 1] }
}
