import type { ComponentProps, ComponentType, JSX, ReactNode } from "react"

import type { apiTables } from "../api/api-tables"
import type { demoRegistry } from "../demos/demo-registry"

/** Every docs page. Adding one means: a value here, an entry in docs-nav.ts, an MDX file and a loader in docs-content.ts. */
export type DocId = "introduction" | "installation" | "theming" | "button" | "text" | "floating-toolbar" | "frame" | "button-group"

export type DocItem = {
  id: DocId
  label: string
  /** Short tag shown next to the link, e.g. "New". */
  badge?: string
}

export type DocGroup = {
  group: string
  items: DocItem[]
}

/** A heading listed in the "On this page" table of contents. */
export type TocItem = {
  id: string
  label: string
}

export type ApiRow = {
  prop: string
  type: string
  default?: string
  description: string
}

export type DemoLayout = "center" | "stack"

export type DemoEntry = {
  component: ComponentType
  /** Path under src/features/docs/demos/, shown as the demo's source. */
  file: string
  layout?: DemoLayout
}

export type DemoName = keyof typeof demoRegistry
export type ApiTableName = keyof typeof apiTables

export type MdxModule = { default: ComponentType }

// ── Component props ─────────────────────────────────────────────────────────

export type DocsPageProps = { id: DocId }
export type DocsSidebarProps = { current: DocId }
export type DocsSidebarGroupProps = { group: DocGroup; current: DocId; showCount: boolean }
export type DocsSidebarLinkProps = { item: DocItem; active: boolean }
export type DocsTocProps = { items: TocItem[] }
export type DocsBreadcrumbProps = { title: string }
export type DocsPagerProps = { current: DocId }
export type DocsPagerLinkProps = { item: DocItem; direction: "previous" | "next" }

export type PreviewPaneProps = { children: ReactNode; layout?: DemoLayout }
export type CodeBlockProps = { code: string }
export type DemoProps = { name: DemoName }
export type ApiTableProps = { name: ApiTableName }
export type ComponentBadgeProps = { number: string; isNew?: boolean }
export type DependencyListProps = { items: string[] }
export type LinkCardProps = { href: string; title: string; children: ReactNode }
export type InfoGridProps = { items: { label: string; value: string }[] }
export type LeadProps = { children: ReactNode }

export type MdxHeadingProps = ComponentProps<"h2">
export type MdxElementProps<T extends keyof JSX.IntrinsicElements> = ComponentProps<T>
