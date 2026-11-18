import type { MDXComponents } from "mdx/types"

import { docsMdxComponents } from "@/features/docs/mdx/docs-mdx-components"

// Required by @next/mdx in the App Router (it must live at the src/ root).
// MDX is only used by the docs, so this just hands over the docs components.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...docsMdxComponents, ...components }
}
