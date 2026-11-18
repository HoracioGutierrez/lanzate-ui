import type { MdxElementProps } from "../types/docs.types"

export function MdxOl({ children }: MdxElementProps<"ol">) {
  return <ol className="mt-3 max-w-2xl list-decimal space-y-1.5 pl-5 text-base leading-relaxed text-muted-foreground">{children}</ol>
}
