import { STATS } from "../home.constants"

export function StatsRow() {
  return (
    <dl className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border/70 md:grid-cols-4">
      {STATS.map(({ value, label }) => (
        <div key={label} className="flex flex-col-reverse bg-background p-5 text-left">
          <dt className="mt-1 text-xs text-muted-foreground">{label}</dt>
          <dd className="text-2xl font-semibold tracking-tight">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
