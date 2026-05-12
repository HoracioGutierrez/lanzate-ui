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
        6 style variants, 7 semantic colors, elevated and glow effects, loading state with spinner,
        icons, and tooltip.
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
          Preview
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
          Colors
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
          Sizes
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
          Radius
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
          Text Size
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
          Icon Size
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
          States
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button isLoading loadingText="Loading…" tapAnimation={false}>
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
          Icons
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button startIcon={<Download />}>startIcon</Button>
            <Button endIcon={<ArrowRight />}>endIcon</Button>
            <Button startIcon={<Plus />} endIcon={<ArrowRight />}>Both</Button>
            <Button variant="outline" startIcon={<Trash2 />} color="error">Delete</Button>
          </div>
        </PreviewPane>
        <CodeBlock>{`<Button startIcon={<Download />}>Download</Button>
<Button endIcon={<ArrowRight />}>Continue</Button>
<Button startIcon={<Plus />} endIcon={<ArrowRight />}>Both</Button>`}</CodeBlock>
      </div>

      {/* Only icon */}
      <div id="solo-icono" className="mt-10 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Icon Only
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
          With Tooltip
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button tooltip="Create new element">New</Button>
            <Button icon={<Plus />} variant="outline" tooltip="Add item" />
            <Button icon={<Trash2 />} color="error" variant="ghost" tooltip="Delete selection" />
            <Button disabled tooltip="You need admin permissions">Admin only</Button>
          </div>
        </PreviewPane>
        <CodeBlock>{`<Button tooltip="Create new element">New</Button>
<Button icon={<Plus />} variant="outline" tooltip="Add item" />

// Tooltip works even when disabled
<Button disabled tooltip="You need admin permissions">
  Admin only
</Button>`}</CodeBlock>
      </div>

      {/* Mobile */}
      <div id="responsive" className="mt-10 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Responsive
        </Text>
        <Text size="sm" color="muted" className="mt-1">
          Resize the window to see the effect on mobile (&lt;640px).
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button mobile="only-icon" startIcon={<Plus />}>New</Button>
            <Button mobile="full-width">Full width</Button>
            <Button mobile="hidden">Desktop only</Button>
          </div>
        </PreviewPane>
        <CodeBlock>{`// Text hidden on mobile, visible on sm+
<Button mobile="only-icon" startIcon={<Plus />}>New</Button>

// Full width on mobile, auto on sm+
<Button mobile="full-width">Full width</Button>

// Hidden on mobile, visible on sm+
<Button mobile="hidden">Desktop only</Button>`}</CodeBlock>
      </div>

      {/* Custom class props */}
      <div id="estilos-personalizados" className="mt-10 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Custom Styles
        </Text>
        <Text size="sm" color="muted" className="mt-1">
          Use <code>iconClassName</code> and <code>textClassName</code> to customize icons and text independently, without losing button variants.
        </Text>
        <PreviewPane>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button startIcon={<Star />} iconClassName="text-yellow-400">
              Favorite
            </Button>
            <Button
              startIcon={<Sparkles />}
              iconClassName="text-purple-400"
              textClassName="italic font-light"
              variant="outline"
            >
              Special
            </Button>
            <Button
              startIcon={<Bell />}
              iconClassName="text-blue-400"
              textClassName="tracking-widest uppercase text-xs"
              variant="outline"
              color="info"
            >
              Notifications
            </Button>
            <Button icon={<Download />} iconClassName="text-green-400" variant="secondary" color="success" />
          </div>
        </PreviewPane>
        <CodeBlock>{`// Icon with different color than text
<Button startIcon={<Star />} iconClassName="text-yellow-400">
  Favorite
</Button>

// Combining iconClassName and textClassName
<Button
  startIcon={<Sparkles />}
  iconClassName="text-purple-400"
  textClassName="italic font-light"
  variant="outline"
>
  Special
</Button>

// Text with custom typographic style
<Button
  startIcon={<Bell />}
  iconClassName="text-blue-400"
  textClassName="tracking-widest uppercase text-xs"
  variant="outline"
  color="info"
>
  Notifications
</Button>`}</CodeBlock>
      </div>

      {/* Installation */}
      <div id="instalacion" className="mt-12 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Installation
        </Text>
        <CodeBlock>{`$ npx shadcn@latest add https://lanzate-ui.vercel.app/r/button.json`}</CodeBlock>
      </div>

      {/* Usage */}
      <div id="uso" className="mt-10 scroll-mt-20">
        <Text as="h2" size="2xl" className="tracking-tight">
          Usage
        </Text>
        <CodeBlock>{`import { Button } from "@/components/ui/button";

// Basic variant
<Button>Take off 🚀</Button>

// With variant and color
<Button variant="outline" color="success">
  Confirmed
</Button>

// With icon and loading state
<Button
  isLoading={isPending}
  loadingText="Saving..."
  startIcon={<Save />}
>
  Save
</Button>

// Elevated with tooltip
<Button elevated tooltip="Main action">
  Publish
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
              description: "Visual style of the button.",
            },
            {
              prop: "color",
              type: '"primary" | "secondary" | "muted" | "info" | "warning" | "success" | "error"',
              default: '"primary"',
              description: "Semantic color of the button.",
            },
            {
              prop: "padding",
              type: '"none" | "xs" | "sm" | "base" | "md" | "lg" | "xl"',
              default: '"base"',
              description: "Padding and text size.",
            },
            {
              prop: "radius",
              type: '"none" | "sm" | "md" | "lg" | "xl" | "full"',
              default: '"md"',
              description: "Border radius of the button.",
            },
            {
              prop: "textSize",
              type: '"xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "display"',
              description: "Text size independent of padding.",
            },
            {
              prop: "iconSize",
              type: '"xs" | "sm" | "base" | "md" | "lg" | "xl"',
              description: "Size of SVG icons in units relative to the text.",
            },
            {
              prop: "isLoading",
              type: "boolean",
              default: "false",
              description: "Shows a spinner and disables the button.",
            },
            {
              prop: "loadingText",
              type: "string",
              description: "Alternative text during the loading state.",
            },
            {
              prop: "startIcon",
              type: "ReactNode",
              description: "Icon to the left of the text.",
            },
            {
              prop: "endIcon",
              type: "ReactNode",
              description: "Icon to the right of the text.",
            },
            {
              prop: "icon",
              type: "ReactNode",
              description: "Centered icon (converts the button to a square).",
            },
            {
              prop: "elevated",
              type: "boolean",
              default: "false",
              description: "Applies shadow and elevated gradient.",
            },
            {
              prop: "glow",
              type: "boolean",
              default: "false",
              description: "Applies a glow/neon effect using the button's color.",
            },
            {
              prop: "tooltip",
              type: "ReactNode",
              description: "Tooltip content on hover.",
            },
            {
              prop: "tapAnimation",
              type: "boolean",
              default: "true",
              description: "Scale animation on click.",
            },
            {
              prop: "mobile",
              type: '"only-icon" | "full-width" | "hidden"',
              description: "Responsive behavior on mobile.",
            },
            {
              prop: "className",
              type: "string",
              description: "Additional classes for the root <button> element. Merged after variant classes.",
            },
            {
              prop: "iconClassName",
              type: "string",
              description: "Classes applied to the wrapper of all icons (startIcon, endIcon, icon). Useful for changing color or size independently from the text.",
            },
            {
              prop: "textClassName",
              type: "string",
              description: 'Classes applied to the text wrapper (children / loadingText). With mobile="only-icon" they are automatically merged with "hidden sm:inline".',
            },
          ]}
        />
      </div>
    </div>
  )
}
