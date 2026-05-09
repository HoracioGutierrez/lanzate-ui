import { Text } from "@/components/ui/text"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PreviewPane, CodeBlock, ApiTable, SectionBadge } from "../DocComponents"

const LOREM_ITEMS = Array.from({ length: 12 }, (_, i) => `Ítem ${i + 1} — componente de la lista`)

export function ScrollAreaSection() {
  return (
    <div>
      <SectionBadge number="03" />
      <Text as="h1" size="display" className="tracking-tight">
        ScrollArea
      </Text>
      <Text size="lg" color="muted" className="mt-3 max-w-2xl leading-relaxed">
        Área de scroll accesible construida sobre Radix UI. Scrollbar customizable, compatible con
        el patrón{" "}
        <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">scroll-fade</code>.
      </Text>

      <div className="mt-6 flex items-center gap-2 text-xs">
        {["@radix-ui/react-scroll-area"].map((dep) => (
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
          <div className="w-full max-w-xs mx-auto">
            <ScrollArea className="h-48 rounded-md border border-border scroll-fade">
              <div className="p-4 space-y-2">
                {LOREM_ITEMS.map((item) => (
                  <div
                    key={item}
                    className="text-sm px-3 py-2 rounded-md border border-border bg-card"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </PreviewPane>
      </div>

      {/* Installation */}
      <div className="mt-12">
        <Text as="h2" size="2xl" className="tracking-tight">
          Instalación
        </Text>
        <CodeBlock>{`$ npx shadcn@latest add https://lanzate-ui.vercel.app/r/scroll-area.json`}</CodeBlock>
      </div>

      {/* Usage */}
      <div className="mt-10">
        <Text as="h2" size="2xl" className="tracking-tight">
          Uso
        </Text>
        <CodeBlock>{`import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Scroll vertical
<ScrollArea className="h-72">
  {items.map(item => (
    <div key={item.id}>{item.name}</div>
  ))}
</ScrollArea>

// Con fade effect (CSS utility)
<ScrollArea className="h-52 scroll-fade">
  {/* contenido largo */}
</ScrollArea>

// Scroll horizontal
<ScrollArea className="w-full">
  <div className="flex gap-4 w-max">
    {cards.map(card => <Card key={card.id} />)}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}</CodeBlock>
      </div>

      {/* API */}
      <div className="mt-10">
        <Text as="h2" size="2xl" className="tracking-tight">
          API
        </Text>
        <ApiTable
          rows={[
            {
              prop: "className",
              type: "string",
              description:
                "Clases adicionales de Tailwind. Usa h-{n} para definir la altura del área.",
            },
            {
              prop: "children",
              type: "ReactNode",
              description: "Contenido scrolleable.",
            },
          ]}
        />
        <div className="mt-4">
          <Text size="sm" color="muted">
            <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">ScrollBar</code>{" "}
            acepta{" "}
            <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">
              orientation?: "vertical" | "horizontal"
            </code>{" "}
            (por defecto <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">"vertical"</code>).
          </Text>
        </div>
      </div>
    </div>
  )
}
