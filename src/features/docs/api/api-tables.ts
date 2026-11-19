import type { ApiRow } from "../types/docs.types"
import { buttonApi } from "./button.api"
import { buttonGroupApi } from "./button-group.api"
import { floatingToolbarApi } from "./floating-toolbar.api"
import { frameApi } from "./frame.api"
import { textApi } from "./text.api"

/** Prop tables MDX can show with <ApiTable name="…" />. */
export const apiTables = {
  button: buttonApi,
  text: textApi,
  "floating-toolbar": floatingToolbarApi,
  frame: frameApi,
  "button-group": buttonGroupApi,
} satisfies Record<string, ApiRow[]>
