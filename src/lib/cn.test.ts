import { twMerge as stockTwMerge } from "tailwind-merge"
import { expect, test } from "vitest"

import { cn } from "./cn"

// What a consumer's stock shadcn cn() does with our token classes. These pin
// down the bug that made registry components ship their own cn.
test("baseline: stock tailwind-merge mangles token classes", () => {
  expect(stockTwMerge("text-display text-primary")).toBe("text-primary")
  expect(stockTwMerge("shadow-elevated shadow-primary")).toBe("shadow-primary")
  expect(stockTwMerge("ease-out ease-spring")).toBe("ease-out ease-spring")
})

test("a token size and a text color both survive", () => {
  expect(cn("text-display", "text-primary")).toBe("text-display text-primary")
  expect(cn("text-primary", "text-display")).toBe("text-primary text-display")
  expect(cn("text-display", "text-(--btn-fg)")).toBe("text-display text-(--btn-fg)")
})

test("token type sizes replace each other", () => {
  expect(cn("text-display", "text-sm")).toBe("text-sm")
  expect(cn("text-sm", "text-2xs")).toBe("text-2xs")
})

test("token shadows replace each other without touching shadow colors", () => {
  expect(cn("shadow-soft", "shadow-elevated")).toBe("shadow-elevated")
  expect(cn("shadow-elevated", "shadow-primary")).toBe("shadow-elevated shadow-primary")
})

test("token easings replace each other", () => {
  expect(cn("ease-out", "ease-spring")).toBe("ease-spring")
})
