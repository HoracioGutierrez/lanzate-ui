import { expect, test } from "vitest"

import { extractToc } from "./extract-toc"

test("lists level-2 headings with rehype-slug ids", () => {
  const source = ["# Button", "", "## Preview", "text", "## Icon only", "### Detail", "## With `tooltip`"].join("\n")
  expect(extractToc(source)).toEqual([
    { id: "preview", label: "Preview" },
    { id: "icon-only", label: "Icon only" },
    { id: "with-tooltip", label: "With tooltip" },
  ])
})

test("ignores headings inside code fences", () => {
  const source = ["## Usage", "```md", "## Not a heading", "```", "## API"].join("\n")
  expect(extractToc(source).map((item) => item.id)).toEqual(["usage", "api"])
})

test("numbers repeated titles like rehype-slug does", () => {
  expect(extractToc("## Usage\n## Usage").map((item) => item.id)).toEqual(["usage", "usage-1"])
})

test("keeps link text and drops the URL", () => {
  expect(extractToc("## See [shadcn](https://ui.shadcn.com)")).toEqual([{ id: "see-shadcn", label: "See shadcn" }])
})
