import type { ComponentProps, ReactNode } from "react"

import type { ButtonColor, ButtonProps } from "@/components/ui/button/button.types"

/** `single` switches between options (one value, sliding indicator); `multiple` toggles filters. */
export type ButtonGroupSelection = "single" | "multiple"

export type ButtonGroupOrientation = "horizontal" | "vertical"

/** Scales the tray, its items (text, icons, padding) and the LEDs together. */
export type ButtonGroupSize = "xs" | "md" | "lg"

export type ButtonGroupBaseProps = Omit<
  ComponentProps<"div">,
  "children" | "className" | "defaultValue" | "onChange" | "dir" | "color"
> & {
  /** Names the group for screen readers and agents. */
  "aria-label": string
  className?: string
  children?: ReactNode
  /** Color of the lit items and the indicator. Defaults to `"primary"`. */
  color?: ButtonColor
  /** Size of the tray and every item. Defaults to `"md"`. */
  size?: ButtonGroupSize
  orientation?: ButtonGroupOrientation
  disabled?: boolean
}

export type ButtonGroupSingleProps = ButtonGroupBaseProps & {
  selection: "single"
  /** The chosen item's value. `null` means nothing chosen, which checks `ButtonGroupAll`. */
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  /** Submits the chosen value under this name. */
  name?: string
  required?: boolean
}

export type ButtonGroupMultipleProps = ButtonGroupBaseProps & {
  selection: "multiple"
  /** The pressed items' values. Empty means nothing pressed, which presses `ButtonGroupAll`. */
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

export type ButtonGroupProps = ButtonGroupSingleProps | ButtonGroupMultipleProps

export type ButtonGroupItemProps = Pick<
  ButtonProps,
  "icon" | "startIcon" | "endIcon" | "tooltip" | "disabled" | "aria-label" | "className" | "children"
> & {
  value: string
}

/** What ButtonGroup passes to its single-selection body. */
export type ButtonGroupSingleInternalProps = Omit<ButtonGroupSingleProps, "color" | "size"> & {
  hasAll: boolean
  /** The hover highlight, rendered first so it sits under the selection indicator. */
  highlight: ReactNode
}

/** What ButtonGroup passes to its multiple-selection body. */
export type ButtonGroupMultipleInternalProps = Omit<ButtonGroupMultipleProps, "color" | "size"> & {
  highlight: ReactNode
}

/** Where the hover highlight sits, in px from the group's padding box. */
export type ButtonGroupHighlightState = {
  left: number
  top: number
  width: number
  height: number
  /** A mouse is over an item of the group (touch has no hover). */
  visible: boolean
  /** Just appeared: placed without sliding from where it last was. */
  instant: boolean
}

export type ButtonGroupHighlightProps = {
  state: ButtonGroupHighlightState
}

export type ButtonGroupAllProps = Omit<ButtonGroupItemProps, "value">

export type ButtonGroupLedProps = {
  on: boolean
  size: ButtonGroupSize
}

export type ButtonGroupContextValue = {
  selection: ButtonGroupSelection
  color: ButtonColor
  size: ButtonGroupSize
  /** Called by ButtonGroupAll on mount; returns its unregister. */
  registerAll: () => () => void
}

export type UseControllableValueOptions<T> = {
  value: T | undefined
  defaultValue: T
  onValueChange: ((value: T) => void) | undefined
}
