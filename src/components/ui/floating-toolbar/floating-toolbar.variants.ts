import type { FloatingToolbarPlacement } from "./floating-toolbar.types"

export const floatingToolbarWrapperClasses = {
  bottom: "pointer-events-none fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex justify-center",
  top: "pointer-events-none fixed inset-x-4 top-[max(1rem,env(safe-area-inset-top))] z-40 flex justify-center",
  inline: "flex w-full min-w-0 justify-center",
} satisfies Record<FloatingToolbarPlacement, string>

// Primary-colored brackets on two opposite corners, like the crop marks on a technical drawing.
const cornerMarkClasses = [
  "before:pointer-events-none before:absolute before:size-2 before:rounded-tl-sm before:border-t before:border-l before:border-primary",
  "after:pointer-events-none after:absolute after:size-2 after:rounded-br-sm after:border-r after:border-b after:border-primary",
].join(" ")

// On the toolbar the brackets sit over its border; panels scroll, so theirs stay inside it to avoid overflow.
const outerCornerClasses = "before:-top-px before:-left-px after:-right-px after:-bottom-px"
const innerCornerClasses = "before:top-0 before:left-0 after:right-0 after:bottom-0"

// The surface carries the background, so the edge fades on the scroller inside only fade the options.
export const floatingToolbarSurfaceClasses = [
  "pointer-events-auto relative flex max-w-full min-w-0 rounded-sm border border-border bg-popover text-popover-foreground shadow-elevated",
  cornerMarkClasses,
  outerCornerClasses,
].join(" ")

// The toolbar is its own horizontal scroller: on narrow screens a finger drags it sideways,
// and roving focus scrolls the focused item into view.
export const floatingToolbarClasses = [
  "flex max-w-full min-w-0 items-center gap-1 overflow-x-auto overscroll-x-contain rounded-sm p-1.5",
  "scroll-px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
  // With the scrollbar hidden, these fades are the only cue that more items exist past an edge.
  "data-more-start:mask-l-from-[calc(100%-4rem)] data-more-end:mask-r-from-[calc(100%-4rem)]",
  "data-disabled:opacity-60",
].join(" ")

export const floatingToolbarButtonClasses = [
  "inline-flex size-10 shrink-0 items-center justify-center rounded-xs text-muted-foreground outline-none",
  "transition-[background-color,color,box-shadow] duration-150 ease-out motion-reduce:transition-none",
  "hover:bg-accent hover:text-accent-foreground active:bg-accent/70",
  "focus-visible:inset-ring focus-visible:inset-ring-ring",
  "data-open:bg-primary/10 data-open:text-primary data-open:inset-ring data-open:inset-ring-primary/50",
  "data-disabled:pointer-events-none data-disabled:opacity-50",
  "[&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:stroke-[1.75]",
].join(" ")

export const floatingToolbarSeparatorClasses = "mx-1 h-6 w-px shrink-0 bg-border"

const panelClasses = [
  "z-50 flex max-h-(--available-height) min-w-52 flex-col overflow-y-auto overscroll-contain rounded-sm border border-border bg-popover p-1 text-popover-foreground shadow-elevated outline-none",
  cornerMarkClasses,
  innerCornerClasses,
].join(" ")

export const floatingToolbarMenuContentClasses = [
  panelClasses,
  "transition-[opacity,translate] duration-150 ease-out motion-reduce:transition-none",
  "data-starting-style:opacity-0 data-ending-style:opacity-0",
  "data-starting-style:data-[side=top]:translate-y-1 data-starting-style:data-[side=bottom]:-translate-y-1",
  "motion-reduce:data-starting-style:translate-y-0",
  // While a nested panel covers this one, hide its items so none show around the edges.
  "[&:has(>[data-nested][data-open])>:not([data-nested])]:invisible",
].join(" ")

// Nested panels open over their parent, so they take its width and slide in from the inline end.
export const floatingToolbarSubmenuContentClasses = [
  panelClasses,
  "w-(--anchor-width)",
  "transition-[opacity,translate] duration-150 ease-out motion-reduce:transition-none",
  "data-starting-style:translate-x-3 data-starting-style:opacity-0 data-ending-style:translate-x-3 data-ending-style:opacity-0",
  "rtl:data-starting-style:-translate-x-3 rtl:data-ending-style:-translate-x-3",
  "motion-reduce:data-starting-style:translate-x-0 motion-reduce:data-ending-style:translate-x-0",
].join(" ")

export const floatingToolbarMenuItemClasses = [
  "group/item flex min-h-9 cursor-default items-center gap-2.5 rounded-xs px-2.5 py-1.5 text-sm outline-none select-none",
  "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
  "data-disabled:pointer-events-none data-disabled:opacity-50",
  "data-destructive:text-error data-destructive:data-highlighted:bg-error/10",
  "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:stroke-[1.75]",
].join(" ")

export const floatingToolbarMenuItemIconClasses =
  "inline-flex text-muted-foreground group-data-highlighted/item:text-primary"

export const floatingToolbarSubmenuChevronClasses = "ms-auto text-muted-foreground rtl:-scale-x-100"

export const floatingToolbarBackItemClasses = "min-h-8 font-mono text-2xs tracking-wide text-muted-foreground uppercase"

export const floatingToolbarSubmenuTitleClasses = "px-2.5 pt-2 pb-1 font-mono text-2xs tracking-wide text-primary uppercase"

export const floatingToolbarMenuSeparatorClasses = "-mx-1 my-1 h-px bg-border"
