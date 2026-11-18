import type { MdxElementProps } from "../types/docs.types"

export function MdxUl({ children }: MdxElementProps<"ul">) {
  return <ul className="mt-3 max-w-2xl list-disc space-y-1.5 pl-5 text-base leading-relaxed text-muted-foreground">{children}</ul>
}
