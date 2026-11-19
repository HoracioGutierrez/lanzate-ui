import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, expect, test } from "vitest"

import { PACKAGE_MANAGER_STORAGE_KEY } from "../config/package-managers"
import { MdxPre } from "../mdx/mdx-pre"
import { PackageManagerCode } from "./package-manager-code"

afterEach(() => localStorage.clear())

const add = "npx shadcn@latest add https://lanzate-ui.vercel.app/r/button.json"
const code = () => screen.getAllByRole("code").map((el) => el.textContent)

test("shows npm first", () => {
  render(<PackageManagerCode code={add} />)
  expect(screen.getByRole("radio", { name: "npm" }).getAttribute("aria-checked")).toBe("true")
  expect(code()).toEqual([add])
})

test("choosing a package manager rewrites every block and remembers it", async () => {
  const user = userEvent.setup()
  render(
    <>
      <PackageManagerCode code={add} />
      <PackageManagerCode code="npx shadcn@latest init" />
    </>
  )
  const [first] = screen.getAllByRole("radio", { name: "pnpm" })
  if (first == null) throw new Error("no pnpm option")
  await user.click(first)
  expect(code()).toEqual([add.replace("npx", "pnpm dlx"), "pnpm dlx shadcn@latest init"])
  expect(localStorage.getItem(PACKAGE_MANAGER_STORAGE_KEY)).toBe("pnpm")
})

test("starts from the remembered choice", () => {
  localStorage.setItem(PACKAGE_MANAGER_STORAGE_KEY, "bun")
  render(<PackageManagerCode code={add} />)
  expect(code()).toEqual([add.replace("npx", "bunx --bun")])
})

test("an unknown stored value falls back to npm", () => {
  localStorage.setItem(PACKAGE_MANAGER_STORAGE_KEY, "yarn-classic")
  render(<PackageManagerCode code={add} />)
  expect(code()).toEqual([add])
})

test("Markdown bash blocks that run npx get the picker; other blocks don't", () => {
  render(
    <>
      <MdxPre>
        <code className="language-bash">{add}</code>
      </MdxPre>
      <MdxPre>
        <code className="language-tsx">{"const npx = 1"}</code>
      </MdxPre>
    </>
  )
  expect(screen.getAllByRole("radiogroup", { name: "Package manager" })).toHaveLength(1)
})
