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
type ButtonVariant  = NonNullable<VariantProps<typeof buttonVariants>["variant"]>
type ButtonPadding  = NonNullable<VariantProps<typeof buttonVariants>["padding"]>
type ButtonTextSize = NonNullable<VariantProps<typeof buttonVariants>["textSize"]>
type ButtonIconSize = NonNullable<VariantProps<typeof buttonVariants>["iconSize"]>
type ButtonMobile   = NonNullable<VariantProps<typeof buttonVariants>["mobile"]>

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
const buttonPaddings: ButtonPadding[]  = ["none", "xs", "sm", "base", "md", "lg", "xl"]
const buttonVariantValues: ButtonVariant[] = ["solid", "outline", "ghost", "secondary", "dashed", "surface"]

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
      {/* Button / variant */}
      <div style={{ ...sectionTitleStyle, marginTop: "3rem" }}>BUTTON / variant</div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={thStyle}>variant \ color</th>
            {buttonColors.map(color => (
              <th key={color} style={{ padding: "0.5rem 1rem", fontFamily: "monospace", fontSize: "0.75rem", opacity: 0.5, fontWeight: 400 }}>
                {color}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {buttonVariantValues.map(variant => (
            <tr key={variant} style={rowStyle}>
              <td style={tdLabelStyle}>{variant}</td>
              {buttonColors.map(color => (
                <td key={color} style={tdCellStyle}>
                  <Button color={color} variant={variant}>Button</Button>
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

      {/* Button / iconSize override */}
      <div style={{ ...sectionTitleStyle, marginTop: "3rem" }}>BUTTON / iconSize override</div>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>iconSize</th>
            <th style={{ padding: "0.5rem 1rem", fontFamily: "monospace", fontSize: "0.75rem", opacity: 0.5, fontWeight: 400 }}>
              preview
            </th>
          </tr>
        </thead>
        <tbody>
          {(["xs", "sm", "base", "md", "lg", "xl"] as ButtonIconSize[]).map(iconSize => (
            <tr key={iconSize} style={rowStyle}>
              <td style={tdLabelStyle}>{iconSize}</td>
              <td style={tdCellStyle}>
                <Button startIcon={<Star />} endIcon={<ArrowRight />} iconSize={iconSize}>Acción</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button / icon prop */}
      <div style={{ ...sectionTitleStyle, marginTop: "3rem" }}>BUTTON / icon prop</div>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>padding</th>
            <th style={{ ...thStyle, fontWeight: 400 }}>color</th>
            <th style={{ padding: "0.5rem 1rem", fontFamily: "monospace", fontSize: "0.75rem", opacity: 0.5, fontWeight: 400 }}>
              preview
            </th>
          </tr>
        </thead>
        <tbody>
          {([
            { padding: "xs",   color: "primary"   },
            { padding: "sm",   color: "secondary" },
            { padding: "base", color: "muted"     },
            { padding: "md",   color: "info"      },
            { padding: "lg",   color: "success"   },
            { padding: "xl",   color: "warning"   },
            { padding: "base", color: "error"     },
          ] as { padding: ButtonPadding; color: ButtonColor }[]).map(({ padding, color }) => (
            <tr key={`${padding}-${color}`} style={rowStyle}>
              <td style={tdLabelStyle}>{padding}</td>
              <td style={tdLabelStyle}>{color}</td>
              <td style={tdCellStyle}>
                <Button color={color} padding={padding} icon={<Search />} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button / isLoading */}
      <div style={{ ...sectionTitleStyle, marginTop: "3rem" }}>BUTTON / isLoading</div>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>caso</th>
            <th style={{ ...thStyle, fontWeight: 400 }}>color</th>
            <th style={{ padding: "0.5rem 1rem", fontFamily: "monospace", fontSize: "0.75rem", opacity: 0.5, fontWeight: 400 }}>
              preview
            </th>
          </tr>
        </thead>
        <tbody>
          {([
            {
              caso: "loading, sin loadingText",
              color: "primary",
              node: <Button color="primary" padding="base" isLoading>Guardar</Button>,
            },
            {
              caso: "loading + loadingText",
              color: "secondary",
              node: <Button color="secondary" padding="base" isLoading loadingText="Guardando...">Guardar</Button>,
            },
            {
              caso: "loading sin startIcon previo",
              color: "info",
              node: <Button color="info" padding="base" isLoading>Enviar</Button>,
            },
            {
              caso: "loading reemplaza startIcon",
              color: "success",
              node: <Button color="success" padding="base" isLoading startIcon={<Star />}>Favorito</Button>,
            },
            {
              caso: "loading con icon prop (cuadrado)",
              color: "warning",
              node: <Button color="warning" padding="base" isLoading icon={<Search />} />,
            },
            {
              caso: "loading + mobile only-icon",
              color: "error",
              node: <Button color="error" padding="base" isLoading mobile="only-icon" startIcon={<Search />}>Buscar</Button>,
            },
          ] as { caso: string; color: ButtonColor; node: React.ReactNode }[]).map(({ caso, color, node }) => (
            <tr key={caso} style={rowStyle}>
              <td style={tdLabelStyle}>{caso}</td>
              <td style={tdLabelStyle}>{color}</td>
              <td style={tdCellStyle}>{node}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button / mobile prop */}
      <div style={{ ...sectionTitleStyle, marginTop: "3rem" }}>BUTTON / mobile prop</div>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>mobile</th>
            <th style={{ ...thStyle, fontWeight: 400 }}>caso</th>
            <th style={{ padding: "0.5rem 1rem", fontFamily: "monospace", fontSize: "0.75rem", opacity: 0.5, fontWeight: 400 }}>
              preview (resize &lt;640px)
            </th>
          </tr>
        </thead>
        <tbody>
          {([
            {
              mobile: "only-icon",
              caso: "texto oculto en mobile, icono siempre visible",
              node: <Button color="primary" padding="base" mobile="only-icon" startIcon={<Search />}>Buscar</Button>,
            },
            {
              mobile: "full-width",
              caso: "full-width en mobile, auto en sm+",
              node: <Button color="info" padding="base" mobile="full-width">Guardar</Button>,
            },
            {
              mobile: "full-width",
              caso: "full-width con startIcon",
              node: <Button color="success" padding="base" mobile="full-width" startIcon={<Star />}>Favorito</Button>,
            },
            {
              mobile: "hidden",
              caso: "oculto en mobile, visible en sm+",
              node: <Button color="muted" padding="base" mobile="hidden">Solo escritorio</Button>,
            },
          ] as { mobile: ButtonMobile; caso: string; node: React.ReactNode }[]).map(({ mobile, caso, node }) => (
            <tr key={caso} style={rowStyle}>
              <td style={tdLabelStyle}>{mobile}</td>
              <td style={tdLabelStyle}>{caso}</td>
              <td style={tdCellStyle}>{node}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button / tooltip */}
      <div style={{ ...sectionTitleStyle, marginTop: "3rem" }}>BUTTON / tooltip</div>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>caso</th>
            <th style={{ ...thStyle, fontWeight: 400 }}>color</th>
            <th style={{ padding: "0.5rem 1rem", fontFamily: "monospace", fontSize: "0.75rem", opacity: 0.5, fontWeight: 400 }}>
              preview (hover)
            </th>
          </tr>
        </thead>
        <tbody>
          {([
            {
              caso: "tooltip string simple",
              color: "primary",
              node: <Button color="primary" padding="base" tooltip="Guardar cambios">Guardar</Button>,
            },
            {
              caso: "tooltip en icon-only",
              color: "secondary",
              node: <Button color="secondary" padding="base" icon={<Search />} tooltip="Buscar" />,
            },
            {
              caso: "tooltip en mobile only-icon",
              color: "info",
              node: <Button color="info" padding="base" mobile="only-icon" startIcon={<Search />} tooltip="Buscar en el sitio">Buscar</Button>,
            },
            {
              caso: "tooltip con JSX",
              color: "success",
              node: <Button color="success" padding="base" startIcon={<Star />} tooltip={<><strong>Favorito</strong> — guardar para después</>}>Agregar</Button>,
            },
            {
              caso: "tooltip + isLoading (disabled)",
              color: "warning",
              node: <Button color="warning" padding="base" isLoading loadingText="Enviando..." tooltip="Procesando tu solicitud">Enviar</Button>,
            },
            {
              caso: "tooltip + error icon-only",
              color: "error",
              node: <Button color="error" padding="base" icon={<Trash2 />} tooltip="Eliminar permanentemente" />,
            },
          ] as { caso: string; color: ButtonColor; node: React.ReactNode }[]).map(({ caso, color, node }) => (
            <tr key={caso} style={rowStyle}>
              <td style={tdLabelStyle}>{caso}</td>
              <td style={tdLabelStyle}>{color}</td>
              <td style={tdCellStyle}>{node}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button / elevated */}
      <div style={{ ...sectionTitleStyle, marginTop: "3rem" }}>BUTTON / elevated</div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={thStyle}>variant \ color</th>
            {buttonColors.map(color => (
              <th key={color} style={{ padding: "0.5rem 1rem", fontFamily: "monospace", fontSize: "0.75rem", opacity: 0.5, fontWeight: 400 }}>
                {color}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {([
            { label: "solid",             variant: "solid",   elevated: false },
            { label: "solid + elevated",  variant: "solid",   elevated: true  },
            { label: "outline + elevated",variant: "outline", elevated: true  },
            { label: "ghost + elevated",  variant: "ghost",   elevated: true  },
            { label: "surface",           variant: "surface", elevated: false },
            { label: "surface + elevated",variant: "surface", elevated: true  },
          ] as { label: string; variant: ButtonVariant; elevated: boolean }[]).map(({ label, variant, elevated }) => (
            <tr key={label} style={rowStyle}>
              <td style={tdLabelStyle}>{label}</td>
              {buttonColors.map(color => (
                <td key={color} style={tdCellStyle}>
                  <Button color={color} variant={variant} elevated={elevated}>Button</Button>
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
