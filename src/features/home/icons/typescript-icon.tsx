import type { IconProps } from "@/features/shell/shell.types"

export function TypescriptIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.1" />
      <path d="M6.5 9.5H11M8.75 9.5V16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M13.5 13.5c0 1.1 1.2 2 2.5 2s2.5-.9 2.5-2-1.2-1.5-2.5-2-2.5-.9-2.5-2 1.2-2 2.5-2 2.5.9 2.5 2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}
