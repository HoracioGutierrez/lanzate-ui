import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"

export function ButtonGroupIconsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <ButtonGroup selection="single" aria-label="Alignment" defaultValue="left">
        <ButtonGroupItem value="left" icon={<AlignLeftIcon />} tooltip="Align left" />
        <ButtonGroupItem value="center" icon={<AlignCenterIcon />} tooltip="Align center" />
        <ButtonGroupItem value="right" icon={<AlignRightIcon />} tooltip="Align right" />
      </ButtonGroup>
      <ButtonGroup selection="multiple" aria-label="Formatting" color="info" defaultValue={["bold"]}>
        <ButtonGroupItem value="bold" icon={<BoldIcon />} tooltip="Bold" />
        <ButtonGroupItem value="italic" icon={<ItalicIcon />} tooltip="Italic" />
        <ButtonGroupItem value="underline" icon={<UnderlineIcon />} tooltip="Underline" />
      </ButtonGroup>
    </div>
  )
}
