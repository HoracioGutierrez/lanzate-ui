import type { PackageManager } from "../types/docs.types"

/** In the order the picker shows them. */
export const PACKAGE_MANAGERS = ["bun", "npm", "pnpm"] as const satisfies readonly PackageManager[]

/** What runs a package's binary without installing it: replaces `npx` in install blocks. */
export const PACKAGE_MANAGER_RUNNERS = {
  bun: "bunx --bun",
  npm: "npx",
  pnpm: "pnpm dlx",
} satisfies Record<PackageManager, string>

/** The docs are written with npx, so npm is what a first visit (and the server) shows. */
export const DEFAULT_PACKAGE_MANAGER: PackageManager = "npm"

/** localStorage key holding the visitor's package manager. */
export const PACKAGE_MANAGER_STORAGE_KEY = "lanzate-package-manager"
