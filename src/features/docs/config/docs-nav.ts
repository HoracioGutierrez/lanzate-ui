import type { DocGroup, DocId, DocItem } from "../types/docs.types"

/** The docs sidebar, in order. Single source for navigation, titles and the pager. */
export const docsNav: DocGroup[] = [
  {
    group: "Get Started",
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "installation", label: "Installation" },
      { id: "theming", label: "Theming" },
    ],
  },
  {
    group: "Components",
    items: [
      { id: "button", label: "Button" },
      { id: "text", label: "Text" },
      { id: "floating-toolbar", label: "Floating Toolbar", badge: "New" },
      { id: "frame", label: "Frame", badge: "New" },
    ],
  },
]

export const allDocs: DocItem[] = docsNav.flatMap((group) => group.items)

export const DEFAULT_DOC: DocId = "introduction"
