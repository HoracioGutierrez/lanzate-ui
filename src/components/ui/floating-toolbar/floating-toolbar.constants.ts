import { createContext } from "react"

import type {
  FloatingToolbarContextValue,
  FloatingToolbarMenuContentContextValue,
  FloatingToolbarSubmenuState,
} from "./floating-toolbar.types"

export const FloatingToolbarContext = createContext<FloatingToolbarContextValue>({ placement: "inline" })

export const FloatingToolbarMenuContentContext = createContext<FloatingToolbarMenuContentContextValue>({ side: "top" })

export const FloatingToolbarSubmenuContext = createContext<FloatingToolbarSubmenuState | null>(null)
