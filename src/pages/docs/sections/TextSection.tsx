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
        Polymorphic typographic component. 7 fluid sizes with{" "}
        <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">clamp()</code>, 9
        semantic colors. Renders as p, span, label, or heading (h1–h4).
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
              Display — The interface that takes off
            </Text>
            <Text as="h2" size="2xl">
              2XL — Main heading
            </Text>
            <Text size="xl">XL — Subheading</Text>
            <Text size="lg">LG — Body large, for highlighted paragraphs</Text>
            <Text size="md">MD — Body default, the standard size</Text>
            <Text size="sm" color="muted">
              SM — Small text, for notes and labels
            </Text>
            <Text size="xs" color="muted">
              XS — Caption · tracking wide · ideal for metadata
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
            <Text size="sm">Primary (foreground by default)</Text>
            <Text size="sm" color="primary">
              primary — primary text
            </Text>
            <Text size="sm" color="secondary">
              secondary — secondary text
            </Text>
            <Text size="sm" color="muted">
              muted — muted text
            </Text>
            <Text size="sm" color="primary-muted">
              primary-muted — primary at 60%
            </Text>
            <Text size="sm" color="secondary-muted">
              secondary-muted — secondary at 60%
            </Text>
            <Text size="sm" color="info">
              info — informational
            </Text>
            <Text size="sm" color="warning">
              warning — warning
            </Text>
            <Text size="sm" color="success">
              success — confirmation
            </Text>
            <Text size="sm" color="error">
              error — attention
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
            <Text as="h1" size="2xl">h1 — Main page title</Text>
            <Text as="h2" size="xl">h2 — Content section</Text>
            <Text as="h3" size="lg">h3 — Subsection</Text>
            <Text as="h4" size="md">h4 — Group element</Text>
            <Text as="p">p — Standard paragraph (default)</Text>
            <Text as="span" size="sm" color="muted" className="block">span — Inline text</Text>
            <Text as="label" size="sm" className="block">label — Form label</Text>
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
          Customization
        </Text>
        <Text size="sm" color="muted" className="mt-1">
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">className</code> is
          merged after the variants — it can extend or override any base style.
        </Text>
        <PreviewPane className="min-h-0!">
          <div className="w-full px-6 py-8 space-y-2 text-left">
            <Text size="lg" className="font-black tracking-tight">Bold with tight tracking</Text>
            <Text size="sm" color="muted" className="italic">Muted text + italic</Text>
            <Text size="md" className="underline decoration-wavy decoration-primary">
              Decorative underline
            </Text>
            <Text size="sm" className="bg-primary/10 text-primary px-2 py-0.5 rounded w-fit">
              Badge inline
            </Text>
          </div>
        </PreviewPane>
        <CodeBlock>{`// Extend with typographic styles
<Text size="lg" className="font-black tracking-tight">
  Bold with tracking
</Text>

// Combine semantic color with extra adjustments
<Text size="sm" color="muted" className="italic">
  Muted text in italic
</Text>

// Use as a base for ad-hoc patterns
<Text size="sm" className="bg-primary/10 text-primary px-2 py-0.5 rounded">
  Badge inline
</Text>`}</CodeBlock>
      </div>

      {/* Installation */}
      <div id="instalacion" className="mt-12 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Installation
        </Text>
        <CodeBlock>{`$ npx shadcn@latest add https://lanzate-ui.vercel.app/r/text.json`}</CodeBlock>
      </div>

      {/* Usage */}
      <div id="uso" className="mt-10 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Usage
        </Text>
        <CodeBlock>{`import { Text } from "@/components/ui/text";

// Default paragraph (size="md")
<Text>Standard body text.</Text>

// h1 Heading with display size
<Text as="h1" size="display">
  The interface that takes off
</Text>

// Caption with semantic color
<Text as="span" size="xs" color="muted">
  Last updated: 2 min ago
</Text>

// Error state
<Text size="sm" color="error">
  This field is required.
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
              description: "HTML tag that gets rendered.",
            },
            {
              prop: "size",
              type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "display"',
              default: '"md"',
              description: "Fluid size with clamp(). Includes adjusted line-height and tracking.",
            },
            {
              prop: "color",
              type: '"primary" | "secondary" | "muted" | "primary-muted" | "secondary-muted" | "info" | "warning" | "success" | "error"',
              description: "Semantic text color. If undefined, uses text-foreground.",
            },
            {
              prop: "className",
              type: "string",
              description: "Additional Tailwind classes. Merged after variant classes (size/color), so they can override or extend any base style.",
            },
          ]}
        />
      </div>
    </div>
  )
}
