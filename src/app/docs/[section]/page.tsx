import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { DocsPage } from "@/views/docs/DocsPage"
import { allSections, titleMap } from "@/views/docs/docs-config"

export function generateStaticParams() {
  return allSections.map((s) => ({ section: s.id }))
}

export async function generateMetadata({ params }: PageProps<"/docs/[section]">): Promise<Metadata> {
  const { section } = await params
  const title = titleMap[section]
  return title ? { title } : {}
}

export default async function DocsSectionPage({ params }: PageProps<"/docs/[section]">) {
  const { section } = await params
  if (!allSections.some((s) => s.id === section)) redirect("/docs/introduction")
  return <DocsPage section={section} />
}
