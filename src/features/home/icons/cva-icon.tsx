import type { IconProps } from "@/features/shell/shell.types"

export function CvaIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 9l7 7 7-7" />
      <path d="M5 15l7 7 7-7" />
    </svg>
  )
}
