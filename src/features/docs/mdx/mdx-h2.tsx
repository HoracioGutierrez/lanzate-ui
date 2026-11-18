import { Text } from "@/components/ui/text"

import type { MdxElementProps } from "../types/docs.types"

/** Section heading. Its id (from rehype-slug) is what the table of contents links to. */
export function MdxH2({ children, id }: MdxElementProps<"h2">) {
  return (
    <Text render={<h2 id={id} />} variant="heading" size="2xl" className="mt-12 scroll-mt-20">
      {children}
    </Text>
  )
}
