import { useState } from "react"
import { Text } from "./components/ui/text"
import type { VariantProps } from "class-variance-authority"
import { textVariants } from "./components/ui/text"

type Palette = "palette-neutral" | "palette-ocean" | "palette-sunset"
type Size = NonNullable<VariantProps<typeof textVariants>["size"]>
type Color = NonNullable<VariantProps<typeof textVariants>["color"]>

const palettes: { id: Palette; label: string }[] = [
  { id: "palette-neutral", label: "Neutral" },
  { id: "palette-ocean",   label: "Ocean" },
  { id: "palette-sunset",  label: "Sunset" },
]

const sizes: Size[]   = ["xs", "sm", "md", "lg", "xl", "2xl", "display"]
const colors: Color[] = [
  "primary", "secondary", "muted", "primary-muted", "secondary-muted",
  "info", "warning", "success", "error",
]

function App() {
  const [palette, setPalette] = useState<Palette>("palette-neutral")

  return (
    <div className={palette} style={{ minHeight: "100vh", padding: "2rem", overflowX: "auto" }}>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
        {palettes.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setPalette(id)}
            style={{
              padding: "0.5rem 1.25rem",
              cursor: "pointer",
              fontWeight: palette === id ? "700" : "400",
              outline: palette === id ? "2px solid currentColor" : "1px solid #ccc",
              outlineOffset: "2px",
              borderRadius: "0.375rem",
              border: "none",
              background: "transparent",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "0.5rem 1rem 0.5rem 0", whiteSpace: "nowrap", fontFamily: "monospace", fontSize: "0.75rem", opacity: 0.5 }}>
              color \ size
            </th>
            {sizes.map(size => (
              <th key={size} style={{ padding: "0.5rem 1rem", fontFamily: "monospace", fontSize: "0.75rem", opacity: 0.5, fontWeight: 400 }}>
                {size}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {colors.map(color => (
            <tr key={color} style={{ borderTop: "1px solid oklch(0.9 0 0)" }}>
              <td style={{ padding: "0.75rem 1rem 0.75rem 0", fontFamily: "monospace", fontSize: "0.75rem", opacity: 0.5, whiteSpace: "nowrap", verticalAlign: "middle" }}>
                {color}
              </td>
              {sizes.map(size => (
                <td key={size} style={{ padding: "0.75rem 1rem", verticalAlign: "middle" }}>
                  <Text size={size} color={color}>Aa</Text>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
