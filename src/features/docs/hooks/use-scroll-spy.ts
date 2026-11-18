import { useCallback, useSyncExternalStore } from "react"

/** Distance (px) from the top of the viewport at which a heading counts as current: the header's height plus some air. */
const ACTIVE_OFFSET = 80

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true })
  window.addEventListener("resize", onChange)
  return () => {
    window.removeEventListener("scroll", onChange)
    window.removeEventListener("resize", onChange)
  }
}

/** The id of the last heading scrolled past, out of `ids` (in document order). */
export function useScrollSpy(ids: string[]) {
  const first = ids[0] ?? ""

  const getActive = useCallback(() => {
    let current = first
    for (const id of ids) {
      const el = document.getElementById(id)
      if (!el) continue
      if (el.getBoundingClientRect().top > ACTIVE_OFFSET) break
      current = id
    }
    return current
  }, [ids, first])

  return useSyncExternalStore(subscribeToScroll, getActive, () => first)
}
