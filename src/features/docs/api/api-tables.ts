import type { ApiRow } from "../types/docs.types"
import { badgeApi } from "./badge.api"
import { buttonApi } from "./button.api"
import { buttonGroupApi } from "./button-group.api"
import { floatingToolbarApi } from "./floating-toolbar.api"
import { frameApi } from "./frame.api"
import { textApi } from "./text.api"
import { timelineApi } from "./timeline.api"

/** Prop tables MDX can show with <ApiTable name="…" />. */
export const apiTables = {
  button: buttonApi,
  text: textApi,
  "floating-toolbar": floatingToolbarApi,
  frame: frameApi,
  "button-group": buttonGroupApi,
  badge: badgeApi,
  timeline: timelineApi,
} satisfies Record<string, ApiRow[]>
