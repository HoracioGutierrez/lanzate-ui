import { useSyncExternalStore } from "react"

import { getServerThemeSnapshot, getThemeSnapshot, setDarkTheme, subscribeToTheme } from "./theme-store"

/** Whether dark mode is on, and a setter that persists the choice. */
export function useDarkTheme() {
  const dark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot)
  return [dark, setDarkTheme] as const
}
