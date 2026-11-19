"use client"

import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"

import { PACKAGE_MANAGERS } from "../config/package-managers"
import { usePackageManager } from "../hooks/use-package-manager"
import { toPackageManagerCommand } from "../lib/package-manager-command"
import type { PackageManagerCodeProps } from "../types/docs.types"
import { CodeBlock } from "./code-block"

const isPackageManager = (value: string | null) => PACKAGE_MANAGERS.find((packageManager) => packageManager === value)

/** A shell block written with npx, shown for the reader's package manager, with a picker above it. */
export function PackageManagerCode({ code }: PackageManagerCodeProps) {
  const [packageManager, setPackageManager] = usePackageManager()

  return (
    <div className="mt-4">
      <ButtonGroup
        selection="single"
        size="xs"
        aria-label="Package manager"
        value={packageManager}
        onValueChange={(next) => {
          const chosen = isPackageManager(next)
          if (chosen != null) setPackageManager(chosen)
        }}
      >
        {PACKAGE_MANAGERS.map((option) => (
          <ButtonGroupItem key={option} value={option}>
            {option}
          </ButtonGroupItem>
        ))}
      </ButtonGroup>
      <CodeBlock code={toPackageManagerCommand(code, packageManager)} />
    </div>
  )
}
