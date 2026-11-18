import Link from "next/link"

import type { MdxElementProps } from "../types/docs.types"

const linkClasses = "font-medium text-foreground underline decoration-border underline-offset-4 transition hover:decoration-brand"

/** Internal links use next/link; external ones open in a new tab. */
export function MdxA({ href = "", children }: MdxElementProps<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={linkClasses}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
      {children}
    </a>
  )
}
