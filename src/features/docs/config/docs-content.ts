import type { DocId, MdxModule } from "../types/docs.types"

/** MDX module for every doc. Server-only: imported by the docs route, never by client components. */
export const docsContent = {
  introduction: () => import("../content/introduction.mdx"),
  installation: () => import("../content/installation.mdx"),
  theming: () => import("../content/theming.mdx"),
  button: () => import("../content/button.mdx"),
  text: () => import("../content/text.mdx"),
  "floating-toolbar": () => import("../content/floating-toolbar.mdx"),
} satisfies Record<DocId, () => Promise<MdxModule>>

/** Folder with the MDX sources, relative to the project root (read for the table of contents). */
export const DOCS_CONTENT_DIR = "src/features/docs/content"
