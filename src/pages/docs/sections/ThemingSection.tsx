import { Text } from "@/components/ui/text"
import { CodeBlock } from "../DocComponents"

export function ThemingSection() {
  return (
    <div>
      <Text as="h1" size="display" className="tracking-tight">
        Theming
      </Text>
      <Text size="lg" color="muted" className="mt-3 max-w-2xl leading-relaxed">
        Tokens basados en variables CSS en espacio de color{" "}
        <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">oklch()</code>.
        Sobreescríbelos en tu{" "}
        <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">globals.css</code>.
      </Text>

      <div className="mt-10 space-y-10 max-w-2xl">
        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            Variables CSS
          </Text>
          <Text color="muted" className="mt-2 leading-relaxed">
            Todos los tokens se definen en{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">:root</code> con
            soporte dark mode vía clase{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">.dark</code>.
          </Text>
          <CodeBlock>{`:root {
  /* Base */
  --background: oklch(1 0 0);
  --foreground: oklch(0.205 0 0);

  /* Semantic */
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);

  /* Status */
  --destructive: oklch(0.577 0.245 27.325);
  --info:        oklch(0.6 0.18 240);
  --warning:     oklch(0.75 0.18 80);
  --success:     oklch(0.65 0.18 150);

  /* Brand */
  --brand: oklch(0.65 0.22 28);

  /* Radius */
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  /* ... */
}`}</CodeBlock>
        </div>

        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            Tipografía fluida
          </Text>
          <Text color="muted" className="mt-2 leading-relaxed">
            Los tamaños de texto usan{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">clamp()</code> para
            escalar automáticamente sin breakpoints.
          </Text>
          <CodeBlock>{`@theme {
  --text-xs:      clamp(0.75rem, 0.72rem + 0.14vw, 0.875rem);
  --text-sm:      clamp(0.875rem, 0.84rem + 0.18vw, 1rem);
  --text-base:    clamp(1rem, 0.96rem + 0.21vw, 1.125rem);
  --text-lg:      clamp(1.125rem, 1.05rem + 0.38vw, 1.375rem);
  --text-xl:      clamp(1.25rem, 1.14rem + 0.54vw, 1.625rem);
  --text-2xl:     clamp(1.5rem, 1.32rem + 0.89vw, 2.25rem);
  --text-display: clamp(2rem, 1.43rem + 2.86vw, 3.75rem);
}`}</CodeBlock>
        </div>

        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            Personalizar colores
          </Text>
          <Text color="muted" className="mt-2 leading-relaxed">
            Sobreescribe cualquier token en tu CSS global. Para cambiar el color brand a azul, por
            ejemplo:
          </Text>
          <CodeBlock>{`:root {
  --brand: oklch(0.6 0.2 240);   /* azul */
  --brand-foreground: oklch(1 0 0);
}`}</CodeBlock>
        </div>

        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            Dark mode
          </Text>
          <Text color="muted" className="mt-2 leading-relaxed">
            El dark mode se activa añadiendo la clase{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">.dark</code> al
            elemento{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">
              &lt;html&gt;
            </code>
            . El Header lo gestiona automáticamente y persiste en{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">
              localStorage
            </code>
            .
          </Text>
        </div>
      </div>
    </div>
  )
}
