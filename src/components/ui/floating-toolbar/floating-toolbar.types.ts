import type { ComponentProps, ReactNode } from "react"
import type { Menu, MenuContent, MenuItem, MenuSub, MenuSubContent, MenuSubTrigger } from "@ui-sdk/react/menu"
import type { Toolbar, ToolbarButton, ToolbarSeparator } from "@ui-sdk/react/toolbar"

/** Where the toolbar floats: pinned to the bottom or top of the viewport, or in the page flow. */
export type FloatingToolbarPlacement = "bottom" | "top" | "inline"

export type FloatingToolbarProps = Omit<ComponentProps<typeof Toolbar>, "className" | "orientation" | "children"> & {
  className?: string
  children?: ReactNode
  /** Defaults to "bottom". */
  placement?: FloatingToolbarPlacement
  /** Classes for the positioning wrapper around the toolbar. */
  wrapperClassName?: string
}

export type FloatingToolbarButtonProps = Omit<ComponentProps<typeof ToolbarButton>, "className" | "children"> & {
  className?: string
  /** Accessible name of the icon-only button. */
  label: string
  /** The icon. Rendered with `aria-hidden`. */
  children: ReactNode
}

export type FloatingToolbarSeparatorProps = Omit<ComponentProps<typeof ToolbarSeparator>, "className"> & {
  className?: string
}

export type FloatingToolbarMenuProps = ComponentProps<typeof Menu>

export type FloatingToolbarMenuTriggerProps = FloatingToolbarButtonProps

export type FloatingToolbarMenuContentProps = Omit<ComponentProps<typeof MenuContent>, "className" | "side"> & {
  className?: string
  /** Side of the toolbar the panel opens on. Defaults to "top", or "bottom" for a toolbar placed at the top. */
  side?: FloatingToolbarSide
}

export type FloatingToolbarMenuItemProps = Omit<ComponentProps<typeof MenuItem>, "className" | "children"> & {
  className?: string
  children?: ReactNode
  /** Decorative icon before the text. */
  icon?: ReactNode
}

/** Uncontrolled: the back item and the menu keys open and close it. Use `onOpenChange` to observe it. */
export type FloatingToolbarSubmenuProps = Omit<ComponentProps<typeof MenuSub>, "open">

export type FloatingToolbarSubmenuTriggerProps = Omit<ComponentProps<typeof MenuSubTrigger>, "className" | "children"> & {
  className?: string
  children?: ReactNode
  /** Decorative icon before the text. */
  icon?: ReactNode
}

export type FloatingToolbarSubmenuContentProps = Omit<
  ComponentProps<typeof MenuSubContent>,
  "className" | "children" | "side" | "align" | "anchor" | "sideOffset" | "alignOffset"
> & {
  className?: string
  children?: ReactNode
  /** Heading shown under the back item; also names the group of sub-items. */
  title?: string
  /** Text of the item that closes this panel and returns to the previous one. Defaults to "Back". */
  backLabel?: string
}

export type FloatingToolbarSubmenuState = {
  open: boolean
  setOpen: (open: boolean) => void
}

export type FloatingToolbarSide = NonNullable<ComponentProps<typeof MenuContent>["side"]>

export type FloatingToolbarContextValue = {
  placement: FloatingToolbarPlacement
}

export type FloatingToolbarMenuContentContextValue = {
  side: FloatingToolbarSide
}
