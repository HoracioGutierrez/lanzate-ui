import { ButtonGroup, ButtonGroupAll, ButtonGroupItem } from "@/components/ui/button-group"

export function ButtonGroupVerticalDemo() {
  return (
    <ButtonGroup selection="single" aria-label="Warehouse" orientation="vertical" defaultValue={null}>
      <ButtonGroupAll>All warehouses</ButtonGroupAll>
      <ButtonGroupItem value="north">North</ButtonGroupItem>
      <ButtonGroupItem value="south">South</ButtonGroupItem>
      <ButtonGroupItem value="east">East</ButtonGroupItem>
    </ButtonGroup>
  )
}
