import { ChevronRight } from "lucide-react"
import Link from "next/link"

import { Text } from "@/components/ui/text"
import { SITE_NAME } from "@/features/shell/shell.constants"

import type { DocsBreadcrumbProps } from "../types/docs.types"

export function DocsBreadcrumb({ title }: DocsBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <Text render={<ol />} size="xs" color="muted" className="flex items-center gap-1.5">
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
        <Text render={<li aria-current="page" />} size="inherit" weight="medium">
          {title}
        </Text>
      </Text>
    </nav>
  )
}
