import { Text } from "@/components/ui/text"
import { CodeBlock } from "../DocComponents"

export function InstallationSection() {
  return (
    <div>
      <Text as="h1" size="display" className="tracking-tight">
        Instalación
      </Text>
      <Text size="lg" color="muted" className="mt-3 max-w-2xl leading-relaxed">
        Lanzate UI funciona con cualquier stack que use React + Tailwind. Añade componentes
        directamente a tu proyecto con el CLI de shadcn.
      </Text>

      <div className="mt-10 space-y-10 max-w-2xl">
        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            1. Configura shadcn/ui
          </Text>
          <Text color="muted" className="mt-2 leading-relaxed">
            Si aún no lo tienes, inicializa shadcn/ui en tu proyecto. Esto crea el archivo{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">
              components.json
            </code>{" "}
            y configura los paths y alias necesarios.
          </Text>
          <CodeBlock>{`$ npx shadcn@latest init`}</CodeBlock>
        </div>

        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            2. Añade un componente
          </Text>
          <Text color="muted" className="mt-2 leading-relaxed">
            Usa el CLI para copiar componentes directamente desde el registry de Lanzate UI a tu
            proyecto.
          </Text>
          <CodeBlock>{`# Añadir el componente Button
$ npx shadcn@latest add https://lanzate-ui.vercel.app/r/button.json

# Añadir el componente Text
$ npx shadcn@latest add https://lanzate-ui.vercel.app/r/text.json

# Añadir múltiples a la vez
$ npx shadcn@latest add \\
  https://lanzate-ui.vercel.app/r/button.json \\
  https://lanzate-ui.vercel.app/r/text.json`}</CodeBlock>
        </div>

        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            3. Importa y usa
          </Text>
          <Text color="muted" className="mt-2 leading-relaxed">
            Los componentes se copian a{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">
              src/components/ui/
            </code>
            . Importalos directamente.
          </Text>
          <CodeBlock>{`// app/page.tsx
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function Page() {
  return (
    <div>
      <Text as="h1" size="2xl">¡Despegando!</Text>
      <Button>Get Started</Button>
    </div>
  );
}`}</CodeBlock>
        </div>

        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            Requisitos
          </Text>
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            {[
              { label: "React", value: "18 o superior" },
              { label: "Tailwind CSS", value: "v4 recomendado" },
              { label: "TypeScript", value: "Opcional pero recomendado" },
              { label: "shadcn/ui CLI", value: "Para instalar componentes" },
            ].map((req) => (
              <div
                key={req.label}
                className="rounded-lg border border-border bg-card px-4 py-3"
              >
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
                  {req.label}
                </div>
                <div className="text-sm font-medium mt-0.5">{req.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
