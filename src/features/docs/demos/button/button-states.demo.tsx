import { Button } from "@/components/ui/button"

export function ButtonStatesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Button isLoading loadingText="Loading…" tapAnimation={false}>
        Loading
      </Button>
      <Button disabled>Disabled</Button>
      <Button effect="elevated">Elevated</Button>
      <Button color="error">Error</Button>
    </div>
  )
}
