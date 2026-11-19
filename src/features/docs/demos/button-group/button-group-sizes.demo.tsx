import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"

export function ButtonGroupSizesDemo() {
  return (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup selection="single" aria-label="Range, extra small" size="xs" defaultValue="week">
        <ButtonGroupItem value="day">Day</ButtonGroupItem>
        <ButtonGroupItem value="week">Week</ButtonGroupItem>
        <ButtonGroupItem value="month">Month</ButtonGroupItem>
      </ButtonGroup>
      <ButtonGroup selection="single" aria-label="Range, medium" size="md" defaultValue="week">
        <ButtonGroupItem value="day">Day</ButtonGroupItem>
        <ButtonGroupItem value="week">Week</ButtonGroupItem>
        <ButtonGroupItem value="month">Month</ButtonGroupItem>
      </ButtonGroup>
      <ButtonGroup selection="single" aria-label="Range, large" size="lg" defaultValue="week">
        <ButtonGroupItem value="day">Day</ButtonGroupItem>
        <ButtonGroupItem value="week">Week</ButtonGroupItem>
        <ButtonGroupItem value="month">Month</ButtonGroupItem>
      </ButtonGroup>
    </div>
  )
}
