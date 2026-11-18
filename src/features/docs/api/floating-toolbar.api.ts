import type { ApiRow } from "../types/docs.types"

export const floatingToolbarApi: ApiRow[] = [
  { prop: "FloatingToolbar placement", type: '"bottom" | "top" | "inline"', default: '"bottom"', description: "Pins the toolbar to the bottom or top of the viewport, centered, or leaves it in the page flow." },
  { prop: "FloatingToolbar aria-label", type: "string", description: "Names the toolbar. Required: screen readers and agents find it by name." },
  { prop: "FloatingToolbar wrapperClassName", type: "string", description: "Classes for the positioning wrapper, e.g. to change the offset from the viewport edge." },
  { prop: "FloatingToolbarButton label", type: "string", description: "Accessible name of an icon-only option with no submenu. Its children are the icon." },
  { prop: "FloatingToolbarMenuTrigger label", type: "string", description: "Accessible name of an option that opens a submenu. Place it inside FloatingToolbarMenu." },
  { prop: "FloatingToolbarMenu onAction", type: "(value: string) => void", description: "Runs for every item in the menu and its nested panels, with the item's value." },
  { prop: "FloatingToolbarMenuContent side", type: '"top" | "bottom" | "left" | "right"', default: '"top" ("bottom" when placement="top")', description: "Side of the toolbar the first panel opens on. It flips when there isn't room." },
  { prop: "FloatingToolbarMenuItem icon", type: "ReactNode", description: "Decorative icon before the item text. Also on FloatingToolbarSubmenuTrigger." },
  { prop: "FloatingToolbarSubmenuContent title", type: "string", description: "Heading under the back item; names the group of sub-items." },
  { prop: "FloatingToolbarSubmenuContent backLabel", type: "string", default: '"Back"', description: "Text of the item that closes the nested panel and returns to the first one." },
]
