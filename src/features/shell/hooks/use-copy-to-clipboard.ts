import { useEffect, useRef, useState } from "react"

/** How long the "copied" state lasts, in ms. */
const COPIED_DURATION = 1400

/** Copies text and reports `copied` for a moment afterwards. */
export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  function copy(value: string) {
    void navigator.clipboard?.writeText(value)
    setCopied(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setCopied(false), COPIED_DURATION)
  }

  return { copied, copy }
}
