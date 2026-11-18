import pkg from "../../../package.json"

import type { StatItem } from "./home.types"

export const VERSION = pkg.version

export const INSTALL_COMMAND = "npx shadcn@latest add https://lanzate-ui.vercel.app/r/button.json"

export const STATS: StatItem[] = [
  { value: "2", label: "Components" },
  { value: "100%", label: "Accessible · WCAG AA" },
  { value: "0kb", label: "Extra Runtime" },
  { value: "MIT", label: "Open License" },
]

export const SUPPORTED_STACKS = ["React 18+", "Next.js", "Vite", "Remix", "Tailwind 4+"]
