"use client"

import { CodeIcon, EyeIcon } from "lucide-react"
import { useState } from "react"

import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"

import type { DemoTabsProps, DemoView } from "../types/docs.types"

const isDemoView = (value: string | null): value is DemoView => value === "preview" || value === "code"

/**
 * Shows a demo or its source. Both stay mounted: the demo keeps its state while the code is shown,
 * and the code stays in the server-rendered HTML.
 */
export function DemoTabs({ preview, code }: DemoTabsProps) {
  const [view, setView] = useState<DemoView>("preview")

  return (
    <div className="mt-4">
      <ButtonGroup
        selection="single"
        size="xs"
        aria-label="Demo view"
        value={view}
        onValueChange={(next) => {
          if (isDemoView(next)) setView(next)
        }}
      >
        <ButtonGroupItem value="preview" startIcon={<EyeIcon aria-hidden="true" />}>
          Preview
        </ButtonGroupItem>
        <ButtonGroupItem value="code" startIcon={<CodeIcon aria-hidden="true" />}>
          Code
        </ButtonGroupItem>
      </ButtonGroup>
      <div hidden={view !== "preview"}>{preview}</div>
      <div hidden={view !== "code"}>{code}</div>
    </div>
  )
}
