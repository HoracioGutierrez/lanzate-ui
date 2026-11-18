import type { IconProps } from "@/features/shell/shell.types"

export function ShadcnIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M21 8L3 8" />
      <path d="M21 16L12 16" />
    </svg>
  )
}
