import type { ComponentProps, ReactNode } from "react"

import type { ButtonColor, ButtonPadding, ButtonProps } from "@/components/ui/button/button.types"

/** `single` switches between options (one value, sliding indicator); `multiple` toggles filters. */
export type ButtonGroupSelection = "single" | "multiple"

export type ButtonGroupOrientation = "horizontal" | "vertical"

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
  /** Size of every item, as the Button's `padding`. Defaults to `"sm"`. */
  padding?: ButtonPadding
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
export type ButtonGroupSingleInternalProps = Omit<ButtonGroupSingleProps, "color" | "padding"> & {
  hasAll: boolean
}

export type ButtonGroupAllProps = Omit<ButtonGroupItemProps, "value">

export type ButtonGroupLedProps = {
  on: boolean
}

export type ButtonGroupContextValue = {
  selection: ButtonGroupSelection
  color: ButtonColor
  padding: ButtonPadding
  /** Called by ButtonGroupAll on mount; returns its unregister. */
  registerAll: () => () => void
}

export type UseControllableValueOptions<T> = {
  value: T | undefined
  defaultValue: T
  onValueChange: ((value: T) => void) | undefined
}
