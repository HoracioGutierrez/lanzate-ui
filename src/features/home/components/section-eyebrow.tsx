import type { SectionEyebrowProps } from "../home.types"

/** Small mono label with a brand dot, above a section title. */
export function SectionEyebrow({ children }: SectionEyebrowProps) {
  return (
    <p className="mb-4 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
      {children}
    </p>
  )
}
