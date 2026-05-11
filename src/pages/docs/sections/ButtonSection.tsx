import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { PreviewPane, CodeBlock, ApiTable, SectionBadge } from "../DocComponents"
import { ArrowRight, Download, Trash2, Plus, Star, Bell, Sparkles } from "lucide-react"

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
      <div id="vista-previa" className="mt-8 scroll-mt-20">
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
      <div id="colores" className="mt-10 scroll-mt-20">
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
      <div id="tamanos" className="mt-10 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Tamaños
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-end justify-center gap-2.5">
            <Button padding="none">None</Button>
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
      <div id="redondeado" className="mt-10 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Redondeado
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button radius="none">None</Button>
            <Button radius="sm">SM</Button>
            <Button radius="md">MD</Button>
            <Button radius="lg">LG</Button>
            <Button radius="xl">XL</Button>
            <Button radius="full">Full</Button>
            <Button icon={<Plus />} radius="full" tooltip="Crear" />
          </div>
        </PreviewPane>
        <CodeBlock>{`<Button radius="none">None</Button>
<Button radius="sm">SM</Button>
<Button radius="md">MD</Button>
<Button radius="lg">LG</Button>
<Button radius="xl">XL</Button>
<Button radius="full">Full</Button>
<Button icon={<Plus />} radius="full" tooltip="Crear" />`}</CodeBlock>
      </div>

      {/* Text Size */}
      <div id="tamano-de-texto" className="mt-10 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Tamaño de texto
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-end justify-center gap-2.5">
            <Button textSize="xs">XS</Button>
            <Button textSize="sm">SM</Button>
            <Button textSize="base">Base</Button>
            <Button textSize="lg">LG</Button>
            <Button textSize="xl">XL</Button>
            <Button textSize="2xl">2XL</Button>
            <Button textSize="display">Display</Button>
          </div>
        </PreviewPane>
        <CodeBlock>{`<Button textSize="xs">XS</Button>
<Button textSize="sm">SM</Button>
<Button textSize="base">Base</Button>
<Button textSize="lg">LG</Button>
<Button textSize="xl">XL</Button>
<Button textSize="2xl">2XL</Button>
<Button textSize="display">Display</Button>`}</CodeBlock>
      </div>

      {/* Icon Size */}
      <div id="tamano-de-icono" className="mt-10 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Tamaño de icono
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button iconSize="xs" startIcon={<Sparkles />}>XS</Button>
            <Button iconSize="sm" startIcon={<Sparkles />}>SM</Button>
            <Button iconSize="base" startIcon={<Sparkles />}>Base</Button>
            <Button iconSize="md" startIcon={<Sparkles />}>MD</Button>
            <Button iconSize="lg" startIcon={<Sparkles />}>LG</Button>
            <Button iconSize="xl" startIcon={<Sparkles />}>XL</Button>
          </div>
        </PreviewPane>
        <CodeBlock>{`<Button iconSize="xs" startIcon={<Sparkles />}>XS</Button>
<Button iconSize="sm" startIcon={<Sparkles />}>SM</Button>
<Button iconSize="base" startIcon={<Sparkles />}>Base</Button>
<Button iconSize="md" startIcon={<Sparkles />}>MD</Button>
<Button iconSize="lg" startIcon={<Sparkles />}>LG</Button>
<Button iconSize="xl" startIcon={<Sparkles />}>XL</Button>`}</CodeBlock>
      </div>

      {/* States */}
      <div id="estados" className="mt-10 scroll-mt-20">
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

      {/* Glow */}
      <div id="glow" className="mt-10 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Glow
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button glow>Primary</Button>
            <Button glow color="info">Info</Button>
            <Button glow color="success">Success</Button>
            <Button glow color="warning">Warning</Button>
            <Button glow color="error">Error</Button>
            <Button glow variant="outline">Outline</Button>
            <Button glow variant="ghost">Ghost</Button>
            <Button glow elevated>Elevated + Glow</Button>
          </div>
        </PreviewPane>
        <CodeBlock>{`<Button glow>Primary</Button>
<Button glow color="info">Info</Button>
<Button glow color="success">Success</Button>
<Button glow variant="outline">Outline</Button>
<Button glow elevated>Elevated + Glow</Button>`}</CodeBlock>
      </div>

      {/* Icons */}
      <div id="iconos" className="mt-10 scroll-mt-20">
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
      <div id="solo-icono" className="mt-10 scroll-mt-20">
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
      <div id="con-tooltip" className="mt-10 scroll-mt-20">
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

      {/* Mobile */}
      <div id="responsive" className="mt-10 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Responsive
        </Text>
        <Text size="sm" color="muted" className="mt-1">
          Redimensioná la ventana para ver el efecto en mobile (&lt;640px).
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button mobile="only-icon" startIcon={<Plus />}>Nuevo</Button>
            <Button mobile="full-width">Ancho completo</Button>
            <Button mobile="hidden">Solo escritorio</Button>
          </div>
        </PreviewPane>
        <CodeBlock>{`// Texto oculto en mobile, visible en sm+
<Button mobile="only-icon" startIcon={<Plus />}>Nuevo</Button>

// Ancho completo en mobile, automático en sm+
<Button mobile="full-width">Ancho completo</Button>

// Oculto en mobile, visible en sm+
<Button mobile="hidden">Solo escritorio</Button>`}</CodeBlock>
      </div>

      {/* Custom class props */}
      <div id="estilos-personalizados" className="mt-10 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Estilos personalizados
        </Text>
        <Text size="sm" color="muted" className="mt-1">
          Usá <code>iconClassName</code> y <code>textClassName</code> para customizar íconos y texto de forma independiente, sin perder las variantes del botón.
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button startIcon={<Star />} iconClassName="text-yellow-400">
              Favorito
            </Button>
            <Button
              startIcon={<Sparkles />}
              iconClassName="text-purple-400"
              textClassName="italic font-light"
              variant="outline"
            >
              Especial
            </Button>
            <Button
              startIcon={<Bell />}
              iconClassName="text-blue-400"
              textClassName="tracking-widest uppercase text-xs"
              variant="outline"
              color="info"
            >
              Notificaciones
            </Button>
            <Button icon={<Download />} iconClassName="text-green-400" variant="secondary" color="success" />
          </div>
        </PreviewPane>
        <CodeBlock>{`// Ícono con color distinto al texto
<Button startIcon={<Star />} iconClassName="text-yellow-400">
  Favorito
</Button>

// Combinando iconClassName y textClassName
<Button
  startIcon={<Sparkles />}
  iconClassName="text-purple-400"
  textClassName="italic font-light"
  variant="outline"
>
  Especial
</Button>

// Texto con estilo tipográfico personalizado
<Button
  startIcon={<Bell />}
  iconClassName="text-blue-400"
  textClassName="tracking-widest uppercase text-xs"
  variant="outline"
  color="info"
>
  Notificaciones
</Button>`}</CodeBlock>
      </div>

      {/* Installation */}
      <div id="instalacion" className="mt-12 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Instalación
        </Text>
        <CodeBlock>{`$ npx shadcn@latest add https://lanzate-ui.vercel.app/r/button.json`}</CodeBlock>
      </div>

      {/* Usage */}
      <div id="uso" className="mt-10 scroll-mt-20">
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
      <div id="api" className="mt-10 scroll-mt-20">
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
              prop: "textSize",
              type: '"xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "display"',
              description: "Tamaño de texto independiente del padding.",
            },
            {
              prop: "iconSize",
              type: '"xs" | "sm" | "base" | "md" | "lg" | "xl"',
              description: "Tamaño de los íconos SVG en unidades relativas al texto.",
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
              prop: "glow",
              type: "boolean",
              default: "false",
              description: "Aplica efecto de glow/neon usando el color del botón.",
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
            {
              prop: "className",
              type: "string",
              description: "Clases adicionales para el elemento <button> raíz. Se mergean después de las clases de variantes.",
            },
            {
              prop: "iconClassName",
              type: "string",
              description: "Clases aplicadas al wrapper de todos los íconos (startIcon, endIcon, icon). Útil para cambiar color o tamaño de forma independiente al texto.",
            },
            {
              prop: "textClassName",
              type: "string",
              description: 'Clases aplicadas al wrapper del texto (children / loadingText). En mobile="only-icon" se mergean automáticamente con "hidden sm:inline".',
            },
          ]}
        />
      </div>
    </div>
  )
}
