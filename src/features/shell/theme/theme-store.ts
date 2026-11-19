import type { ThemePreference } from "../shell.types"
import { DARK_CLASS, SYSTEM_DARK_QUERY, THEME_STORAGE_KEY } from "./theme.constants"

// ThemeScript applies the saved theme (or the system one) to <html> before first paint. The store
// reads the preference from localStorage, writes changes back, and while the preference is
// "system" keeps <html> in step with the operating system.

const listeners = new Set<() => void>()
/** The preference when storage is unavailable (private mode, blocked site data). */
let unsaved: ThemePreference = "system"

const isSaved = (value: string | null): value is "light" | "dark" => value === "light" || value === "dark"

export function getThemePreference(): ThemePreference {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    return isSaved(saved) ? saved : "system"
  } catch {
    return unsaved
  }
}

export const getServerThemePreference = (): ThemePreference => "system"

function applyTheme(preference: ThemePreference) {
  const dark = preference === "system" ? window.matchMedia(SYSTEM_DARK_QUERY).matches : preference === "dark"
  document.documentElement.classList.toggle(DARK_CLASS, dark)
}

export function subscribeToThemePreference(onChange: () => void) {
  listeners.add(onChange)
  const media = window.matchMedia(SYSTEM_DARK_QUERY)
  const onSystemChange = () => {
    if (getThemePreference() === "system") applyTheme("system")
  }
  // Another tab changed the preference.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY && event.key !== null) return
    applyTheme(getThemePreference())
    onChange()
  }
  media.addEventListener("change", onSystemChange)
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(onChange)
    media.removeEventListener("change", onSystemChange)
    window.removeEventListener("storage", onStorage)
  }
}

export function setThemePreference(preference: ThemePreference) {
  unsaved = preference
  try {
    if (preference === "system") localStorage.removeItem(THEME_STORAGE_KEY)
    else localStorage.setItem(THEME_STORAGE_KEY, preference)
  } catch {
    // Without storage the choice still applies to this page.
  }
  applyTheme(preference)
  for (const listener of listeners) listener()
}
