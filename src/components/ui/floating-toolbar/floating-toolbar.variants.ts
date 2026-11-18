import type { FloatingToolbarNumbering, FloatingToolbarPanelLevel, FloatingToolbarPlacement } from "./floating-toolbar.types"

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

// Options and menu triggers are the registry's Button (ghost, icon only); the toolbar only sizes
// them and keeps the focus ring inside, since the row scrolls and would clip an outer ring.
export const floatingToolbarControlClasses =
  "size-10 shrink-0 rounded-xs focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:inset-ring focus-visible:inset-ring-ring [&_svg]:size-5"

// A menu trigger stays marked while its panel is open.
export const floatingToolbarMenuTriggerClasses = "data-open:bg-primary/10 data-open:text-primary data-open:inset-ring data-open:inset-ring-primary/50"

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
  "group/item flex min-h-9 cursor-default items-center gap-2.5 rounded-xs px-2.5 py-1.5 outline-none select-none",
  "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
  "data-disabled:pointer-events-none data-disabled:opacity-50",
  "data-destructive:text-error data-destructive:data-highlighted:bg-error/10",
  "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:stroke-[1.75]",
].join(" ")

export const floatingToolbarMenuItemIconClasses =
  "inline-flex text-muted-foreground group-data-highlighted/item:text-primary"

export const floatingToolbarMenuItemLabelClasses = "min-w-0 flex-1"

export const floatingToolbarSubmenuChevronClasses = "text-muted-foreground rtl:-scale-x-100"

// Numbers come from CSS counters, so they follow item order with no bookkeeping. Each panel resets
// its counter; a nested panel sits after its trigger in the DOM, so it can still read the parent's.
// The `/ ""` alternative text keeps the number out of the item's accessible name.
export const floatingToolbarPanelCounterClasses = {
  1: "[counter-reset:ft-item]",
  2: "[counter-reset:ft-sub]",
} satisfies Record<FloatingToolbarPanelLevel, string>

// Exception to "build on core components": a CSS counter lives in a pseudo-element, which can't be
// a Text, so the number keeps its own type classes (registry.md#building-on-core-components).
const numberClasses =
  "after:min-w-[2ch] after:text-end after:font-mono after:text-2xs after:tracking-wide after:text-muted-foreground data-highlighted:after:text-primary"

export const floatingToolbarItemNumberClasses = {
  1: {
    none: "",
    sequential: `[counter-increment:ft-item] after:content-[counter(ft-item,decimal-leading-zero)_/_""] ${numberClasses}`,
    hierarchical: `[counter-increment:ft-item] after:content-[counter(ft-item,decimal-leading-zero)_/_""] ${numberClasses}`,
  },
  2: {
    none: "",
    sequential: `[counter-increment:ft-sub] after:content-[counter(ft-sub,decimal-leading-zero)_/_""] ${numberClasses}`,
    hierarchical: `[counter-increment:ft-sub] after:content-[counter(ft-item,decimal-leading-zero)_"."_counter(ft-sub)_/_""] ${numberClasses}`,
  },
} satisfies Record<FloatingToolbarPanelLevel, Record<FloatingToolbarNumbering, string>>

export const floatingToolbarBackItemClasses = "min-h-8 text-muted-foreground"

export const floatingToolbarSubmenuTitleClasses = "px-2.5 pt-2 pb-1"

export const floatingToolbarMenuSeparatorClasses = "-mx-1 my-1 h-px bg-border"
