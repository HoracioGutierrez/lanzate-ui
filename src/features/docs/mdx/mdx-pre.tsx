import { isValidElement, type ReactNode } from "react"

import { CodeBlock } from "../components/code-block"
import { PackageManagerCode } from "../components/package-manager-code"
import { isPackageManagerScript } from "../lib/package-manager-command"
import type { MdxElementProps } from "../types/docs.types"

/** The text of a fenced block: MDX renders it as <pre><code>text</code></pre>. */
function codeText(children: ReactNode): string {
  if (typeof children === "string") return children
  if (isValidElement<{ children?: ReactNode }>(children)) return codeText(children.props.children)
  return ""
}

/** The fence's language: MDX puts it on the <code> as `language-<name>`. */
function codeLanguage(children: ReactNode): string | undefined {
  if (!isValidElement<{ className?: string }>(children)) return undefined
  return /language-(\S+)/.exec(children.props.className ?? "")?.[1]
}

/**
 * Fenced code block → CodeBlock with a copy button. Shell blocks that run npx get a package manager
 * picker, so readers copy the command for the tool they use.
 */
export function MdxPre({ children }: MdxElementProps<"pre">) {
  const code = codeText(children).trimEnd()
  const shell = ["bash", "sh", "shell"].includes(codeLanguage(children) ?? "")
  if (shell && isPackageManagerScript(code)) return <PackageManagerCode code={code} />
  return <CodeBlock code={code} />
}
