import { expect, test } from "vitest"

import { BUTTON_GROUP_ALL as ALL } from "./button-group.constants"
import { fromSdkMultiple, fromSdkSingle, toSdkMultiple, toSdkSingle } from "./use-button-group-value"

test("multiple: an empty value presses All for ui-sdk", () => {
  expect(toSdkMultiple([])).toEqual([ALL])
  expect(toSdkMultiple(["a"])).toEqual(["a"])
})

test("multiple: the first filter pressed from empty drops All", () => {
  expect(fromSdkMultiple([ALL, "a"], [])).toEqual(["a"])
})

test("multiple: pressing All clears the filters", () => {
  expect(fromSdkMultiple(["a", ALL], ["a"])).toEqual([])
})

test("multiple: pressing All while it's pressed changes nothing", () => {
  expect(fromSdkMultiple([], [])).toBeUndefined()
})

test("multiple: other changes pass through", () => {
  expect(fromSdkMultiple(["a", "b"], ["a"])).toEqual(["a", "b"])
  expect(fromSdkMultiple([], ["a"])).toEqual([])
})

test("single: null maps to All and back", () => {
  expect(toSdkSingle(null)).toBe(ALL)
  expect(toSdkSingle("grid")).toBe("grid")
  expect(fromSdkSingle(ALL)).toBeNull()
  expect(fromSdkSingle(null)).toBeNull()
  expect(fromSdkSingle("grid")).toBe("grid")
})
