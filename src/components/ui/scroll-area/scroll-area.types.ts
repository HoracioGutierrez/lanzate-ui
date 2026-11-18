import type { ComponentProps } from "react"
import type {
  ScrollArea as ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaViewport,
} from "@ui-sdk/react/scroll-area"

export type ScrollAreaOrientation = "vertical" | "horizontal" | "both"

export type ScrollAreaProps = Omit<ComponentProps<typeof ScrollAreaRoot>, "className"> & {
  className?: string
  /** Which axes get a scrollbar. Defaults to "vertical". */
  orientation?: ScrollAreaOrientation
  /** Props for the scrollable viewport, e.g. `role` and `aria-label` to name the region. */
  viewportProps?: ComponentProps<typeof ScrollAreaViewport>
}

export type ScrollBarProps = Omit<ComponentProps<typeof ScrollAreaScrollbar>, "className"> & {
  className?: string
}
