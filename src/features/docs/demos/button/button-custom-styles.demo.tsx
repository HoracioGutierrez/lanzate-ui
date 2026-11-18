import { Bell, Download, Sparkles, Star } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonCustomStylesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Button startIcon={<Star aria-hidden="true" />} iconClassName="text-warning">
        Favorite
      </Button>
      <Button
        startIcon={<Sparkles aria-hidden="true" />}
        iconClassName="text-info"
        textClassName="italic font-light"
        variant="outline"
      >
        Special
      </Button>
      <Button
        startIcon={<Bell aria-hidden="true" />}
        iconClassName="text-info"
        textClassName="tracking-widest uppercase text-xs"
        variant="outline"
        color="info"
      >
        Notifications
      </Button>
      <Button
        icon={<Download aria-hidden="true" />}
        iconClassName="text-success"
        variant="soft"
        color="success"
        aria-label="Download"
      />
    </div>
  )
}
