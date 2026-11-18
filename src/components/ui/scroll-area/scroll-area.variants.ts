export const scrollAreaViewportClasses =
  "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"

export const scrollBarClasses = [
  "flex touch-none p-px opacity-0 transition-opacity duration-150 select-none data-visible:opacity-100 motion-reduce:transition-none",
  "data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent",
  "data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:border-l data-[orientation=vertical]:border-l-transparent",
].join(" ")

export const scrollBarThumbClasses = "relative flex-1 rounded-full bg-border"
