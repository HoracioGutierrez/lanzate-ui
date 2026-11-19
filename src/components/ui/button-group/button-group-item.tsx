"use client"

import { use } from "react"
import { SegmentedControlItem } from "@ui-sdk/react/segmented-control"
import { Toggle } from "@ui-sdk/react/toggle"

// Import other registry components by exact file, not their folder's index.ts.
import { Button } from "@/components/ui/button/button"
import { cn } from "@/lib/cn"

import { ButtonGroupContext } from "./button-group.constants"
import type { ButtonGroupItemProps } from "./button-group.types"
import { buttonGroupItemClasses } from "./button-group.variants"
import { ButtonGroupLed } from "./button-group-led"

// ui-sdk's item keeps the behavior (radio or pressed toggle, arrow keys); the registry Button draws it.
export function ButtonGroupItem({
  value,
  icon,
  startIcon,
  endIcon,
  tooltip,
  disabled,
  className,
  children,
  "aria-label": ariaLabel,
  ...props
}: ButtonGroupItemProps) {
  const context = use(ButtonGroupContext)
  if (context == null) throw new Error("ButtonGroupItem must be inside a ButtonGroup.")
  const { selection, color, padding } = context
  // An icon already marks the item, so the LED only shows on text-only items.
  const hasIcon = startIcon != null || endIcon != null

  const draw = (partProps: object, on: boolean) => (
    <Button
      {...partProps}
      {...props}
      variant={on ? "solid" : "ghost"}
      color={on ? color : "muted"}
      padding={padding}
      radius="none"
      icon={icon}
      startIcon={startIcon}
      endIcon={endIcon}
      tooltip={tooltip}
      aria-label={ariaLabel}
      tapAnimation={false}
      className={cn(buttonGroupItemClasses[selection], className)}
    >
      {icon == null && (
        <>
          {!hasIcon && <ButtonGroupLed on={on} />}
          {children}
        </>
      )}
    </Button>
  )

  // A disabled radio leaves ui-sdk's roving focus, but the Button keeps a disabled item with a
  // tooltip focusable (aria-disabled), which would add a second tab stop to the radio group.
  // tabIndex -1 keeps it out; its tooltip still opens on hover.
  return selection === "single" ? (
    <SegmentedControlItem
      value={value}
      disabled={disabled}
      render={(partProps, state) => draw(disabled ? { ...partProps, tabIndex: -1 } : partProps, state.checked)}
    />
  ) : (
    <Toggle value={value} disabled={disabled} render={(partProps, state) => draw(partProps, state.pressed)} />
  )
}
