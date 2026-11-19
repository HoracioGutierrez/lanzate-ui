import { cva } from "class-variance-authority"

import type { BadgeColor, BadgeFont, BadgeRadius, BadgeSize, BadgeTagVariant, BadgeVariant } from "./badge.types"

// Each color sets three local variables the variants read:
// --badge-color (fill), --badge-fg (text on the fill), --badge-accent (text, borders and dots on light
// fills: the intent's -text token, which keeps 4.5:1 where the fill color wouldn't).
// The tag and the dot set their own, so they never inherit the badge's color.
const colorClasses = {
  primary: "[--badge-color:var(--primary)] [--badge-fg:var(--primary-foreground)] [--badge-accent:var(--primary-text)]",
  secondary: "[--badge-color:var(--secondary)] [--badge-fg:var(--secondary-foreground)] [--badge-accent:var(--secondary-text)]",
  muted: "[--badge-color:var(--muted)] [--badge-fg:var(--muted-text)] [--badge-accent:var(--muted-text)]",
  info: "[--badge-color:var(--info)] [--badge-fg:var(--info-foreground)] [--badge-accent:var(--info-text)]",
  warning: "[--badge-color:var(--warning)] [--badge-fg:var(--warning-foreground)] [--badge-accent:var(--warning-text)]",
  success: "[--badge-color:var(--success)] [--badge-fg:var(--success-foreground)] [--badge-accent:var(--success-text)]",
  error: "[--badge-color:var(--error)] [--badge-fg:var(--error-foreground)] [--badge-accent:var(--error-text)]",
} satisfies Record<BadgeColor, string>

// The `[a&]` / `[button&]` hovers apply only when the badge renders as a link or button.
const variantClasses = {
  solid: "bg-(--badge-color) text-(--badge-fg) [a&]:hover:bg-(--badge-color)/90 [button&]:hover:bg-(--badge-color)/90",
  soft: "bg-(--badge-accent)/15 text-(--badge-accent) [a&]:hover:bg-(--badge-accent)/25 [button&]:hover:bg-(--badge-accent)/25",
  outline: "border border-(--badge-accent)/40 text-(--badge-accent) [a&]:hover:bg-(--badge-accent)/10 [button&]:hover:bg-(--badge-accent)/10",
  surface: "border border-border bg-card/70 text-(--badge-accent) shadow-soft backdrop-blur [a&]:hover:bg-accent [button&]:hover:bg-accent",
} satisfies Record<BadgeVariant, string>

// A leading BadgeTag pulls the start padding in, so the pill hugs the chip.
const sizeClasses = {
  sm: "gap-1 px-1 py-0.5 text-3xs has-[>[data-slot=badge-tag]:first-child]:ps-0.5",
  md: "gap-2 px-3 py-1 text-xs font-medium has-[>[data-slot=badge-tag]:first-child]:ps-1",
} satisfies Record<BadgeSize, string>

const radiusClasses = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  full: "rounded-full",
} satisfies Record<BadgeRadius, string>

const fontClasses = {
  sans: "font-sans",
  mono: "font-mono",
} satisfies Record<BadgeFont, string>

export const badgeVariants = cva(
  [
    "group/badge inline-flex w-fit shrink-0 items-center whitespace-nowrap",
    "[&_svg]:size-3 [&_svg]:shrink-0",
    "transition-[color,background-color,border-color] duration-150 ease-out motion-reduce:transition-none",
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "[button&]:cursor-pointer",
  ].join(" "),
  {
    variants: {
      color: colorClasses,
      variant: variantClasses,
      size: sizeClasses,
      radius: radiusClasses,
      font: fontClasses,
    },
    defaultVariants: { color: "primary", variant: "soft", size: "md", radius: "full" },
  }
)

const tagVariantClasses = {
  solid: "bg-(--badge-color) text-(--badge-fg)",
  soft: "bg-(--badge-accent)/15 text-(--badge-accent)",
  outline: "border border-(--badge-accent)/40 text-(--badge-accent)",
} satisfies Record<BadgeTagVariant, string>

// The tag follows its badge's size and radius; outside a badge it's a small round chip.
export const badgeTagVariants = cva(
  [
    "inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-3xs font-semibold tracking-wide uppercase",
    "group-data-[size=sm]/badge:px-1 group-data-[size=sm]/badge:py-0",
    "group-data-[radius=none]/badge:rounded-none group-data-[radius=sm]/badge:rounded-sm group-data-[radius=md]/badge:rounded-sm",
  ].join(" "),
  {
    variants: {
      color: colorClasses,
      variant: tagVariantClasses,
    },
    defaultVariants: { color: "primary", variant: "solid" },
  }
)

export const badgeDotVariants = cva(
  "relative inline-block size-1.5 shrink-0 rounded-full bg-(--badge-accent)",
  {
    variants: {
      color: colorClasses,
      pulse: {
        true: "before:absolute before:inset-0 before:rounded-full before:bg-inherit motion-safe:before:animate-ping",
        false: "",
      },
    },
    defaultVariants: { color: "primary", pulse: false },
  }
)
