import { expect, test } from "vitest"

import { allDocs } from "../config/docs-nav"
import { docsContent } from "../config/docs-content"
import { findDoc, getAdjacentDocs, isDocId } from "./docs-navigation"

test("every doc in the nav has content, and vice versa", () => {
  expect(allDocs.map((doc) => doc.id).sort()).toEqual(Object.keys(docsContent).sort())
})

test("isDocId accepts nav ids only", () => {
  expect(isDocId("button")).toBe(true)
  expect(isDocId("nope")).toBe(false)
})

test("the pager has no previous on the first page and no next on the last", () => {
  const first = allDocs[0]!
  const last = allDocs[allDocs.length - 1]!
  expect(getAdjacentDocs(first.id).previous).toBeUndefined()
  expect(getAdjacentDocs(last.id).next).toBeUndefined()
  expect(getAdjacentDocs(first.id).next).toEqual(allDocs[1])
})

test("findDoc returns the nav entry", () => {
  expect(findDoc("text").label).toBe("Text")
})
