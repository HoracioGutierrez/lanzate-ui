import type { ComponentProps, ReactNode } from "react"
import type { Button } from "@ui-sdk/react/button"
import type { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@ui-sdk/react/collapsible"
import type { IntentColor } from "@/lib/tokens.types"
import type { Menu, MenuItem, MenuSeparator, MenuSub, MenuSubContent, MenuSubTrigger } from "@ui-sdk/react/menu"

/** Scale of the frame: `sm` for cards and list items, `lg` for whole page sections. */
export type FrameSize = "sm" | "md" | "lg"

/** Every intent color defined in the tokens. `primary` is the plain card; the rest tint the background. */
export type FrameColor = IntentColor

/** Corner of the frame a registration mark sits on, in logical (RTL-aware) terms. */
export type FrameCorner = "top-start" | "top-end" | "bottom-start" | "bottom-end"

export type FrameOpenChange = ComponentProps<typeof Collapsible>["onOpenChange"]

export type FrameProps = Omit<ComponentProps<"div">, "className" | "children" | "color"> & {
  className?: string
  children?: ReactNode
  /** Color of the corner marks; every color but `primary` also tints the background and borders. Defaults to "primary". */
  color?: FrameColor
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
  /** Height of the header; its buttons scale with it. Defaults to the frame's `size`. */
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

export type FrameBackProps = Omit<ComponentProps<typeof Button>, "className" | "children"> & {
  className?: string
  /** Accessible name of the icon-only button. Defaults to "Back". */
  label?: string
}

export type FrameMenuProps = Omit<ComponentProps<typeof Menu>, "children"> & {
  /** Accessible name of the three-dot button. Required: screen readers and agents find the menu by it. */
  label: string
  /** Classes for the three-dot button. */
  className?: string
  /** Classes for the panel of items. */
  contentClassName?: string
  /** Items, separators and submenus. */
  children?: ReactNode
}

export type FrameMenuItemProps = Omit<ComponentProps<typeof MenuItem>, "className" | "children"> & {
  className?: string
  children?: ReactNode
  /** Decorative icon before the text. */
  icon?: ReactNode
}

export type FrameMenuSeparatorProps = Omit<ComponentProps<typeof MenuSeparator>, "className"> & {
  className?: string
}

export type FrameSubmenuProps = ComponentProps<typeof MenuSub>

export type FrameSubmenuTriggerProps = Omit<ComponentProps<typeof MenuSubTrigger>, "className" | "children"> & {
  className?: string
  children?: ReactNode
  /** Decorative icon before the text. */
  icon?: ReactNode
}

export type FrameSubmenuContentProps = Omit<ComponentProps<typeof MenuSubContent>, "className"> & {
  className?: string
}

export type FrameContextValue = {
  size: FrameSize
  collapsible: boolean
}
