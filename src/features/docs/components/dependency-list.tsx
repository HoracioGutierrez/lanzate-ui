import type { DependencyListProps } from "../types/docs.types"

/** The npm packages a component installs. */
export function DependencyList({ items }: DependencyListProps) {
  return (
    <ul aria-label="Dependencies" className="mt-6 flex flex-wrap items-center gap-2 text-xs">
      {items.map((dep) => (
        <li key={dep} className="rounded border border-border bg-card px-2 py-1 font-mono text-muted-foreground">
          {dep}
        </li>
      ))}
    </ul>
  )
}
