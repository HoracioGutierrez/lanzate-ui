import type { FrameCorner, FrameSize } from "./frame.types"

export const frameClasses = "group/frame relative flex min-w-0 flex-col border border-border bg-card text-card-foreground"

export const frameCorners = ["top-start", "top-end", "bottom-start", "bottom-end"] as const satisfies readonly FrameCorner[]

// Registration marks over the border on all four corners, like the sheet corners of a technical drawing.
const frameCornerBaseClasses = "pointer-events-none absolute z-10 border-primary"

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
  "flex min-w-0 items-center gap-1 border-b border-border px-1 group-data-closed/frame:border-b-transparent"

export const frameTitleClasses =
  "flex min-w-0 flex-1 items-center gap-2 self-stretch px-2 text-start font-mono text-xs tracking-wide uppercase"

export const frameTitleTriggerClasses = [
  "cursor-pointer outline-none select-none",
  "transition-colors duration-150 ease-out motion-reduce:transition-none",
  "hover:text-primary focus-visible:inset-ring focus-visible:inset-ring-ring",
].join(" ")

export const frameTitleLabelClasses = "flex min-w-0 flex-1 items-center gap-2 truncate"

export const frameTitleChevronClasses =
  "size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out motion-reduce:transition-none group-data-closed/frame:-rotate-90 rtl:group-data-closed/frame:rotate-90"

export const frameContentPanelClasses = [
  "h-(--collapsible-panel-height) overflow-hidden",
  "transition-[height] duration-200 ease-out motion-reduce:transition-none",
  "data-starting-style:h-0 data-ending-style:h-0",
].join(" ")
