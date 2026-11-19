import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, expect, test, vi } from "vitest"

import { DARK_CLASS, THEME_STORAGE_KEY } from "../theme/theme.constants"
import { ThemePicker } from "./theme-picker"

// jsdom has no matchMedia: a fake prefers-color-scheme the test can flip.
let systemDark = false
const mediaListeners = new Set<(event: { matches: boolean }) => void>()
function setSystemDark(dark: boolean) {
  systemDark = dark
  act(() => {
    for (const listener of mediaListeners) listener({ matches: dark })
  })
}

beforeEach(() => {
  systemDark = false
  vi.stubGlobal("matchMedia", (query: string) => ({
    get matches() {
      return systemDark
    },
    media: query,
    addEventListener: (_type: string, listener: (event: { matches: boolean }) => void) => mediaListeners.add(listener),
    removeEventListener: (_type: string, listener: (event: { matches: boolean }) => void) => mediaListeners.delete(listener),
  }))
})

afterEach(() => {
  vi.unstubAllGlobals()
  mediaListeners.clear()
  localStorage.clear()
  document.documentElement.classList.remove(DARK_CLASS)
})

const option = (name: string) => screen.getByRole("radio", { name })
const isDark = () => document.documentElement.classList.contains(DARK_CLASS)

test("with nothing saved, System is chosen", () => {
  render(<ThemePicker />)
  expect(screen.getByRole("radiogroup", { name: "Theme" })).toBeTruthy()
  expect(option("System").getAttribute("aria-checked")).toBe("true")
})

test("Light and Dark switch the page and are remembered", async () => {
  const user = userEvent.setup()
  render(<ThemePicker />)
  await user.click(option("Dark"))
  expect(isDark()).toBe(true)
  expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark")
  await user.click(option("Light"))
  expect(isDark()).toBe(false)
  expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light")
})

test("a saved choice is shown as chosen", () => {
  localStorage.setItem(THEME_STORAGE_KEY, "dark")
  render(<ThemePicker />)
  expect(option("Dark").getAttribute("aria-checked")).toBe("true")
})

test("System forgets the saved choice, follows the OS and keeps following it", async () => {
  const user = userEvent.setup()
  localStorage.setItem(THEME_STORAGE_KEY, "light")
  systemDark = true
  render(<ThemePicker />)
  await user.click(option("System"))
  expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull()
  expect(isDark()).toBe(true)
  setSystemDark(false)
  expect(isDark()).toBe(false)
})

test("an explicit choice ignores OS changes", async () => {
  const user = userEvent.setup()
  render(<ThemePicker />)
  await user.click(option("Light"))
  setSystemDark(true)
  expect(isDark()).toBe(false)
})
