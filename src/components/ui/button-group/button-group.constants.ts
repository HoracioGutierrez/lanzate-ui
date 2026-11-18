import { createContext } from "react"

import type { ButtonGroupContextValue } from "./button-group.types"

/** Value of `ButtonGroupAll` inside ui-sdk. It never reaches the consumer's value. */
export const BUTTON_GROUP_ALL = "__button-group-all__"

export const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(null)
