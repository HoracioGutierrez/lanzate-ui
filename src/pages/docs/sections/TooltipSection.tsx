import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { PreviewPane, CodeBlock, ApiTable, SectionBadge } from "../DocComponents"

export function TooltipSection() {
  return (
    <div>
      <SectionBadge number="04" />
      <Text as="h1" size="display" className="tracking-tight">
        Tooltip
      </Text>
      <Text size="lg" color="muted" className="mt-3 max-w-2xl leading-relaxed">
        Popup contextual que aparece al hacer hover sobre un elemento. Accesible por defecto,
        construido sobre Radix Tooltip.
      </Text>

      <div className="mt-6 flex items-center gap-2 text-xs">
        {["@radix-ui/react-tooltip"].map((dep) => (
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
          <div className="flex flex-wrap items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover aquí</Button>
                </TooltipTrigger>
                <TooltipContent>Acción disponible</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button tooltip="Shortcut: ⌘S" startIcon={<Info size={14} />}>
              Con prop tooltip
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" icon={<Info size={16} />} />
                </TooltipTrigger>
                <TooltipContent>Más información</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </PreviewPane>
      </div>

      {/* Installation */}
      <div className="mt-12">
        <Text as="h2" size="2xl" className="tracking-tight">
          Instalación
        </Text>
        <CodeBlock>{`$ npx shadcn@latest add https://lanzate-ui.vercel.app/r/tooltip.json`}</CodeBlock>
      </div>

      {/* Usage */}
      <div className="mt-10">
        <Text as="h2" size="2xl" className="tracking-tight">
          Uso
        </Text>
        <CodeBlock>{`import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Uso básico
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover</Button>
    </TooltipTrigger>
    <TooltipContent>
      Descripción de la acción
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// Shortcut: usar la prop tooltip del Button
<Button tooltip="⌘S para guardar">
  Guardar
</Button>`}</CodeBlock>
      </div>

      {/* API */}
      <div className="mt-10">
        <Text as="h2" size="2xl" className="tracking-tight">
          API — TooltipContent
        </Text>
        <ApiTable
          rows={[
            {
              prop: "side",
              type: '"top" | "right" | "bottom" | "left"',
              default: '"top"',
              description: "Lado en el que aparece el tooltip.",
            },
            {
              prop: "sideOffset",
              type: "number",
              default: "6",
              description: "Distancia en px desde el trigger.",
            },
            {
              prop: "children",
              type: "ReactNode",
              description: "Contenido del tooltip.",
            },
          ]}
        />
      </div>
    </div>
  )
}
