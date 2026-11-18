import { Bell, Download, Plus, Star, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

// An icon-only button has no visible text: name it with `aria-label` or `tooltip`.
export function ButtonIconOnlyDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Button icon={<Plus aria-hidden="true" />} aria-label="Add" />
      <Button icon={<Star aria-hidden="true" />} variant="outline" aria-label="Favorite" />
      <Button icon={<Bell aria-hidden="true" />} variant="ghost" aria-label="Notifications" />
      <Button icon={<Trash2 aria-hidden="true" />} color="error" variant="soft" aria-label="Delete" />
      <Button icon={<Download aria-hidden="true" />} effect="elevated" tooltip="Download" />
    </div>
  )
}
