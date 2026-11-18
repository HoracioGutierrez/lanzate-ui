import { DARK_CLASS, THEME_STORAGE_KEY } from "./theme.constants"

// The initial theme is applied to <html> before first paint by ThemeScript,
// so the store only mirrors the DARK_CLASS class and writes changes back.

export function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
  return () => observer.disconnect()
}

export const getThemeSnapshot = () => document.documentElement.classList.contains(DARK_CLASS)

export const getServerThemeSnapshot = () => false

export function setDarkTheme(dark: boolean) {
  document.documentElement.classList.toggle(DARK_CLASS, dark)
  try {
    localStorage.setItem(THEME_STORAGE_KEY, dark ? "dark" : "light")
  } catch {
    // Storage can be unavailable (private mode, blocked site data).
  }
}
