import type { IconProps } from "@/features/shell/shell.types"

export function NextjsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 16V8l7.5 10" />
      <path d="M15 8v5" />
    </svg>
  )
}
