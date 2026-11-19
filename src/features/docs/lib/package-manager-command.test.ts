import { expect, test } from "vitest"

import { isPackageManagerScript, toPackageManagerCommand } from "./package-manager-command"

const add = "npx shadcn@latest add https://lanzate-ui.vercel.app/r/button.json"

test("npm keeps npx", () => {
  expect(toPackageManagerCommand(add, "npm")).toBe(add)
})

test("bun and pnpm swap npx for their runner", () => {
  expect(toPackageManagerCommand(add, "bun")).toBe("bunx --bun shadcn@latest add https://lanzate-ui.vercel.app/r/button.json")
  expect(toPackageManagerCommand(add, "pnpm")).toBe("pnpm dlx shadcn@latest add https://lanzate-ui.vercel.app/r/button.json")
})

test("only commands are rewritten: comments and continuation lines stay", () => {
  const script = ["# Add npx-free things", add, "", "npx shadcn@latest add \\", "  https://x/r/text.json"].join("\n")
  expect(toPackageManagerCommand(script, "pnpm")).toBe(
    ["# Add npx-free things", add.replace("npx", "pnpm dlx"), "", "pnpm dlx shadcn@latest add \\", "  https://x/r/text.json"].join("\n")
  )
})

test("a script is install-like when a line runs npx", () => {
  expect(isPackageManagerScript(add)).toBe(true)
  expect(isPackageManagerScript("# comment\nnpx shadcn@latest init")).toBe(true)
  expect(isPackageManagerScript("echo npx")).toBe(false)
  expect(isPackageManagerScript("bun run check")).toBe(false)
})
