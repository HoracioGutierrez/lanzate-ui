import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

import { twMergeTheme } from "@/lib/tw-merge.config"

// Lanzate UI's class merger. It knows the project's token values (text-display,
// shadow-elevated, ease-spring…), which stock tailwind-merge misreads: it takes
// `text-display` for a color and drops it next to `text-primary`.
//
// Registry components import this, never `@/lib/utils`, so they merge correctly
// in any project whatever its own cn() does. It ships in the lanzate-utils item.
// See docs/architecture/decisions/0004-registry-cn.md
const twMerge = extendTailwindMerge({
  extend: { theme: twMergeTheme },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
