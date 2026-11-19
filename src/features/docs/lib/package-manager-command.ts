import { PACKAGE_MANAGER_RUNNERS } from "../config/package-managers"
import type { PackageManager } from "../types/docs.types"

/** A line that starts a command with npx (comments and continuation lines don't). */
const NPX_LINE = /^npx /gm

/** Whether a shell block runs npx, so its commands depend on the reader's package manager. */
export function isPackageManagerScript(code: string): boolean {
  return /^npx /m.test(code)
}

/** The block as the reader's package manager runs it: `npx` becomes `bunx --bun` or `pnpm dlx`. */
export function toPackageManagerCommand(code: string, packageManager: PackageManager): string {
  return code.replace(NPX_LINE, `${PACKAGE_MANAGER_RUNNERS[packageManager]} `)
}
