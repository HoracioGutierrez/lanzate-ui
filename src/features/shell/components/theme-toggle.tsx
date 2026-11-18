"use client"

import { Moon, Sun } from "lucide-react"

import { useDarkTheme } from "../theme/use-dark-theme"

export function ThemeToggle() {
  const [dark, setDark] = useDarkTheme()

  return (
    <button
      type="button"
      onClick={() => setDark(!dark)}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid size-9 shrink-0 place-items-center rounded-md border border-border transition hover:bg-accent"
    >
      {dark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    </button>
  )
}
