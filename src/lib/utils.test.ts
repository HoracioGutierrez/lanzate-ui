import { expect, test } from "vitest"

import { cn } from "./utils"

test("token type sizes replace each other", () => {
  expect(cn("text-display", "text-sm")).toBe("text-sm")
  expect(cn("text-sm", "text-2xs")).toBe("text-2xs")
})

test("a token size doesn't remove a text color", () => {
  expect(cn("text-primary", "text-display")).toBe("text-primary text-display")
})

test("token shadows replace each other without touching shadow colors", () => {
  expect(cn("shadow-soft", "shadow-elevated")).toBe("shadow-elevated")
  expect(cn("shadow-primary", "shadow-pop")).toBe("shadow-primary shadow-pop")
})

test("token easings replace each other", () => {
  expect(cn("ease-out", "ease-spring")).toBe("ease-spring")
})
