import { Text } from "@/components/ui/text"

import { STATS } from "../home.constants"

export function StatsRow() {
  return (
    <dl className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border/70 md:grid-cols-4">
      {STATS.map(({ value, label }) => (
        <div key={label} className="flex flex-col-reverse bg-background p-5 text-left">
          <Text render={<dt />} size="xs" color="muted" className="mt-1">
            {label}
          </Text>
          <Text render={<dd />} variant="heading" size="2xl">
            {value}
          </Text>
        </div>
      ))}
    </dl>
  )
}
