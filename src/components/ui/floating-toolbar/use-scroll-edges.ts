import { useEffect } from "react"
import type { RefObject } from "react"

/**
 * Marks a horizontal scroller with `data-more-start` / `data-more-end` while content
 * hides past that edge. Reads the scroll position on scroll, resize and content changes,
 * so it updates synchronously in every browser.
 */
export function useScrollEdges(scrollerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scrollerRef.current
    if (!root) return

    const update = () => {
      // scrollLeft is negative in right-to-left scrollers, so measure its distance from 0.
      const fromStart = Math.abs(root.scrollLeft)
      const overflow = root.scrollWidth - root.clientWidth
      root.toggleAttribute("data-more-start", fromStart > 1)
      root.toggleAttribute("data-more-end", overflow - fromStart > 1)
    }

    update()
    root.addEventListener("scroll", update, { passive: true })
    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update)
    resize?.observe(root)
    const mutation = typeof MutationObserver === "undefined" ? null : new MutationObserver(update)
    mutation?.observe(root, { childList: true, subtree: true })

    return () => {
      root.removeEventListener("scroll", update)
      resize?.disconnect()
      mutation?.disconnect()
    }
  }, [scrollerRef])
}
