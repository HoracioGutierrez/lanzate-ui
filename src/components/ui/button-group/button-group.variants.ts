import type { ButtonColor, ButtonPadding } from "@/components/ui/button/button.types"

import type { ButtonGroupOrientation, ButtonGroupSelection, ButtonGroupSize } from "./button-group.types"

// Primary-colored brackets on two opposite corners, like the crop marks on a technical drawing.
// Duplicated from floating-toolbar on purpose: each registry component installs on its own.
const cornerMarkClasses = [
  "before:pointer-events-none before:absolute before:-top-px before:-left-px before:size-2 before:rounded-tl-sm before:border-t before:border-l before:border-primary",
  "after:pointer-events-none after:absolute after:-right-px after:-bottom-px after:size-2 after:rounded-br-sm after:border-r after:border-b after:border-primary",
].join(" ")

export const buttonGroupClasses = [
  "relative isolate inline-flex max-w-full flex-wrap items-center rounded-sm border border-border bg-card",
  cornerMarkClasses,
].join(" ")

// The tray's inset and the gap between items grow with the items.
export const buttonGroupSizeClasses = {
  xs: "gap-0.5 p-0.5",
  md: "gap-1 p-1",
  lg: "gap-1.5 p-1.5",
} satisfies Record<ButtonGroupSize, string>

// Each size is a step of the Button's padding scale, which also sets its text size; icon-only
// items get the matching square padding from the Button.
export const buttonGroupItemPadding = {
  xs: "xs",
  md: "sm",
  lg: "md",
} satisfies Record<ButtonGroupSize, ButtonPadding>

export const buttonGroupOrientationClasses = {
  horizontal: "flex-row",
  vertical: "flex-col items-stretch",
} satisfies Record<ButtonGroupOrientation, string>

// The indicator sits on the group, outside any Button, so the group sets the same --btn-* variables
// the Button's color does. Values duplicated from button.variants.ts.
export const buttonGroupColorClasses = {
  primary: "[--btn-color:var(--primary)] [--btn-accent:var(--primary)]",
  secondary: "[--btn-color:var(--secondary)] [--btn-accent:var(--secondary-foreground)]",
  muted: "[--btn-color:var(--muted)] [--btn-accent:var(--muted-foreground)]",
  info: "[--btn-color:var(--info)] [--btn-accent:var(--info)]",
  warning: "[--btn-color:var(--warning)] [--btn-accent:var(--warning)]",
  success: "[--btn-color:var(--success)] [--btn-accent:var(--success)]",
  error: "[--btn-color:var(--error)] [--btn-accent:var(--error)]",
} satisfies Record<ButtonColor, string>

// Slides to the chosen item with ui-sdk's measurements; marked like an open menu trigger on the
// toolbar and frame. Nothing chosen: ui-sdk gives it no box.
export const buttonGroupIndicatorClasses = [
  "absolute -z-10 top-(--segmented-control-indicator-top) left-(--segmented-control-indicator-left)",
  "w-(--segmented-control-indicator-width) h-(--segmented-control-indicator-height)",
  "bg-(--btn-accent)/15 inset-ring inset-ring-(--btn-accent)/50",
  "transition-[left,top,width,height] duration-200 ease-spring motion-reduce:transition-none",
].join(" ")

// The tray clips an outer ring, so the focus ring goes inside.
const itemBaseClasses =
  "group/item focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:inset-ring focus-visible:inset-ring-ring"

// In single, the checked item waits for the indicator to land, then its fill fades in over it.
export const buttonGroupItemClasses = {
  single: `${itemBaseClasses} data-checked:delay-200 motion-reduce:data-checked:delay-0`,
  multiple: itemBaseClasses,
} satisfies Record<ButtonGroupSelection, string>

// A square LED before the label: dim when off, so items don't shift when they light up.
export const buttonGroupLedClasses =
  "shrink-0 bg-current opacity-25 transition-opacity duration-150 data-on:opacity-100 motion-reduce:transition-none"

export const buttonGroupLedSizeClasses = {
  xs: "size-1",
  md: "size-1.5",
  lg: "size-2",
} satisfies Record<ButtonGroupSize, string>
