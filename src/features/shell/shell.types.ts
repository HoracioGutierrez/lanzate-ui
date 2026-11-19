import type { ComponentProps } from "react"

export type IconProps = ComponentProps<"svg">

export type HiddenWhenFloatingProps = {
  /** True while the header is a floating pill; the element fades out and leaves the tab order. */
  hidden: boolean
}

export type CopyButtonProps = {
  /** Text copied to the clipboard. */
  value: string
  /** Accessible name. Defaults to "Copy". */
  label?: string
  className?: string
}

/** What the reader chose: a fixed theme, or whatever the operating system uses. */
export type ThemePreference = "light" | "dark" | "system"
