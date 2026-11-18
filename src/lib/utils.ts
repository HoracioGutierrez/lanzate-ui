import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

import { twMergeTheme } from "@/styles/generated/tw-merge.config"

// Teach tailwind-merge the project's token values (text-display, shadow-soft, ease-spring…)
// so cn() resolves conflicts between them. The list is generated from tokens/.
const twMerge = extendTailwindMerge({
  extend: { theme: twMergeTheme },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
