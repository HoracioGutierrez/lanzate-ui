"use client"

import { Monitor, Moon, Sun } from "lucide-react"

import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"

import type { ThemePreference } from "../shell.types"
import { useThemePreference } from "../theme/use-theme-preference"

const isThemePreference = (value: string | null): value is ThemePreference =>
  value === "light" || value === "dark" || value === "system"

/** Light, dark, or follow the operating system. */
export function ThemePicker() {
  const [preference, setPreference] = useThemePreference()

  return (
    <ButtonGroup
      selection="single"
      size="xs"
      aria-label="Theme"
      value={preference}
      onValueChange={(next) => {
        if (isThemePreference(next)) setPreference(next)
      }}
      className="shrink-0"
    >
      <ButtonGroupItem value="light" icon={<Sun aria-hidden="true" />} aria-label="Light" tooltip="Light" />
      <ButtonGroupItem value="dark" icon={<Moon aria-hidden="true" />} aria-label="Dark" tooltip="Dark" />
      <ButtonGroupItem value="system" icon={<Monitor aria-hidden="true" />} aria-label="System" tooltip="System" />
    </ButtonGroup>
  )
}
