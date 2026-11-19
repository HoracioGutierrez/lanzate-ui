import { useSyncExternalStore } from "react"

import {
  getPackageManagerSnapshot,
  getServerPackageManagerSnapshot,
  setPackageManager,
  subscribeToPackageManager,
} from "../lib/package-manager-store"

/** The reader's package manager, shared by every install block, and a setter that remembers it. */
export function usePackageManager() {
  const packageManager = useSyncExternalStore(
    subscribeToPackageManager,
    getPackageManagerSnapshot,
    getServerPackageManagerSnapshot
  )
  return [packageManager, setPackageManager] as const
}
