import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, test } from "vitest"

import { DemoTabs } from "./demo-tabs"

function renderTabs() {
  render(<DemoTabs preview={<p>Live demo</p>} code={<pre>source code</pre>} />)
}

test("shows the preview first, with the code hidden", () => {
  renderTabs()
  expect(screen.getByRole("radio", { name: "Preview" }).getAttribute("aria-checked")).toBe("true")
  expect(screen.getByText("Live demo").closest("[hidden]")).toBeNull()
  expect(screen.getByText("source code").closest("[hidden]")).not.toBeNull()
})

test("switching to Code shows the source and hides the preview", async () => {
  const user = userEvent.setup()
  renderTabs()
  await user.click(screen.getByRole("radio", { name: "Code" }))
  expect(screen.getByText("source code").closest("[hidden]")).toBeNull()
  // Kept mounted, so the demo keeps its state while the code is shown.
  expect(screen.getByText("Live demo").closest("[hidden]")).not.toBeNull()
  await user.click(screen.getByRole("radio", { name: "Preview" }))
  expect(screen.getByText("source code").closest("[hidden]")).not.toBeNull()
})

test("the switch is named for screen readers and agents", () => {
  renderTabs()
  expect(screen.getByRole("radiogroup", { name: "Demo view" })).toBeTruthy()
})
