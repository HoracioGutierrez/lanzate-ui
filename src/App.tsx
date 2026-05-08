import { useState } from "react"
import { Text } from "./components/ui/text"
import { Button } from "./components/ui/button"
import type { VariantProps } from "class-variance-authority"
import { textVariants } from "./components/ui/text"
import { buttonVariants } from "./components/ui/button"
import { Search, ArrowRight, Star, Trash2 } from "lucide-react"

type Palette = "palette-neutral" | "palette-ocean" | "palette-sunset"
type TextSize  = NonNullable<VariantProps<typeof textVariants>["size"]>
type TextColor = NonNullable<VariantProps<typeof textVariants>["color"]>
type ButtonColor    = NonNullable<VariantProps<typeof buttonVariants>["color"]>
type ButtonPadding  = NonNullable<VariantProps<typeof buttonVariants>["padding"]>
type ButtonTextSize = NonNullable<VariantProps<typeof buttonVariants>["textSize"]>

const palettes: { id: Palette; label: string }[] = [
  { id: "palette-neutral", label: "Neutral" },
  { id: "palette-ocean",   label: "Ocean" },
  { id: "palette-sunset",  label: "Sunset" },
]

const textSizes: TextSize[]   = ["xs", "sm", "md", "lg", "xl", "2xl", "display"]
const textColors: TextColor[] = [
  "primary", "secondary", "muted", "primary-muted", "secondary-muted",
  "info", "warning", "success", "error",
]
const buttonColors: ButtonColor[] = [
  "primary", "secondary", "muted", "info", "warning", "success", "error",
]
const buttonPaddings: ButtonPadding[] = ["none", "xs", "sm", "base", "md", "lg", "xl"]

const thStyle: React.CSSProperties = { textAlign: "left", padding: "0.5rem 1rem 0.5rem 0", whiteSpace: "nowrap", fontFamily: "monospace", fontSize: "0.75rem", opacity: 0.5 }
const tdLabelStyle: React.CSSProperties = { padding: "0.75rem 1rem 0.75rem 0", fontFamily: "monospace", fontSize: "0.75rem", opacity: 0.5, whiteSpace: "nowrap", verticalAlign: "middle" }
const tdCellStyle: React.CSSProperties = { padding: "0.75rem 1rem", verticalAlign: "middle" }
const rowStyle: React.CSSProperties = { borderTop: "1px solid oklch(0.9 0 0)" }
const sectionTitleStyle: React.CSSProperties = { fontFamily: "monospace", fontSize: "0.85rem", fontWeight: 600, opacity: 0.4, marginBottom: "1rem", letterSpacing: "0.05em" }

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

      {/* Text */}
      <div style={sectionTitleStyle}>TEXT</div>
      <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "3rem" }}>
        <thead>
          <tr>
            <th style={thStyle}>color \ size</th>
            {textSizes.map(size => (
              <th key={size} style={{ padding: "0.5rem 1rem", fontFamily: "monospace", fontSize: "0.75rem", opacity: 0.5, fontWeight: 400 }}>
                {size}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {textColors.map(color => (
            <tr key={color} style={rowStyle}>
              <td style={tdLabelStyle}>{color}</td>
              {textSizes.map(size => (
                <td key={size} style={tdCellStyle}>
                  <Text size={size} color={color}>Aa</Text>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button */}
      <div style={sectionTitleStyle}>BUTTON</div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={thStyle}>color \ padding</th>
            {buttonPaddings.map(padding => (
              <th key={padding} style={{ padding: "0.5rem 1rem", fontFamily: "monospace", fontSize: "0.75rem", opacity: 0.5, fontWeight: 400 }}>
                {padding}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {buttonColors.map(color => (
            <tr key={color} style={rowStyle}>
              <td style={tdLabelStyle}>{color}</td>
              {buttonPaddings.map(padding => (
                <td key={padding} style={tdCellStyle}>
                  <Button color={color} padding={padding}>Button</Button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Button / textSize override */}
      <div style={{ ...sectionTitleStyle, marginTop: "3rem" }}>BUTTON / textSize override</div>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>textSize</th>
            <th style={{ ...thStyle, fontWeight: 400 }}>padding</th>
            <th style={{ ...thStyle, fontWeight: 400 }}>color</th>
            <th style={{ padding: "0.5rem 1rem", fontFamily: "monospace", fontSize: "0.75rem", opacity: 0.5, fontWeight: 400 }}>
              preview
            </th>
          </tr>
        </thead>
        <tbody>
          {([
            { textSize: "xs",      padding: "xl",   color: "primary"   },
            { textSize: "sm",      padding: "lg",   color: "secondary" },
            { textSize: "base",    padding: "base", color: "muted"     },
            { textSize: "lg",      padding: "sm",   color: "info"      },
            { textSize: "xl",      padding: "xs",   color: "warning"   },
            { textSize: "2xl",     padding: "xs",   color: "success"   },
            { textSize: "display", padding: "none", color: "error"     },
          ] as { textSize: ButtonTextSize; padding: ButtonPadding; color: ButtonColor }[]).map(({ textSize, padding, color }) => (
            <tr key={textSize} style={rowStyle}>
              <td style={tdLabelStyle}>{textSize}</td>
              <td style={tdLabelStyle}>{padding}</td>
              <td style={tdLabelStyle}>{color}</td>
              <td style={tdCellStyle}>
                <Button color={color} padding={padding} textSize={textSize}>Button</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Button / icons */}
      <div style={{ ...sectionTitleStyle, marginTop: "3rem" }}>BUTTON / icons</div>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>caso</th>
            <th style={{ ...thStyle, fontWeight: 400 }}>padding</th>
            <th style={{ ...thStyle, fontWeight: 400 }}>color</th>
            <th style={{ padding: "0.5rem 1rem", fontFamily: "monospace", fontSize: "0.75rem", opacity: 0.5, fontWeight: 400 }}>
              preview
            </th>
          </tr>
        </thead>
        <tbody>
          {([
            { caso: "solo start",  padding: "base", color: "primary",   node: <Button color="primary"   padding="base" startIcon={<Search />}>Buscar</Button> },
            { caso: "solo end",    padding: "base", color: "secondary", node: <Button color="secondary" padding="base" endIcon={<ArrowRight />}>Siguiente</Button> },
            { caso: "ambos",       padding: "base", color: "info",      node: <Button color="info"      padding="base" startIcon={<Star />} endIcon={<ArrowRight />}>Destacar</Button> },
            { caso: "start + lg",  padding: "lg",   color: "success",   node: <Button color="success"   padding="lg"   startIcon={<Star />}>Favorito</Button> },
            { caso: "end + xl",    padding: "xl",   color: "warning",   node: <Button color="warning"   padding="xl"   endIcon={<ArrowRight />}>Continuar</Button> },
            { caso: "ambos + sm",  padding: "sm",   color: "error",     node: <Button color="error"     padding="sm"   startIcon={<Trash2 />} endIcon={<ArrowRight />}>Eliminar</Button> },
            { caso: "icon-only",   padding: "base", color: "muted",     node: <Button color="muted"     padding="base" startIcon={<Search />} /> },
          ] as { caso: string; padding: string; color: string; node: React.ReactNode }[]).map(({ caso, padding, color, node }) => (
            <tr key={caso} style={rowStyle}>
              <td style={tdLabelStyle}>{caso}</td>
              <td style={tdLabelStyle}>{padding}</td>
              <td style={tdLabelStyle}>{color}</td>
              <td style={tdCellStyle}>{node}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
