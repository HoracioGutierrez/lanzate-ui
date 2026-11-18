import type { MdxElementProps } from "../types/docs.types"

/** Inline `code`. Fenced blocks are handled by MdxPre, which reads this element's text. */
export function MdxCode({ children }: MdxElementProps<"code">) {
  return <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">{children}</code>
}
