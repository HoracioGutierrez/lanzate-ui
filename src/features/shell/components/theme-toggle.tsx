"use client"

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useDarkTheme } from "../theme/use-dark-theme"

export function ThemeToggle() {
  const [dark, setDark] = useDarkTheme()

  return (
    <Button
      variant="subtle"
      icon={dark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      onClick={() => setDark(!dark)}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="shrink-0"
    />
  )
}
