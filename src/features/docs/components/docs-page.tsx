import { docsContent } from "../config/docs-content"
import { findDoc } from "../lib/docs-navigation"
import { getToc } from "../lib/get-toc"
import type { DocsPageProps } from "../types/docs.types"
import { DocsBreadcrumb } from "./docs-breadcrumb"
import { DocsEditLink } from "./docs-edit-link"
import { DocsPager } from "./docs-pager"
import { DocsSidebar } from "./docs-sidebar"
import { DocsToc } from "./docs-toc"

/** Three columns: navigation, the MDX article, and the table of contents. Server component. */
export async function DocsPage({ id }: DocsPageProps) {
  const doc = findDoc(id)
  const [{ default: Content }, toc] = await Promise.all([docsContent[id](), getToc(id)])

  return (
    <div className="min-h-screen pt-14">
      <div className="mx-auto flex max-w-400 gap-10 px-6">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 self-start py-8 pr-3 md:block">
          <DocsSidebar current={id} />
        </aside>

        <main className="min-w-0 flex-1 py-10 lg:pr-10">
          <DocsBreadcrumb title={doc.label} />
          <article>
            <Content />
          </article>
          <DocsPager current={id} />
        </main>

        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-48 shrink-0 self-start py-10 xl:block">
          <DocsToc items={toc} />
          <DocsEditLink id={id} />
        </aside>
      </div>
    </div>
  )
}
