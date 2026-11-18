import type { ApiRow } from "../types/docs.types"
import { buttonApi } from "./button.api"
import { textApi } from "./text.api"

/** Prop tables MDX can show with <ApiTable name="…" />. */
export const apiTables = {
  button: buttonApi,
  text: textApi,
} satisfies Record<string, ApiRow[]>
