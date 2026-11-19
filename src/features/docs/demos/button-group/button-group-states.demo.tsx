import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"

export function ButtonGroupStatesDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ButtonGroup selection="single" aria-label="Billing period" defaultValue="monthly">
        <ButtonGroupItem value="monthly">Monthly</ButtonGroupItem>
        <ButtonGroupItem value="yearly">Yearly</ButtonGroupItem>
        <ButtonGroupItem value="lifetime" disabled tooltip="Coming soon">Lifetime</ButtonGroupItem>
      </ButtonGroup>
      <ButtonGroup selection="single" aria-label="Theme" defaultValue="system" disabled>
        <ButtonGroupItem value="light">Light</ButtonGroupItem>
        <ButtonGroupItem value="dark">Dark</ButtonGroupItem>
        <ButtonGroupItem value="system">System</ButtonGroupItem>
      </ButtonGroup>
    </div>
  )
}
