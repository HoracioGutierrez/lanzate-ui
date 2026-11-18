import { createContext } from "react"

import type { FrameContextValue } from "./frame.types"

export const FrameContext = createContext<FrameContextValue>({ size: "md", collapsible: false })
