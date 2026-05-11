import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { PreviewPane, CodeBlock, ApiTable, SectionBadge } from "../DocComponents"
import { ArrowRight, Download, Trash2, Plus, Star, Bell } from "lucide-react"

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

      {/* Radius */}
      <div className="mt-10">
        <Text as="h2" size="2xl" className="tracking-tight">
          Redondeado
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button radius="sm">SM</Button>
            <Button radius="md">MD</Button>
            <Button radius="xl">XL</Button>
            <Button radius="full">Full</Button>
            <Button icon={<Plus />} radius="full" tooltip="Crear" />
          </div>
        </PreviewPane>
        <CodeBlock>{`<Button radius="sm">SM</Button>
<Button radius="md">MD</Button>
<Button radius="xl">XL</Button>
<Button radius="full">Continuar</Button>
<Button icon={<Plus />} radius="full" tooltip="Crear" />`}</CodeBlock>
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

      {/* Icons */}
      <div className="mt-10">
        <Text as="h2" size="2xl" className="tracking-tight">
          Iconos
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button startIcon={<Download />}>startIcon</Button>
            <Button endIcon={<ArrowRight />}>endIcon</Button>
            <Button startIcon={<Plus />} endIcon={<ArrowRight />}>Ambos</Button>
            <Button variant="outline" startIcon={<Trash2 />} color="error">Eliminar</Button>
          </div>
        </PreviewPane>
        <CodeBlock>{`<Button startIcon={<Download />}>Descargar</Button>
<Button endIcon={<ArrowRight />}>Continuar</Button>
<Button startIcon={<Plus />} endIcon={<ArrowRight />}>Ambos</Button>`}</CodeBlock>
      </div>

      {/* Only icon */}
      <div className="mt-10">
        <Text as="h2" size="2xl" className="tracking-tight">
          Solo icono
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button icon={<Plus />} />
            <Button icon={<Star />} variant="outline" />
            <Button icon={<Bell />} variant="ghost" />
            <Button icon={<Trash2 />} color="error" variant="secondary" />
            <Button icon={<Download />} elevated />
          </div>
        </PreviewPane>
        <CodeBlock>{`<Button icon={<Plus />} />
<Button icon={<Star />} variant="outline" />
<Button icon={<Trash2 />} color="error" variant="secondary" />`}</CodeBlock>
      </div>

      {/* Tooltip */}
      <div className="mt-10">
        <Text as="h2" size="2xl" className="tracking-tight">
          Con tooltip
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button tooltip="Crear nuevo elemento">Nuevo</Button>
            <Button icon={<Plus />} variant="outline" tooltip="Agregar ítem" />
            <Button icon={<Trash2 />} color="error" variant="ghost" tooltip="Eliminar selección" />
            <Button disabled tooltip="Necesitás permisos de admin">Admin only</Button>
          </div>
        </PreviewPane>
        <CodeBlock>{`<Button tooltip="Crear nuevo elemento">Nuevo</Button>
<Button icon={<Plus />} variant="outline" tooltip="Agregar ítem" />

// El tooltip funciona incluso con disabled
<Button disabled tooltip="Necesitás permisos de admin">
  Admin only
</Button>`}</CodeBlock>
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
              prop: "radius",
              type: '"none" | "sm" | "md" | "lg" | "xl" | "full"',
              default: '"md"',
              description: "Redondeado del borde del botón.",
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
