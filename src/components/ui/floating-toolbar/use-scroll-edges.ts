import { useEffect } from "react"
import type { RefObject } from "react"

/**
 * Marks a horizontal scroller with `data-more-start` / `data-more-end` while content
 * hides past that edge. Watches two sentinels instead of scroll events, so it works
 * in every browser without scroll-driven animations.
 */
export function useScrollEdges(
  scroller: RefObject<HTMLElement | null>,
  start: RefObject<HTMLElement | null>,
  end: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const root = scroller.current
    const first = start.current
    const last = end.current
    if (!root || !first || !last || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          root.toggleAttribute(target === first ? "data-more-start" : "data-more-end", !isIntersecting)
        }
      },
      { root, threshold: 1, rootMargin: "1px" }
    )
    observer.observe(first)
    observer.observe(last)
    return () => observer.disconnect()
  }, [scroller, start, end])
}
