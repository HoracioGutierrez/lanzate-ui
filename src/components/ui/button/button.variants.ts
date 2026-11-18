import { cva } from "class-variance-authority"

import type {
  ButtonColor,
  ButtonEffect,
  ButtonIconSize,
  ButtonMobile,
  ButtonPadding,
  ButtonRadius,
  ButtonTextSize,
  ButtonVariant,
} from "./button.types"

// Every variant has a 1px border (transparent unless the variant colors it), so all
// variants with the same padding are the same size.

// Each color sets three local variables the variants read:
// --btn-color (fill), --btn-fg (text on the fill), --btn-accent (text and borders on transparent variants).
const colorClasses = {
  primary: "[--btn-color:var(--primary)] [--btn-fg:var(--primary-foreground)] [--btn-accent:var(--primary)]",
  secondary: "[--btn-color:var(--secondary)] [--btn-fg:var(--secondary-foreground)] [--btn-accent:var(--secondary-foreground)]",
  muted: "[--btn-color:var(--muted)] [--btn-fg:var(--muted-foreground)] [--btn-accent:var(--muted-foreground)]",
  info: "[--btn-color:var(--info)] [--btn-fg:var(--info-foreground)] [--btn-accent:var(--info)]",
  warning: "[--btn-color:var(--warning)] [--btn-fg:var(--warning-foreground)] [--btn-accent:var(--warning)]",
  success: "[--btn-color:var(--success)] [--btn-fg:var(--success-foreground)] [--btn-accent:var(--success)]",
  error: "[--btn-color:var(--error)] [--btn-fg:var(--error-foreground)] [--btn-accent:var(--error)]",
} satisfies Record<ButtonColor, string>

const variantClasses = {
  solid: "bg-(--btn-color) text-(--btn-fg) hover:bg-(--btn-color)/90",
  outline: "border border-(--btn-accent) text-(--btn-accent) bg-transparent hover:bg-(--btn-accent)/10",
  ghost: "bg-transparent text-(--btn-accent) hover:bg-(--btn-accent)/10",
  soft: "bg-(--btn-accent)/15 text-(--btn-accent) hover:bg-(--btn-accent)/25",
  dashed: "border border-dashed border-(--btn-accent) text-(--btn-accent) bg-transparent hover:bg-(--btn-accent)/10",
  // Neutral: ignores `color`, uses the theme's own border, card and accent.
  subtle: "border border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground",
  surface: [
    "bg-(--btn-color) text-(--btn-fg) hover:bg-(--btn-color)/90",
    "bg-(image:--button-surface-gradient) shadow-button-surface",
    "active:bg-(image:--button-surface-gradient-active) active:shadow-button-surface-active active:translate-y-px",
  ].join(" "),
} satisfies Record<ButtonVariant, string>

const effectClasses = {
  none: "",
  elevated: "shadow-elevated hover:shadow-elevated-hover active:shadow-elevated-active",
  glow: "shadow-button-glow hover:shadow-button-glow-hover active:shadow-button-glow-active",
} satisfies Record<ButtonEffect, string>

const paddingClasses = {
  none: "px-0 py-0 text-sm",
  xs: "px-2 py-1 text-xs",
  sm: "px-3 py-1.5 text-sm",
  base: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-6 py-3 text-lg",
  xl: "px-8 py-4 text-xl",
} satisfies Record<ButtonPadding, string>

/** Padding for icon-only buttons: the same as text buttons on every side, so they come out square and as tall. */
export const squarePaddingClasses = {
  none: "p-0",
  xs: "p-1",
  sm: "p-1.5",
  base: "p-2",
  md: "p-2.5",
  lg: "p-3",
  xl: "p-4",
} satisfies Record<ButtonPadding, string>

const radiusClasses = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
} satisfies Record<ButtonRadius, string>

const textSizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  display: "text-display",
} satisfies Record<ButtonTextSize, string>

const iconSizeClasses = {
  xs: "[&_svg]:size-[0.75em]",
  sm: "[&_svg]:size-[0.875em]",
  base: "[&_svg]:size-[1em]",
  md: "[&_svg]:size-[1.25em]",
  lg: "[&_svg]:size-[1.5em]",
  xl: "[&_svg]:size-[2em]",
} satisfies Record<ButtonIconSize, string>

const mobileClasses = {
  "only-icon": "",
  "full-width": "w-full sm:w-auto",
  hidden: "hidden sm:inline-flex",
} satisfies Record<ButtonMobile, string>

/** Press feedback: a small scale-down on a springy curve. */
export const tapClasses = "ease-spring motion-safe:active:not-data-disabled:not-data-pending:scale-[0.97]"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 border border-transparent font-medium transition-[color,background-color,border-color,box-shadow,opacity,scale,translate] duration-150 ease-out motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none data-disabled:opacity-50 aria-disabled:cursor-not-allowed data-pending:cursor-wait [&_svg]:size-[1em] [&_svg]:shrink-0",
  {
    variants: {
      color: colorClasses,
      variant: variantClasses,
      effect: effectClasses,
      padding: paddingClasses,
      radius: radiusClasses,
      textSize: textSizeClasses,
      iconSize: iconSizeClasses,
      mobile: mobileClasses,
    },
    defaultVariants: {
      color: "primary",
      variant: "solid",
      effect: "none",
      padding: "base",
      radius: "md",
    },
  }
)
