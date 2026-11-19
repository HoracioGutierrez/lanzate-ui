import { useCallback, useState } from "react"
import type { PointerEvent } from "react"

import type { ButtonGroupHighlightState } from "./button-group.types"

const HIDDEN: ButtonGroupHighlightState = { left: 0, top: 0, width: 0, height: 0, visible: false, instant: true }

/**
 * Tracks the item under a mouse or pen pointer, so one highlight can slide between items. Leaving an item
 * for the gap between items keeps it where it is; only leaving the group hides it.
 */
export function useButtonGroupHighlight() {
  const [state, setState] = useState(HIDDEN)

  const onPointerOver = useCallback((event: PointerEvent<HTMLElement>) => {
    // A tap fires pointerover too, but touch has no hover to show.
    if (event.pointerType === "touch") return
    if (!(event.target instanceof Element)) return
    const item = event.target.closest<HTMLElement>("[data-button-group-item]")
    if (item == null || !event.currentTarget.contains(item)) return
    if (item.matches("[data-disabled], [aria-disabled='true']")) return
    const { offsetLeft: left, offsetTop: top, offsetWidth: width, offsetHeight: height } = item
    setState((previous) => ({ left, top, width, height, visible: true, instant: !previous.visible }))
  }, [])

  const onPointerLeave = useCallback(() => {
    setState((previous) => (previous.visible ? { ...previous, visible: false } : previous))
  }, [])

  return { state, onPointerOver, onPointerLeave }
}
