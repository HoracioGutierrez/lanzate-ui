import { useSyncExternalStore } from "react"

import {
  getServerThemePreference,
  getThemePreference,
  setThemePreference,
  subscribeToThemePreference,
} from "./theme-store"

/** The reader's theme preference (light, dark or system), and a setter that applies and saves it. */
export function useThemePreference() {
  const preference = useSyncExternalStore(subscribeToThemePreference, getThemePreference, getServerThemePreference)
  return [preference, setThemePreference] as const
}
