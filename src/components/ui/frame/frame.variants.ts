import type { FrameColor, FrameCorner, FrameSize } from "./frame.types"

export const frameClasses = "relative flex min-w-0 flex-col border border-border bg-card text-card-foreground [--frame-divider:var(--border)]"

// The Collapsible root carries data-open / data-closed; `contents` keeps it out of the layout.
export const frameCollapsibleClasses = "group/frame contents"

// `--frame-accent` drives the corner marks. A tinted frame keeps bg-card underneath and lays a
// translucent wash of the accent over it, so it reads on any page background.
const frameTintClasses =
  "bg-linear-to-b from-(--frame-accent)/10 to-(--frame-accent)/10 border-(--frame-accent)/40 [--frame-divider:--alpha(var(--frame-accent)/30%)]"

export const frameColorClasses = {
  primary: "[--frame-accent:var(--primary)]",
  error: `[--frame-accent:var(--error)] ${frameTintClasses}`,
  warning: `[--frame-accent:var(--warning)] ${frameTintClasses}`,
  info: `[--frame-accent:var(--info)] ${frameTintClasses}`,
  success: `[--frame-accent:var(--success)] ${frameTintClasses}`,
  secondary: `[--frame-accent:var(--secondary-foreground)] ${frameTintClasses}`,
  muted: `[--frame-accent:var(--muted-foreground)] ${frameTintClasses}`,
} satisfies Record<FrameColor, string>

export const frameCorners = ["top-start", "top-end", "bottom-start", "bottom-end"] as const satisfies readonly FrameCorner[]

// Registration marks over the border on all four corners, like the sheet corners of a technical drawing.
const frameCornerBaseClasses = "pointer-events-none absolute z-10 border-(--frame-accent)"

export const frameCornerClasses = {
  "top-start": `${frameCornerBaseClasses} -top-px -start-px border-t border-s`,
  "top-end": `${frameCornerBaseClasses} -top-px -end-px border-t border-e`,
  "bottom-start": `${frameCornerBaseClasses} -bottom-px -start-px border-b border-s`,
  "bottom-end": `${frameCornerBaseClasses} -bottom-px -end-px border-b border-e`,
} satisfies Record<FrameCorner, string>

export const frameCornerSizeClasses = {
  sm: "size-2",
  md: "size-3",
  lg: "size-4",
} satisfies Record<FrameSize, string>

export const frameContentPaddingClasses = {
  sm: "p-3",
  md: "p-4",
  lg: "p-6 md:p-10",
} satisfies Record<FrameSize, string>

export const frameHeaderHeightClasses = {
  sm: "min-h-9",
  md: "min-h-11",
  lg: "min-h-14",
} satisfies Record<FrameSize, string>

// The border under the header goes away while the content is hidden, leaving one clean box.
export const frameHeaderClasses =
  "flex min-w-0 items-center gap-1 border-b border-(--frame-divider) px-1 group-data-closed/frame:border-b-transparent"

export const frameTitleClasses =
  "flex min-w-0 flex-1 items-center gap-2 self-stretch px-2 text-start font-mono text-xs tracking-wide uppercase"

export const frameTitleTriggerClasses = [
  "cursor-pointer outline-none select-none",
  "transition-colors duration-150 ease-out motion-reduce:transition-none",
  "hover:text-primary focus-visible:inset-ring focus-visible:inset-ring-ring",
].join(" ")

// A block, not a flex row: text-overflow only draws the ellipsis on block containers.
export const frameTitleLabelClasses = "block min-w-0 flex-1 truncate"

export const frameTitleChevronClasses =
  "size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out motion-reduce:transition-none group-data-closed/frame:-rotate-90 rtl:group-data-closed/frame:rotate-90"

export const frameContentPanelClasses = [
  "h-(--collapsible-panel-height) overflow-hidden",
  "transition-[height] duration-200 ease-out motion-reduce:transition-none",
  "data-starting-style:h-0 data-ending-style:h-0",
].join(" ")

export const frameIconButtonClasses = [
  "inline-flex size-8 shrink-0 cursor-pointer items-center justify-center text-muted-foreground outline-none",
  "transition-[background-color,color] duration-150 ease-out motion-reduce:transition-none",
  "hover:bg-accent hover:text-accent-foreground active:bg-accent/70",
  "focus-visible:inset-ring focus-visible:inset-ring-ring",
  "data-open:bg-primary/10 data-open:text-primary",
  "disabled:pointer-events-none disabled:opacity-50",
  "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:stroke-[1.75]",
].join(" ")

export const frameBackIconClasses = "rtl:-scale-x-100"

// Menu look duplicated from floating-toolbar on purpose: each registry component installs on its own.
// Square panels with registration marks on two opposite corners, inside the border so they never overflow.
const framePanelClasses = [
  "z-50 flex max-h-(--available-height) min-w-48 flex-col overflow-y-auto overscroll-contain border border-border bg-popover p-1 text-popover-foreground shadow-elevated outline-none",
  "before:pointer-events-none before:absolute before:top-0 before:left-0 before:size-2 before:border-t before:border-l before:border-primary",
  "after:pointer-events-none after:absolute after:right-0 after:bottom-0 after:size-2 after:border-r after:border-b after:border-primary",
  "transition-[opacity,translate] duration-150 ease-out motion-reduce:transition-none",
  "data-starting-style:opacity-0 data-ending-style:opacity-0",
].join(" ")

export const frameMenuContentClasses = [
  framePanelClasses,
  "data-starting-style:data-[side=bottom]:-translate-y-1 data-starting-style:data-[side=top]:translate-y-1",
  "motion-reduce:data-starting-style:translate-y-0",
].join(" ")

export const frameSubmenuContentClasses = framePanelClasses

export const frameMenuItemClasses = [
  "group/item flex min-h-9 cursor-default items-center gap-2.5 px-2.5 py-1.5 text-sm outline-none select-none",
  "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
  "data-disabled:pointer-events-none data-disabled:opacity-50",
  "data-destructive:text-error data-destructive:data-highlighted:bg-error/10",
  "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:stroke-[1.75]",
].join(" ")

export const frameMenuItemIconClasses = "inline-flex text-muted-foreground group-data-highlighted/item:text-primary"

export const frameMenuItemLabelClasses = "min-w-0 flex-1"

export const frameSubmenuChevronClasses = "text-muted-foreground rtl:-scale-x-100"

export const frameMenuSeparatorClasses = "-mx-1 my-1 h-px bg-border"
