import { redirect } from "next/navigation"

import { DEFAULT_DOC } from "@/features/docs/config/docs-nav"

export default function DocsIndexPage() {
  redirect(`/docs/${DEFAULT_DOC}`)
}
