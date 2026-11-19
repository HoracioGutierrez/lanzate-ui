import { KanbanIcon, LayoutGridIcon, ListIcon } from "lucide-react"

import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"

export function ButtonGroupSwitchDemo() {
  return (
    <ButtonGroup selection="single" aria-label="View" defaultValue="list">
      <ButtonGroupItem value="list" startIcon={<ListIcon />}>List</ButtonGroupItem>
      <ButtonGroupItem value="grid" startIcon={<LayoutGridIcon />}>Grid</ButtonGroupItem>
      <ButtonGroupItem value="board" startIcon={<KanbanIcon />}>Board</ButtonGroupItem>
    </ButtonGroup>
  )
}
