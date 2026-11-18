import { animateIn } from "@ui-sdk/core"
import { Loader2 } from "lucide-react"

/** Loading indicator shown in place of the leading icon. Enters with ui-sdk's starting style. */
export function ButtonSpinner() {
  return (
    <span
      ref={(el) => (el ? animateIn(el) : undefined)}
      data-slot="button-spinner"
      className="inline-flex transition-[scale,opacity] duration-200 ease-out data-starting-style:scale-0 data-starting-style:opacity-0 motion-reduce:transition-none"
    >
      <Loader2 className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
    </span>
  )
}
