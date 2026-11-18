import { isValidElement, type ReactNode } from "react"

import { CodeBlock } from "../components/code-block"
import type { MdxElementProps } from "../types/docs.types"

/** The text of a fenced block: MDX renders it as <pre><code>text</code></pre>. */
function codeText(children: ReactNode): string {
  if (typeof children === "string") return children
  if (isValidElement<{ children?: ReactNode }>(children)) return codeText(children.props.children)
  return ""
}

/** Fenced code block → CodeBlock with a copy button. */
export function MdxPre({ children }: MdxElementProps<"pre">) {
  return <CodeBlock code={codeText(children).trimEnd()} />
}
