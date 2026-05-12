import { useState } from "react"
import { Copy, Check } from "lucide-react"

export function PreviewPane({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`mt-4 rounded-lg border border-border overflow-hidden ${className}`}
    >
      <div
        className="p-8 grid place-items-center min-h-[16rem]"
        style={{
          background:
            "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0) 0 0 / 18px 18px, var(--muted)",
        }}
      >
        {children}
      </div>
    </div>
  )
}

export function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard?.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="mt-3 relative group">
      <pre className="bg-foreground/[0.04] dark:bg-foreground/[0.06] border border-border rounded-lg p-4 font-mono text-[13px] leading-[1.7] overflow-x-auto text-foreground">
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2.5 right-2.5 h-7 w-7 grid place-items-center rounded-md border border-border bg-background opacity-0 group-hover:opacity-100 transition hover:bg-accent"
        aria-label="Copy code"
      >
        {copied ? <Check size={13} className="text-brand" /> : <Copy size={13} />}
      </button>
    </div>
  )
}

type ApiRow = {
  prop: string
  type: string
  default?: string
  description: string
}

export function ApiTable({ rows }: { rows: ApiRow[] }) {
  return (
    <div className="mt-4 rounded-lg border border-border overflow-hidden">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            {["Prop", "Type", "Default", "Description"].map((h) => (
              <th
                key={h}
                className="text-left px-3.5 py-2.5 font-medium text-[11px] uppercase tracking-[0.04em] text-muted-foreground bg-muted/40 border-b border-border"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.prop} className={i < rows.length - 1 ? "border-b border-border" : ""}>
              <td className="px-3.5 py-2.5 align-top">
                <code className="font-mono text-[12px] bg-muted px-1.5 py-0.5 rounded">
                  {row.prop}
                </code>
              </td>
              <td className="px-3.5 py-2.5 align-top">
                <code className="font-mono text-[12px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                  {row.type}
                </code>
              </td>
              <td className="px-3.5 py-2.5 align-top">
                {row.default && (
                  <code className="font-mono text-[12px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                    {row.default}
                  </code>
                )}
              </td>
              <td className="px-3.5 py-2.5 align-top text-muted-foreground leading-relaxed">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function SectionBadge({ number, isNew }: { number: string; isNew?: boolean }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 font-mono">
      COMPONENT · {number}
      {isNew && (
        <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-brand/15 text-brand">
          NEW
        </span>
      )}
    </div>
  )
}
