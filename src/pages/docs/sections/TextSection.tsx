import { Text } from "@/components/ui/text"
import { PreviewPane, CodeBlock, ApiTable, SectionBadge } from "../DocComponents"

export function TextSection() {
  return (
    <div>
      <SectionBadge number="02" />
      <Text as="h1" size="display" className="tracking-tight">
        Text
      </Text>
      <Text size="lg" color="muted" className="mt-3 max-w-2xl leading-relaxed">
        Componente tipográfico polimórfico. 7 tamaños fluidos con{" "}
        <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">clamp()</code>, 9
        colores semánticos. Renderiza como p, span, label o heading (h1–h4).
      </Text>

      <div className="mt-6 flex items-center gap-2 text-xs">
        {["class-variance-authority"].map((dep) => (
          <span
            key={dep}
            className="px-2 py-1 rounded border border-border bg-card font-mono text-muted-foreground"
          >
            {dep}
          </span>
        ))}
      </div>

      {/* Sizes preview */}
      <div id="tamanos" className="mt-8 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Tamaños
        </Text>
        <PreviewPane className="!min-h-0">
          <div className="w-full px-6 py-8 space-y-2 text-left">
            <Text as="h1" size="display" className="leading-none">
              Display — La interfaz que despega
            </Text>
            <Text as="h2" size="2xl">
              2XL — Heading principal
            </Text>
            <Text size="xl">XL — Subheading</Text>
            <Text size="lg">LG — Body large, para párrafos destacados</Text>
            <Text size="md">MD — Body default, el tamaño estándar</Text>
            <Text size="sm" color="muted">
              SM — Texto pequeño, para notas y labels
            </Text>
            <Text size="xs" color="muted">
              XS — Caption · tracking wide · ideal para metadatos
            </Text>
          </div>
        </PreviewPane>
      </div>

      {/* Colors preview */}
      <div id="colores" className="mt-10 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Colores
        </Text>
        <PreviewPane className="!min-h-0">
          <div className="w-full px-6 py-8 space-y-1.5 text-left">
            <Text size="sm">Primary (foreground por defecto)</Text>
            <Text size="sm" color="primary">
              primary — texto primary
            </Text>
            <Text size="sm" color="secondary">
              secondary — texto secondary
            </Text>
            <Text size="sm" color="muted">
              muted — texto atenuado
            </Text>
            <Text size="sm" color="primary-muted">
              primary-muted — primary al 60%
            </Text>
            <Text size="sm" color="secondary-muted">
              secondary-muted — secondary al 60%
            </Text>
            <Text size="sm" color="info">
              info — informacional
            </Text>
            <Text size="sm" color="warning">
              warning — advertencia
            </Text>
            <Text size="sm" color="success">
              success — confirmación
            </Text>
            <Text size="sm" color="error">
              error — atención
            </Text>
          </div>
        </PreviewPane>
      </div>

      {/* As prop */}
      <div id="elemento-html" className="mt-10 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Elemento HTML
        </Text>
        <PreviewPane className="min-h-0!">
          <div className="w-full px-6 py-8 space-y-1.5 text-left">
            <Text as="h1" size="2xl">h1 — Título principal de página</Text>
            <Text as="h2" size="xl">h2 — Sección de contenido</Text>
            <Text as="h3" size="lg">h3 — Subsección</Text>
            <Text as="h4" size="md">h4 — Elemento de grupo</Text>
            <Text as="p">p — Párrafo estándar (default)</Text>
            <Text as="span" size="sm" color="muted" className="block">span — Texto en línea</Text>
            <Text as="label" size="sm" className="block">label — Etiqueta de formulario</Text>
          </div>
        </PreviewPane>
        <CodeBlock>{`<Text as="h1" size="display">Título</Text>
<Text as="h3" size="lg">Subsección</Text>
<Text as="label" size="sm">Email</Text>
<Text as="span" size="xs" color="muted">Inline</Text>`}</CodeBlock>
      </div>

      {/* Personalización */}
      <div id="personalizacion" className="mt-10 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Personalización
        </Text>
        <Text size="sm" color="muted" className="mt-1">
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">className</code> se
          mergea después de las variantes — puede extender o sobreescribir cualquier estilo.
        </Text>
        <PreviewPane className="min-h-0!">
          <div className="w-full px-6 py-8 space-y-2 text-left">
            <Text size="lg" className="font-black tracking-tight">Negrita con tracking ajustado</Text>
            <Text size="sm" color="muted" className="italic">Texto muted + cursiva</Text>
            <Text size="md" className="underline decoration-wavy decoration-primary">
              Subrayado decorativo
            </Text>
            <Text size="sm" className="bg-primary/10 text-primary px-2 py-0.5 rounded w-fit">
              Badge inline
            </Text>
          </div>
        </PreviewPane>
        <CodeBlock>{`// Extender con estilos tipográficos
<Text size="lg" className="font-black tracking-tight">
  Negrita con tracking
</Text>

// Combinar color semántico con ajustes extra
<Text size="sm" color="muted" className="italic">
  Texto atenuado en cursiva
</Text>

// Usar como base para patrones ad-hoc
<Text size="sm" className="bg-primary/10 text-primary px-2 py-0.5 rounded">
  Badge inline
</Text>`}</CodeBlock>
      </div>

      {/* Installation */}
      <div id="instalacion" className="mt-12 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Instalación
        </Text>
        <CodeBlock>{`$ npx shadcn@latest add https://lanzate-ui.vercel.app/r/text.json`}</CodeBlock>
      </div>

      {/* Usage */}
      <div id="uso" className="mt-10 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Uso
        </Text>
        <CodeBlock>{`import { Text } from "@/components/ui/text";

// Párrafo por defecto (size="md")
<Text>Texto de cuerpo estándar.</Text>

// Heading h1 con tamaño display
<Text as="h1" size="display">
  La interfaz que despega
</Text>

// Caption con color semántico
<Text as="span" size="xs" color="muted">
  Última actualización: hace 2 min
</Text>

// Estado de error
<Text size="sm" color="error">
  Este campo es requerido.
</Text>`}</CodeBlock>
      </div>

      {/* API */}
      <div id="api" className="mt-10 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          API
        </Text>
        <ApiTable
          rows={[
            {
              prop: "as",
              type: '"p" | "span" | "label" | "h1" | "h2" | "h3" | "h4"',
              default: '"p"',
              description: "Etiqueta HTML que se renderiza.",
            },
            {
              prop: "size",
              type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "display"',
              default: '"md"',
              description: "Tamaño fluido con clamp(). Incluye line-height y tracking ajustados.",
            },
            {
              prop: "color",
              type: '"primary" | "secondary" | "muted" | "primary-muted" | "secondary-muted" | "info" | "warning" | "success" | "error"',
              description: "Color semántico del texto. Sin definir usa text-foreground.",
            },
            {
              prop: "className",
              type: "string",
              description: "Clases de Tailwind adicionales. Se mergean después de las clases de variantes (size/color), por lo que pueden sobreescribir o extender cualquier estilo base.",
            },
          ]}
        />
      </div>
    </div>
  )
}
