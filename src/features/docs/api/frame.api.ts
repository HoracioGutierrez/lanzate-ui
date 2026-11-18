import type { ApiRow } from "../types/docs.types"

export const frameApi: ApiRow[] = [
  { prop: "Frame size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Scales the corner marks, the content padding and the default header height: sm for cards, lg for page sections." },
  { prop: "Frame collapsible", type: "boolean", default: "false", description: "Makes FrameTitle a button that shows and hides FrameContent." },
  { prop: "Frame open", type: "boolean", description: "Whether the content is shown, when controlled. Pair it with onOpenChange." },
  { prop: "Frame defaultOpen", type: "boolean", default: "true", description: "Whether the content is shown at first, when uncontrolled." },
  { prop: "Frame onOpenChange", type: "(open: boolean, details) => void", description: "Runs when the user shows or hides the content." },
  { prop: "FrameHeader height", type: '"sm" | "md" | "lg"', default: "the frame's size", description: "Minimum height of the header. Its children are free content." },
  { prop: "FrameTitle children", type: "ReactNode", description: "Title content: text, icons, badges. Fills the space between back and menu, and truncates." },
  { prop: "FrameBack label", type: "string", default: '"Back"', description: "Accessible name of the back button. Takes onClick like any button." },
  { prop: "FrameMenu label", type: "string", description: "Accessible name of the three-dot button. Required: screen readers and agents find the menu by it." },
  { prop: "FrameMenu onAction", type: "(value: string) => void", description: "Runs for every item in the menu and its submenus, with the item's value." },
  { prop: "FrameMenuItem icon", type: "ReactNode", description: "Decorative icon before the item text. Also on FrameSubmenuTrigger." },
  { prop: "FrameContent className", type: "string", description: "Classes for the padded box around the content." },
]
