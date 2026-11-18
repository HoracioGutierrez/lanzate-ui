import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { DocsPage } from "@/features/docs/components/docs-page"
import { allDocs } from "@/features/docs/config/docs-nav"
import { findDoc, isDocId } from "@/features/docs/lib/docs-navigation"

export const dynamicParams = false

export function generateStaticParams() {
  return allDocs.map((doc) => ({ section: doc.id }))
}

export async function generateMetadata({ params }: PageProps<"/docs/[section]">): Promise<Metadata> {
  const { section } = await params
  return isDocId(section) ? { title: findDoc(section).label } : {}
}

export default async function DocsSectionPage({ params }: PageProps<"/docs/[section]">) {
  const { section } = await params
  if (!isDocId(section)) notFound()
  return <DocsPage id={section} />
}
