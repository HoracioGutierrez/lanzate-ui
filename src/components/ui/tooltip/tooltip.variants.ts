export const tooltipContentClasses = [
  "z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background",
  "transition-[opacity,scale,translate] duration-150 ease-out data-instant:transition-none",
  "data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0",
  "data-starting-style:data-[side=top]:translate-y-1 data-starting-style:data-[side=bottom]:-translate-y-1 data-starting-style:data-[side=left]:translate-x-1 data-starting-style:data-[side=right]:-translate-x-1",
  "motion-reduce:data-starting-style:scale-100 motion-reduce:data-starting-style:translate-0 motion-reduce:data-ending-style:scale-100",
].join(" ")

export const tooltipArrowClasses = [
  "size-2.5 rotate-45 rounded-[2px] bg-foreground",
  "data-[side=top]:-bottom-1 data-[side=bottom]:-top-1 data-[side=left]:-right-1 data-[side=right]:-left-1",
].join(" ")
