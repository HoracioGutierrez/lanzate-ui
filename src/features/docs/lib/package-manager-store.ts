import { DEFAULT_PACKAGE_MANAGER, PACKAGE_MANAGER_STORAGE_KEY, PACKAGE_MANAGERS } from "../config/package-managers"
import type { PackageManager } from "../types/docs.types"

// The choice lives in localStorage. Every install block on the page subscribes, so changing one
// changes them all; the storage event keeps other tabs in step.

const listeners = new Set<() => void>()

const isPackageManager = (value: string | null): value is PackageManager =>
  PACKAGE_MANAGERS.some((packageManager) => packageManager === value)

export function subscribeToPackageManager(onChange: () => void) {
  listeners.add(onChange)
  const onStorage = (event: StorageEvent) => {
    if (event.key === PACKAGE_MANAGER_STORAGE_KEY) onChange()
  }
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(onChange)
    window.removeEventListener("storage", onStorage)
  }
}

export function getPackageManagerSnapshot(): PackageManager {
  try {
    const stored = localStorage.getItem(PACKAGE_MANAGER_STORAGE_KEY)
    return isPackageManager(stored) ? stored : DEFAULT_PACKAGE_MANAGER
  } catch {
    // Storage can be unavailable (private mode, blocked site data).
    return DEFAULT_PACKAGE_MANAGER
  }
}

export const getServerPackageManagerSnapshot = (): PackageManager => DEFAULT_PACKAGE_MANAGER

export function setPackageManager(packageManager: PackageManager) {
  try {
    localStorage.setItem(PACKAGE_MANAGER_STORAGE_KEY, packageManager)
  } catch {
    // Without storage the choice still applies to this page.
  }
  for (const listener of listeners) listener()
}
