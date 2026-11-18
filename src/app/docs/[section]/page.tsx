import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { DocsPage } from "@/views/docs/DocsPage"
import { allSections, titleMap } from "@/views/docs/docs-config"

type Props = { params: Promise<{ section: string }> }

export function generateStaticParams() {
  return allSections.map((s) => ({ section: s.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params
  const title = titleMap[section]
  return title ? { title } : {}
}

export default async function DocsSectionPage({ params }: Props) {
  const { section } = await params
  if (!allSections.some((s) => s.id === section)) redirect("/docs/introduction")
  return <DocsPage section={section} />
}
