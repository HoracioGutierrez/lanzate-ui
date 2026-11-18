import type { ComponentProps, ReactNode } from "react"
import type { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@ui-sdk/react/collapsible"

/** Scale of the frame: `sm` for cards and list items, `lg` for whole page sections. */
export type FrameSize = "sm" | "md" | "lg"

/** Corner of the frame a registration mark sits on, in logical (RTL-aware) terms. */
export type FrameCorner = "top-start" | "top-end" | "bottom-start" | "bottom-end"

export type FrameOpenChange = ComponentProps<typeof Collapsible>["onOpenChange"]

export type FrameProps = Omit<ComponentProps<"div">, "className" | "children"> & {
  className?: string
  children?: ReactNode
  /** Scales the corner marks and the content padding. Defaults to "md". */
  size?: FrameSize
  /** Lets the user show and hide the content by pressing the header's title. */
  collapsible?: boolean
  /** Whether the content is shown, when controlled. Only with `collapsible`. */
  open?: boolean
  /** Whether the content is shown at first, when uncontrolled. Defaults to true. */
  defaultOpen?: boolean
  /** Runs when the user shows or hides the content. */
  onOpenChange?: FrameOpenChange
}

export type FrameHeaderProps = Omit<ComponentProps<"div">, "className"> & {
  className?: string
  /** Minimum height of the header. Defaults to the frame's `size`. */
  height?: FrameSize
}

export type FrameTitleProps = Omit<ComponentProps<typeof CollapsibleTrigger>, "className" | "children"> & {
  className?: string
  /** Free content: text, icons, badges. */
  children?: ReactNode
}

export type FrameContentProps = Omit<ComponentProps<"div">, "className"> &
  Pick<ComponentProps<typeof CollapsiblePanel>, "keepMounted" | "hiddenUntilFound"> & {
    /** Classes for the padded box around the content. */
    className?: string
  }

export type FrameContextValue = {
  size: FrameSize
  collapsible: boolean
}
