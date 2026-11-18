import { apiTables } from "../api/api-tables"
import type { ApiTableProps } from "../types/docs.types"

const codeClasses = "rounded bg-muted px-1.5 py-0.5 font-mono text-xs"

export function ApiTable({ name }: ApiTableProps) {
  const rows = apiTables[name]

  return (
    <div className="mt-4 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="bg-muted/40 text-left text-2xs tracking-wide text-muted-foreground uppercase">
            <th scope="col" className="border-b border-border px-3.5 py-2.5 font-medium">Prop</th>
            <th scope="col" className="border-b border-border px-3.5 py-2.5 font-medium">Type</th>
            <th scope="col" className="border-b border-border px-3.5 py-2.5 font-medium">Default</th>
            <th scope="col" className="border-b border-border px-3.5 py-2.5 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.prop} className="border-b border-border last:border-b-0">
              <th scope="row" className="px-3.5 py-2.5 text-left align-top font-normal">
                <code className={codeClasses}>{row.prop}</code>
              </th>
              <td className="px-3.5 py-2.5 align-top">
                <code className={`${codeClasses} text-muted-foreground`}>{row.type}</code>
              </td>
              <td className="px-3.5 py-2.5 align-top">
                {row.default && <code className={`${codeClasses} text-muted-foreground`}>{row.default}</code>}
              </td>
              <td className="px-3.5 py-2.5 align-top leading-relaxed text-muted-foreground">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
