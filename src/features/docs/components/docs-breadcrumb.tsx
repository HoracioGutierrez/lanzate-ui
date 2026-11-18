import { ChevronRight } from "lucide-react"
import Link from "next/link"

import { SITE_NAME } from "@/features/shell/shell.constants"

import type { DocsBreadcrumbProps } from "../types/docs.types"

export function DocsBreadcrumb({ title }: DocsBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <li>
          <Link href="/" className="transition hover:text-foreground">
            {SITE_NAME}
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight size={12} />
        </li>
        <li>
          <Link href="/docs" className="transition hover:text-foreground">
            Docs
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight size={12} />
        </li>
        <li aria-current="page" className="font-medium text-foreground">
          {title}
        </li>
      </ol>
    </nav>
  )
}
