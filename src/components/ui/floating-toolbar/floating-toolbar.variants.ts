import type { FloatingToolbarPlacement } from "./floating-toolbar.types"

export const floatingToolbarWrapperClasses = {
  bottom: "pointer-events-none fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex justify-center",
  top: "pointer-events-none fixed inset-x-4 top-[max(1rem,env(safe-area-inset-top))] z-40 flex justify-center",
  inline: "flex w-full min-w-0 justify-center",
} satisfies Record<FloatingToolbarPlacement, string>

// The toolbar is its own horizontal scroller: on narrow screens a finger drags it sideways,
// and roving focus scrolls the focused item into view.
export const floatingToolbarClasses = [
  "pointer-events-auto flex max-w-full min-w-0 items-center gap-1 overflow-x-auto overscroll-x-contain rounded-full border border-border bg-popover p-1.5 text-popover-foreground shadow-elevated",
  "scroll-px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
  // With the scrollbar hidden, these fades are the only cue that more items exist past an edge.
  "data-more-start:mask-l-from-[calc(100%-2.5rem)] data-more-end:mask-r-from-[calc(100%-2.5rem)]",
  "data-disabled:opacity-60",
].join(" ")

export const floatingToolbarButtonClasses = [
  "inline-flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground outline-none",
  "transition-[background-color,color,scale] duration-150 ease-out motion-reduce:transition-none",
  "hover:bg-accent hover:text-accent-foreground active:scale-95",
  "focus-visible:ring-2 focus-visible:ring-ring",
  "data-open:bg-accent data-open:text-accent-foreground",
  "data-disabled:pointer-events-none data-disabled:opacity-50",
  "[&_svg]:size-5 [&_svg]:shrink-0",
].join(" ")

export const floatingToolbarSentinelClasses = "-mx-0.5 h-px w-px shrink-0"

export const floatingToolbarSeparatorClasses = "mx-0.5 h-6 w-px shrink-0 bg-border"

export const floatingToolbarMenuContentClasses = [
  "z-50 flex max-h-(--available-height) min-w-52 origin-(--transform-origin) flex-col overflow-y-auto overscroll-contain rounded-2xl border border-border bg-popover p-1.5 text-popover-foreground shadow-elevated outline-none",
  "transition-[opacity,scale,translate] duration-150 ease-out motion-reduce:transition-none",
  "data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0",
  "data-starting-style:data-[side=top]:translate-y-1 data-starting-style:data-[side=bottom]:-translate-y-1",
  "motion-reduce:data-starting-style:scale-100 motion-reduce:data-ending-style:scale-100",
  // While a nested panel covers this one, hide its items so none show around the edges.
  "[&:has(>[data-nested][data-open])>:not([data-nested])]:invisible",
].join(" ")

// Nested panels open over their parent, so they take its width and slide in from the inline end.
export const floatingToolbarSubmenuContentClasses = [
  "z-50 flex max-h-(--available-height) w-(--anchor-width) min-w-52 flex-col overflow-y-auto overscroll-contain rounded-2xl border border-border bg-popover p-1.5 text-popover-foreground shadow-elevated outline-none",
  "transition-[opacity,translate] duration-150 ease-out motion-reduce:transition-none",
  "data-starting-style:translate-x-3 data-starting-style:opacity-0 data-ending-style:translate-x-3 data-ending-style:opacity-0",
  "rtl:data-starting-style:-translate-x-3 rtl:data-ending-style:-translate-x-3",
  "motion-reduce:data-starting-style:translate-x-0 motion-reduce:data-ending-style:translate-x-0",
].join(" ")

export const floatingToolbarMenuItemClasses = [
  "flex min-h-10 cursor-default items-center gap-2.5 rounded-xl px-3 py-2 text-sm outline-none select-none",
  "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
  "data-disabled:pointer-events-none data-disabled:opacity-50",
  "data-destructive:text-error data-destructive:data-highlighted:bg-error/10",
  "[&_svg]:size-4 [&_svg]:shrink-0",
].join(" ")

export const floatingToolbarMenuItemIconClasses = "inline-flex text-muted-foreground"

export const floatingToolbarSubmenuChevronClasses = "ms-auto text-muted-foreground rtl:-scale-x-100"

export const floatingToolbarBackItemClasses = "font-medium"

export const floatingToolbarSubmenuTitleClasses = "px-3 pt-2 pb-1 text-xs font-medium text-muted-foreground"

export const floatingToolbarMenuSeparatorClasses = "-mx-1.5 my-1 h-px bg-border"
