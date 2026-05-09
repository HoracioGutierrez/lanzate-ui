import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { PreviewPane, CodeBlock, ApiTable, SectionBadge } from "../DocComponents"

export function ButtonSection() {
  return (
    <div>
      <SectionBadge number="01" />
      <Text as="h1" size="display" className="tracking-tight">
        Button
      </Text>
      <Text size="lg" color="muted" className="mt-3 max-w-2xl leading-relaxed">
        El componente más fundamental. 6 variantes, 7 colores, tamaños, estado de loading y soporte
        para iconos.
      </Text>

      <div className="mt-6 flex items-center gap-2 text-xs">
        {["framer-motion", "class-variance-authority", "lucide-react"].map((dep) => (
          <span
            key={dep}
            className="px-2 py-1 rounded border border-border bg-card font-mono text-muted-foreground"
          >
            {dep}
          </span>
        ))}
      </div>

      {/* Preview */}
      <div className="mt-8">
        <Text as="h2" size="2xl" className="tracking-tight">
          Vista previa
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button>Solid</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="dashed">Dashed</Button>
            <Button variant="surface">Surface</Button>
          </div>
        </PreviewPane>
      </div>

      {/* Colors */}
      <div className="mt-10">
        <Text as="h2" size="2xl" className="tracking-tight">
          Colores
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="muted">Muted</Button>
            <Button color="info">Info</Button>
            <Button color="warning">Warning</Button>
            <Button color="success">Success</Button>
            <Button color="error">Error</Button>
          </div>
        </PreviewPane>
      </div>

      {/* Sizes */}
      <div className="mt-10">
        <Text as="h2" size="2xl" className="tracking-tight">
          Tamaños
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-end justify-center gap-2.5">
            <Button padding="xs">XS</Button>
            <Button padding="sm">SM</Button>
            <Button padding="base">Base</Button>
            <Button padding="md">MD</Button>
            <Button padding="lg">LG</Button>
            <Button padding="xl">XL</Button>
          </div>
        </PreviewPane>
      </div>

      {/* States */}
      <div className="mt-10">
        <Text as="h2" size="2xl" className="tracking-tight">
          Estados
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button isLoading loadingText="Cargando…" tapAnimation={false}>
              Loading
            </Button>
            <Button disabled>Disabled</Button>
            <Button elevated>Elevated</Button>
            <Button color="error">Error</Button>
          </div>
        </PreviewPane>
      </div>

      {/* Installation */}
      <div className="mt-12">
        <Text as="h2" size="2xl" className="tracking-tight">
          Instalación
        </Text>
        <CodeBlock>{`$ npx shadcn@latest add https://lanzate-ui.vercel.app/r/button.json`}</CodeBlock>
      </div>

      {/* Usage */}
      <div className="mt-10">
        <Text as="h2" size="2xl" className="tracking-tight">
          Uso
        </Text>
        <CodeBlock>{`import { Button } from "@/components/ui/button";

// Variante básica
<Button>Despegar 🚀</Button>

// Con variante y color
<Button variant="outline" color="success">
  Confirmado
</Button>

// Con icono y estado loading
<Button
  isLoading={isPending}
  loadingText="Guardando..."
  startIcon={<Save />}
>
  Guardar
</Button>

// Elevado con tooltip
<Button elevated tooltip="Acción principal">
  Publicar
</Button>`}</CodeBlock>
      </div>

      {/* API */}
      <div className="mt-10">
        <Text as="h2" size="2xl" className="tracking-tight">
          API
        </Text>
        <ApiTable
          rows={[
            {
              prop: "variant",
              type: '"solid" | "outline" | "ghost" | "secondary" | "dashed" | "surface"',
              default: '"solid"',
              description: "Estilo visual del botón.",
            },
            {
              prop: "color",
              type: '"primary" | "secondary" | "muted" | "info" | "warning" | "success" | "error"',
              default: '"primary"',
              description: "Color semántico del botón.",
            },
            {
              prop: "padding",
              type: '"none" | "xs" | "sm" | "base" | "md" | "lg" | "xl"',
              default: '"base"',
              description: "Tamaño del padding y texto.",
            },
            {
              prop: "isLoading",
              type: "boolean",
              default: "false",
              description: "Muestra spinner y deshabilita el botón.",
            },
            {
              prop: "loadingText",
              type: "string",
              description: "Texto alternativo durante el estado loading.",
            },
            {
              prop: "startIcon",
              type: "ReactNode",
              description: "Icono a la izquierda del texto.",
            },
            {
              prop: "endIcon",
              type: "ReactNode",
              description: "Icono a la derecha del texto.",
            },
            {
              prop: "icon",
              type: "ReactNode",
              description: "Icono centrado (convierte el botón en cuadrado).",
            },
            {
              prop: "elevated",
              type: "boolean",
              default: "false",
              description: "Aplica sombra y gradiente elevado.",
            },
            {
              prop: "tooltip",
              type: "ReactNode",
              description: "Contenido del tooltip al hacer hover.",
            },
            {
              prop: "tapAnimation",
              type: "boolean",
              default: "true",
              description: "Animación de escala al hacer click.",
            },
            {
              prop: "mobile",
              type: '"only-icon" | "full-width" | "hidden"',
              description: "Comportamiento responsive en mobile.",
            },
          ]}
        />
      </div>
    </div>
  )
}
