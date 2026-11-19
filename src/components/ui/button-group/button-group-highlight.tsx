import type { CSSProperties } from "react"

import type { ButtonGroupHighlightProps } from "./button-group.types"
import { buttonGroupHighlightClasses } from "./button-group.variants"

/** The hover fill, shared by every item so it slides from one to the next. */
export function ButtonGroupHighlight({ state }: ButtonGroupHighlightProps) {
  return (
    <span
      aria-hidden="true"
      data-slot="button-group-highlight"
      data-visible={state.visible ? "" : undefined}
      data-instant={state.instant ? "" : undefined}
      className={buttonGroupHighlightClasses}
      style={
        {
          "--button-group-highlight-left": `${state.left}px`,
          "--button-group-highlight-top": `${state.top}px`,
          "--button-group-highlight-width": `${state.width}px`,
          "--button-group-highlight-height": `${state.height}px`,
        } as CSSProperties
      }
    />
  )
}
